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
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(PaymentHistory)
    private PaymentHistory: Repository<PaymentHistory>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Parcel)
    private parcelRepository: Repository<Parcel>,
    @InjectRepository(Declaration)
    private declarationRepository: Repository<Declaration>,
    private readonly httpService: HttpService
  ) { }

  async getProfile(id: string) {

    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['transactions', 'parcels', 'parcels.declaration', 'userDetails' ,"payment_history" ],
      });
 
      return {
        ...user,
        balance: user.balance,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }

  }

  async updateProfile(id: string, data: UpdateUserDto) {
    const { email, password, personal_number, office, first_name, last_name, phone_number, city, address } = data;
    console.log(data)
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['userDetails'], // Ensures userDetails are loaded

    });
    const createdUser = this.userRepository.create({ email, password, userDetails: { first_name, office, personal_number, last_name, phone_number, city, address } })
    await this.userRepository.save(createdUser);
    return user;
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
        invoice_Pdf: invoice_Pdf ? invoice_Pdf : null ,
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
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
  
    // Calculate the total price of the parcels with explicit conversion to numbers
    const pricesList = await Promise.all(
      parcels.map(async (parcel) => {
        const mainParcel = await this.parcelRepository.findOne({ where: { id: parcel.tracking_id } });
        if (mainParcel) {
          // Update the parcel's payment status to PAID
          mainParcel.payment_status = PaymentType.PAID;
          await this.parcelRepository.save(mainParcel);
          // Explicitly convert the price to a number
          return Number(mainParcel.price);
        }
        return 0; // If the parcel is not found, return 0
      })
    );
  
    // Sum up the total price, ensuring all values are numbers
    const totalPrice = pricesList.reduce((acc, price) => acc + price, 0);
  
    // Check if the user has sufficient balance
    if (user.balance < totalPrice) {
      console.log('User does not have sufficient balance');
      return;  // Exit if the user doesn't have enough balance
    }
  
    // Proceed with the transaction if the balance is sufficient
    const createTransaction = this.transactionRepository.create({
      amount: totalPrice,
      date: new Date(), // Create the date
      transactionType: TransactionType.PAYMENT,
      user,
    });
  
    // Save the transaction
    await this.transactionRepository.save(createTransaction);
  
    // Deduct the total price from the user's balance and update the user record
    user.balance = user.balance - totalPrice;
    await this.userRepository.save(user);
  }

  //  ???????????????????????????????????????????????????????????????



}
