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
        relations: ['transactions', 'parcels', 'parcels.declaration', 'userDetails'],
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
        invoice_Pdf: invoice_Pdf || null,
      });
      const savedDeclaration = await this.declarationRepository.save(declaration);
      parcel.declaration = savedDeclaration;
      await this.parcelRepository.save(parcel);
      return savedDeclaration;
    } catch (error) {

    }
  }
 
  async payParcels(userId: string, parcels: { tracking_id: string }[]) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['transactions'],
    });

    // Calculate the total price of the parcels
    const pricesList = await Promise.all(parcels.map(async (parcel) => {
      const mainParcel = await this.parcelRepository.findOne({ where: { id: parcel.tracking_id } });
      if (mainParcel) {
        mainParcel.payment_status = PaymentType.PAID; // Update status to PAID
        await this.parcelRepository.save(mainParcel);  // Save updated parcel
        return mainParcel.price;
      }
      return 0; // If parcel is not found, return 0 to avoid errors in calculation
    }));

    const totalPrice = pricesList.reduce((acc, price) => acc + price, 0);

    // Check if the user has sufficient balance
    if (user.balance < totalPrice) {
      console.log('User does not have sufficient balance');
      return;  // Exit the function if the user doesn't have enough balance
    }

    // Proceed with the transaction if balance is sufficient
    const createTransaction = this.transactionRepository.create({
      amount: totalPrice,
      date: new Date(), // Ensure the date is properly created
      transactionType: TransactionType.PAYMENT,
      user,
    });

    // Save the transaction
    await this.transactionRepository.save(createTransaction);

  }

  //  ???????????????????????????????????????????????????????????????



}
