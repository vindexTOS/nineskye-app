import { BadGatewayException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../libs/dtos/UserDto.ts/create-user.dto';
import { UpdateUserDto } from '../../libs/dtos/UserDto.ts/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../libs/entities/user.entity';
import { Repository } from 'typeorm';
import { Parcel } from 'libs/entities/parcel.entity';
import { Declaration } from 'libs/entities/declaration.entity';
import { CreateDeclarationDto } from 'libs/dtos/declarationDtos.ts/createDeclarationDto';
import { Transaction } from 'libs/entities/transactions.entity';
import { TransactionType } from 'libs/enums/transactions.enum';
import { PaymentType } from 'libs/enums/payment.status.enum';
import { HttpService } from '@nestjs/axios';


import { PaymentHistory } from 'libs/entities/payment.entity';
import { Flight } from 'libs/entities/flight.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Parcel)
    private parcelRepository: Repository<Parcel>,
    @InjectRepository(Declaration)
    private declarationRepository: Repository<Declaration>,
  ) { }

  async getProfile(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['transactions', 'userDetails', 'payment_history'],
      });

      // Get only flights that have parcels and every parcel's owner id is equal to the provided id.
      const flights = await this.findFlightsByOwner(id);
      console.log(flights);
      return {
        ...user,
        flights,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findFlightsByOwner(ownerId: string): Promise<Flight[]> {
    try {
      const flights = await this.flightRepository
        .createQueryBuilder('flight')
        // Join parcels and load declaration data
        .leftJoinAndSelect('flight.parcels', 'parcel')
        // Join parcel owner (for filtering)
        .leftJoin('parcel.owner', 'owner')
        .leftJoinAndSelect('parcel.declaration', 'declaration')
        // Group by flight and joined fields so that HAVING works correctly
        .groupBy('flight.id')
        .addGroupBy('parcel.id')
        .addGroupBy('owner.id')
        .addGroupBy('declaration.id')
        // Ensure that every parcel's owner id matches the provided ownerId
        .having('SUM(CASE WHEN owner.id != :ownerId THEN 1 ELSE 0 END) = 0', { ownerId })
        // Also ensure that there is at least one parcel on the flight
        .andHaving('COUNT(parcel.id) > 0')
        .getMany();
      return flights;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error retrieving flights by owner');
    }
  }


  async updateProfile(id: string, data: UpdateUserDto) {
    console.log("YLE");
    console.log(data);
  
    // Find the existing user with its details
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['userDetails'],
    });
  
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  
    // Update the main user fields
    if (data.email !== undefined) {
      user.email = data.email;
    }
  
    // Update the userDetails fields
    if (data.first_name !== undefined) {
      user.userDetails.first_name = data.first_name;
    }
    if (data.last_name !== undefined) {
      user.userDetails.last_name = data.last_name;
    }
    if (data.phone_number !== undefined) {
      user.userDetails.phone_number = data.phone_number;
    }
    if (data.personal_number !== undefined) {
      user.userDetails.personal_number = data.personal_number;
    }
    if (data.office !== undefined) {
      user.userDetails.office = data.office;
    }
    if (data.city !== undefined) {
      user.userDetails.city = data.city;
    }
    if (data.address !== undefined) {
      user.userDetails.address = data.address;
    }
  
    // Note: We deliberately don't update the password field.
  
    // Save the updated user
    return await this.userRepository.save(user);
  }
  


  async createDeclaration(createDeclarationDto: CreateDeclarationDto) {

    try {
      const { type, price, website, comment, invoice_Pdf, tracking_id } = createDeclarationDto;


      console.log(createDeclarationDto)
      const parcel = await this.parcelRepository.findOne({ where: { id: tracking_id } });
      const declaration = this.declarationRepository.create({
        type,
        price,
        website,
        comment: comment || null,
        invoice_Pdf: invoice_Pdf ? invoice_Pdf : null,
      });
      const savedDeclaration = await this.declarationRepository.save(declaration);
      parcel.declaration = savedDeclaration;
      await this.parcelRepository.save(parcel);
      return savedDeclaration;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }



  async updateDeclaration(updateDeclarationDto: CreateDeclarationDto) {
    try {
      const { type, price, website, comment, invoice_Pdf, tracking_id } = updateDeclarationDto;

      // Find the parcel and include the associated declaration if it exists
      const parcel = await this.parcelRepository.findOne({
        where: { id: tracking_id },
        relations: ['declaration']
      });
      if (!parcel) {
        throw new Error('Parcel not found');
      }

      // If there is an existing declaration, update it; otherwise, create a new one.
      let declaration = parcel.declaration;
      if (!declaration) {
        declaration = this.declarationRepository.create({
          type,
          price,
          website,
          comment: comment || null,
          invoice_Pdf: invoice_Pdf ? invoice_Pdf : null,
        });
      } else {
        // Update the declaration fields
        declaration.type = type;
        declaration.price = price;
        declaration.website = website;
        declaration.comment = comment || null;
        // Only update the file if a new file is provided
        if (invoice_Pdf) {
          declaration.invoice_Pdf = invoice_Pdf;
        }
      }

      // Save the declaration record
      const savedDeclaration = await this.declarationRepository.save(declaration);
      // Associate the updated (or newly created) declaration with the parcel
      parcel.declaration = savedDeclaration;
      await this.parcelRepository.save(parcel);

      return savedDeclaration;
    } catch (error) {
      console.error('Error updating declaration:', error);
      throw error;
    }
  }


  async payParcels(userId: string, parcels: { tracking_id: string }[]) {
    // Fetch the user by id
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      // Calculate the total price of the parcels without changing their payment status
      const pricesList = await Promise.all(
        parcels.map(async (parcel) => {
          const mainParcel = await this.parcelRepository.findOne({ where: { id: parcel.tracking_id } });
          return mainParcel ? Number(mainParcel.price) : 0;
        })
      );

      // Sum up the total price
      const totalPrice = pricesList.reduce((acc, price) => acc + price, 0);

      // Check if the user has sufficient balance
      if (user.balance < totalPrice) {
        throw new ConflictException("არა საკმარისი ბალანსი")
      }

      // Now update each parcel's payment status to PAID
      await Promise.all(
        parcels.map(async (parcel) => {
          const mainParcel = await this.parcelRepository.findOne({ where: { id: parcel.tracking_id } });
          if (mainParcel) {
            mainParcel.payment_status = PaymentType.PAID;
            await this.parcelRepository.save(mainParcel);
          }
        })
      );

      // Create a transaction record for the payment
      const createTransaction = this.transactionRepository.create({
        amount: totalPrice,
        date: new Date(),
        transactionType: TransactionType.PAYMENT,
        user,
      });

      // Save the transaction
      await this.transactionRepository.save(createTransaction);

      // Deduct the total price from the user's balance and update the user record
      user.balance = user.balance - totalPrice;
      await this.userRepository.save(user);
    } catch (error) {
      console.error('Error updating declaration:', error);
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message)
      }
      throw new InternalServerErrorException(error)
    }

  }

  //  ???????????????????????????????????????????????????????????????



}
