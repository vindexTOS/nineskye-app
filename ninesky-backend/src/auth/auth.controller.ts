import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ConnectionIsNotSetError } from 'typeorm';
import { GetUser } from 'libs/decorators/getUser';
import { JwtAuthGuard } from 'libs/guards/Jwt.Auth.Guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto ) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('activate-user')
  async activateUser(@GetUser() user : userPaylaod ,) {
    return this.authService.activateUser(user);
  }

  @Post('login')
  async login(@Body() body: LoginDto ) {
    return this.authService.login(body);
  }

  @Post('forget-password')
  async forgetPassword(@Body() body :  { email : string}) {
    return this.authService.forgetPassword(body.email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('recover-password')
  async recoveryPassword(@GetUser() user : userPaylaod ,@Body() body :  { password : string}) {
    return this.authService.recovertPassword(user.email, body);
  }
  @Post('admin-login')
  async adminLogin(@Body() body: LoginDto ) {
    return this.authService.login(body);
  }
 
}
