import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { Parcel } from 'libs/entities/parcel.entity';

import { UpdateUserDto } from 'libs/dtos/UserDto.ts/update-user.dto';
import { Flight } from 'libs/entities/flight.entity';
import { UploadParcelsDto } from 'libs/dtos/parcelDtos.ts/UploadParcelsDto';
import { UpdateParcelDto } from 'libs/dtos/parcelDtos.ts/update-parcel.dto';
import { Price } from 'libs/entities/prices.entity';
import { CreateFlightDto } from 'libs/dtos/flightDtos/createFlightDto';
import { PriceDto } from 'libs/dtos/PriceDto/updatePriceDto';
import { FlightFrom } from 'libs/enums/flightsFrom.enum';
import * as bcrypt from 'bcrypt';
import { AccessLevel } from 'libs/enums/accese.levels.enum';
import { PaymentHistory } from 'libs/entities/payment.entity';
import { Transaction } from 'libs/entities/transactions.entity';
import { Address } from 'libs/entities/address.entety';
import { CreateAddressDto } from 'libs/dtos/addressDto/addressDto';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(

    @InjectRepository(Flight)
    private readonly flightRepositry: Repository<Flight>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Parcel)
    private readonly parcelRepository: Repository<Parcel>,
    @InjectRepository(Price)
    private readonly PriceRepository: Repository<Price>,
    @InjectRepository(PaymentHistory)
    private readonly paymentHistory: Repository<PaymentHistory>,
    @InjectRepository(Transaction)
    private readonly transactionRepostiory: Repository<Transaction>,
    private readonly entityManager: EntityManager
  ) { }

  async onModuleInit() {

    const admin = await this.userRepository.findOne({ where: { email: process.env.ADMIN_EMAIL } })
    if (!admin) {
      const admin = this.userRepository.create({
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
        email: process.env.ADMIN_EMAIL,
        accessLevel: AccessLevel.SUPER_ADMIN,
      })
      await this.userRepository.save(admin)
    }
    let price = await this.PriceRepository.findOne({ where: { id: process.env.PRICE_ID } })
    if (!price) {
      const price = this.PriceRepository.create({ id: process.env.PRICE_ID, China: 9.90, Turkey: 3.00 })
      await this.PriceRepository.save(price)
    }

    const dummyData = [
      {

        Province: "Guangdong",
        Country: "China",
        District: "Tianhe",
        Street: "Zhujiang Road",
        Address: "123 Zhujiang Road, Tianhe, Guangzhou",
        TEL: "+86 20 1234 5678",
        ZIP: "510000"
      },


      {

        Province: "Istanbul",
        Country: "Turkey",
        District: "Fatih",
        Street: "Divanyolu Street",
        Address: "15 Divanyolu Street, Fatih, Istanbul",
        TEL: "+90 212 123 4567",
        ZIP: "34122"
      },


    ];

    dummyData.forEach((val: CreateAddressDto) => {
      this.createAddress(val)
    })

  }
  async uploadParcels(data: UploadParcelsDto) {
    try {
      const Flight = await this.createFlight(data.flight_info)
 
      if (!Flight) {
        throw new ConflictException(`problem with flight`)
      }
      const price = await this.PriceRepository.findOne({ where: { id: "1" } })
      if (!Flight) {
        throw new NotFoundException(`Prices not found`)
      }

      const parcels: Parcel[] = [];

      for (const parcel of data.parcels) {
        let owner = await this.userRepository.findOne({ where: { id: parcel.ownerId } })
        if (!owner) {
          throw new ConflictException(`owoner with this id ${parcel.ownerId} does not exist`)
        }
        const createdParcel = this.parcelRepository.create({
          id: parcel.tracking_id,
          price: Flight.flight_from === FlightFrom.CHINA ? parcel.weight * price.China : parcel.weight * price.Turkey,
          owner: owner ? owner : null,
          weight: parcel.weight,
          flight: Flight,
        })
        parcels.push(createdParcel);
      }
      const createdParcel = await this.parcelRepository.save(parcels);
      if (!createdParcel) {
        throw new ConflictException(createdParcel)
      }
      return createdParcel
    } catch (error) {
      console.log(error)
      throw new ConflictException(error.message);

    }

  }
  async createFlight(createFlightDto: CreateFlightDto) {
    console.log(createFlightDto)
    const existingFlight = await this.flightRepositry.findOne({
      where: { flight_id: createFlightDto.flight_id }
    })
    if (existingFlight) {
      return existingFlight;
    }
    const newFlight = this.flightRepositry.create(createFlightDto)
    return await this.flightRepositry.save(newFlight)

  }


  async getAllParcel(_data: getParcelDto): Promise<{ parcels: Parcel[], totalPages: number, totalCount: number, currentPage: number }> {
    try {
      const {
        tracking_id = '',
        ownerId = null,
        page = 1,
        limit = 10
      } = _data;

      const query = this.parcelRepository.createQueryBuilder('parcel')
        .leftJoin('parcel.owner', 'owner')
        .leftJoinAndSelect('parcel.declaration', 'declaration')
        .addSelect(['owner.id']);
      if (tracking_id) {
        query.andWhere('parcel.id = :tracking_id', { tracking_id });
      }
      if (ownerId) {
        query.andWhere('parcel.ownerId = :ownerId', { ownerId });
      }

      const totalCount = await query.getCount();

    
      query.skip((page - 1) * limit).take(limit);

    
      const parcels = await query.getMany();

        
      const totalPages = Math.ceil(totalCount / limit);

      return {
        parcels,
        totalPages,
        totalCount,
        currentPage: page
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve parcels');
    }
  }
  async updateParcel(id: string, updateParcelDto: UpdateParcelDto): Promise<Parcel> {
    try {

      const parcel = await this.parcelRepository.preload({
        id,
        ...updateParcelDto,
      });

      if (!parcel) {
        throw new NotFoundException(`Parcel with ID ${id} not found`);
      }

      return await this.parcelRepository.save(parcel);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(
        `Failed to update parcel with ID ${id}: ${error.message}`,
      );
    }
  }

  async deleteParcel(id: string): Promise<void> {
    try {
      const result = await this.parcelRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Parcel with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete parcel with ID ${id}`,
      );
    }
  }
  async getUsers(data: getUserDto) {
    try {
      const { personalNumber = '', page = 1, limit = 10 } = data;

      // Build the base query with joined relations.
      const query = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.userDetails', 'userDetails')
        .leftJoinAndSelect('user.transactions', 'transactions');

      // Update filter to use the personal_number from userDetails.
      if (personalNumber) {
        query.andWhere('userDetails.personal_number = :personal_number', { personal_number: personalNumber });
      }

      // Get the total count before pagination.
      const totalCount = await query.getCount();
      console.log('Total count:', totalCount);

      // Apply pagination.
      query.skip((page - 1) * limit).take(limit);
      const users = await query.getMany();
      console.log('Users fetched:', users);

      const totalPages = Math.ceil(totalCount / limit);

      // Map users and force evaluation of balance.
      const parsedUser = users.map((user) => {
        const { transactions, ...rest } = user;
        const balance = user.balance;
        return { ...rest, balance };
      });

      return {
        parsedUser,
        totalPages,
        totalCount,
        currentPage: page,
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }
  async updateUser(id: string, data: UpdateUserDto) {
    const { email, password, first_name, last_name, phone_number, city, address, office, personal_number } = data;
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['userDetails'], // Ensures userDetails are loaded
    });

    if (!user) {
      throw new Error(`User with ID ${id} not found.`);
    }
    user.email = email ?? user.email;
    user.password = password ?? user.password;
    user.userDetails.first_name = first_name ?? user.userDetails.first_name;
    user.userDetails.last_name = last_name ?? user.userDetails.last_name;
    user.userDetails.phone_number = phone_number ?? user.userDetails.phone_number;
    user.userDetails.city = city ?? user.userDetails.city;
    user.userDetails.address = address ?? user.userDetails.address;
    user.userDetails.personal_number = personal_number ?? user.userDetails.personal_number;
    user.userDetails.office = office ?? user.userDetails.office;
    const updatedUser = await this.userRepository.save(user);
    return updatedUser

  }



  async deleteUser(id: string): Promise<void> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      await this.userRepository.delete(id);
    } catch (error) {
      console.error('Error removing user:', error);
      throw new Error(error.message);
    }
  }



  async updatePrice(data: PriceDto): Promise<void> {
    try {
      const { china, turkey } = data;
      const PRICES = await this.PriceRepository.findOne({
        where: { id: process.env.PRICE_ID },

      });
      PRICES.China = china ?? PRICES.China
      PRICES.Turkey = turkey ?? PRICES.Turkey
      this.PriceRepository.save(PRICES);
    } catch (error) {

    }
  }
  async getPaymentHistory(
    page: number,
    limit: number,
    userId?: string,
    sort: 'ASC' | 'DESC' = 'DESC',
  ) {
    try {
      const skip = (page - 1) * limit;
      console.log()
      // Build the query
      const query = this.paymentHistory.createQueryBuilder('paymentHistory');

      // Search by userId if provided
      if (userId) {
        query.where('paymentHistory.userId = :userId', { userId });
      }

      // Add sorting by date
      query.orderBy('paymentHistory.date', sort);

      // Add pagination
      query.skip(skip).take(limit);

      // Execute query and get total count
      const [data, total] = await query.getManyAndCount();

      return {
        data,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      console.error('Error in getPaymentHistory:', error);
      throw new Error(error.message);
    }
  }

  async transactionHistory(
    page: number,
    limit: number,
    userId?: string,
    sort: 'ASC' | 'DESC' = 'DESC',
  ) {
    try {
      const skip = (page - 1) * limit;
      console.log()
      // Build the query
      const query = this.transactionRepostiory.createQueryBuilder('Transaction');

      // Search by userId if provided
      if (userId) {
        query.where('transactions.userId = :userId', { userId });
      }

      // Add sorting by date
      query.orderBy('Transaction.date', sort);

      // Add pagination
      query.skip(skip).take(limit);

      // Execute query and get total count
      const [data, total] = await query.getManyAndCount();

      return {
        data,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      console.error('Error in Transaction:', error);
      throw new Error(error.message);
    }
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address | null> {
    try {
       const existingAddress = await this.entityManager.findOne(Address, {
        where: {
          Province: createAddressDto.Province,
          District: createAddressDto.District,
          Street: createAddressDto.Street,
          ZIP: createAddressDto.ZIP
        }
      });
  
       if (existingAddress) {
        console.log(`Address already exists: ${existingAddress.Address}`);
        return null;
      }
  
      // Create and save a new address if it doesn't exist
      const address = this.entityManager.create(Address, createAddressDto);
      return await this.entityManager.save(address);
    } catch (error) {
      throw new Error(`Error creating address: ${error.message}`);
    }
  }
  

  // // 
  // async updateAddress(id: number, updateAddressDto: CreateAddressDto) {
  //   try {
  //     const updateResult = await this.entityManager.update(Address, id, updateAddressDto);

  //     if (updateResult.affected === 0) {
  //      throw new NotFoundException(`Address with ID ${id} not found`);
  //    }


  //    return  "updated"
  //   } catch (error) {
  //     console.log(error)
  //     throw new Error(error)
  //   }

  // }

  // async findAllAddress(): Promise<Address[]> {
  //   try {
  //     return  await this.entityManager.find(Address);

  //   } catch (error) {
  //     console.log(error)
  //     throw new Error(error)
  //   }
  // }

}