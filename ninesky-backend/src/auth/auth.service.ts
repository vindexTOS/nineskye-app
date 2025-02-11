import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
import { User } from 'libs/entities/user.entity';
import { EntityManager } from 'typeorm';
import { UserDetails } from 'libs/entities/userDetails.entity';
import * as bcrypt from 'bcrypt';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly entityManager: EntityManager,
    private readonly mailerService: MailerService
  ) { }
  async register(registerDto: RegisterDto) {

    try {
      return await this.entityManager.transaction(async (transactionalEntityManager) => {
        const user = transactionalEntityManager.create(User, {
          email: registerDto.email,
          password: await bcrypt.hash(registerDto.password, 10),
        });
        const createdUser = await transactionalEntityManager.save(user); 
        const userDetails = transactionalEntityManager.create(UserDetails, {
          id: createdUser.id,
          user: user,
          first_name: registerDto.first_name,
          last_name: registerDto.last_name,
          phone_number: registerDto.phone_number,
          personal_number: registerDto.personal_number,
          office: registerDto.office,
          city: registerDto.city,
          address: registerDto.address,
        });

        await transactionalEntityManager.save(userDetails);
        console.log("7")
        const payload = {
          email: createdUser.email,
          sub: createdUser.id,
          accessLevel: createdUser.accessLevel,
        };

        const access_token =  this.jwtService.sign(payload) 
    
        await this.mailerService.sendActivationEmail(access_token, createdUser.email);
   
        return { msg:"შეამოწმეთ ელ-ფოსტა" };
      });
    } catch (error) {
      console.log(error)
      console.log("500 errori")
      if (error.code === '23505') { 
        throw new ConflictException('user With this email or personal number already exists');
      } else if (error.code) {
        throw new InternalServerErrorException(`Database error: ${error.detail}`);
      } else {
        throw new InternalServerErrorException('Failed to register user.');
      }
    }
  }
  async activateUser(user: userPaylaod) {
    try {
      return await this.entityManager.transaction(async (transactionalEntityManager) => {
        // Find the user in the database by ID
        const existingUser = await transactionalEntityManager.findOne(User, {
          where: { id: user.sub },
        });
  
        if (!existingUser) {
          throw new NotFoundException('User not found');
        }
  
        if (existingUser.accessLevel === 1) {
          throw new ConflictException('User is already activated');
        }
  
        // Update access level to 1 (activated)
        existingUser.accessLevel = 1;
        await transactionalEntityManager.save(existingUser);
        const payload = {
          email: existingUser.email,
          sub: existingUser.id,
          accessLevel: existingUser.accessLevel,
        };
        return { access_token: this.jwtService.sign(payload) };
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to activate user');
    }
  }
  

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;

      const user = await this.entityManager.findOne(User, { where: { email } });

      let passwordValid = await bcrypt.compare(password, user.password);
      if (!user || !passwordValid || user.accessLevel < 1) throw new UnauthorizedException('პაროლი ან  ელ-ფოსტა არასწორია.');

      const payload = {
        email: user.email,
        sub: user.id,
        accessLevel: user.accessLevel
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message)
      }
      throw new InternalServerErrorException('Login failed.');
    }
  }

  async forgetPassword(email: string) {
    const user = await this.entityManager.findOne(User, { where: { email } });
    if (!user) {
      throw new NotFoundException('მომხმარებელი ამ ელ-ფოსტით ვერ მოიძებნა.');
    }
    const payload = {
      email: user.email,
      sub: user.id,
    };
    const resetToken = this.jwtService.sign(payload);

    await this.mailerService.sendPasswordRecoverylink(resetToken, user.email);
  }

  async recovertPassword(email: string, body : { password : string }) {
    console.log(email, body)
    try {
      return await this.entityManager.transaction(async (transactionalEntityManager) => {
  
        const user = await transactionalEntityManager.findOne(User, {
          where: { email: email },
        });
  
        if (!user) {
          throw new NotFoundException('მომხმარებელი ვერ მოიძებნა.');
        }
  
        // Hash the new password
        const hashedPassword = await bcrypt.hash(body.password, 10);
  
        // Update password in database
        user.password = hashedPassword;
        await transactionalEntityManager.save(user);
        const payload = {
          email: user.email,
          sub: user.id,
          accessLevel: user.accessLevel,
        };
        console.log(payload)
        const access_token = this.jwtService.sign(payload);
        return { access_token };
      });
    } catch (error) {
      throw new Error(error)
    }
  
  }

}
