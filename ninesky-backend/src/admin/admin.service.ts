import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { Parcel } from 'libs/entities/parcel.entity';

import { UpdateUserDto } from 'libs/dtos/UserDto.ts/update-user.dto';
import { Flight } from 'libs/entities/flight.entity';
import { Price } from 'libs/entities/prices.entity';
import { CreateFlightDto, UpdateFlightDto } from 'libs/dtos/flightDtos/createFlightDto';
import { PriceDto } from 'libs/dtos/PriceDto/updatePriceDto';
import { FlightFrom } from 'libs/enums/flightsFrom.enum';
import * as bcrypt from 'bcrypt';
import { AccessLevel } from 'libs/enums/accese.levels.enum';
import { PaymentHistory } from 'libs/entities/payment.entity';
import { Transaction } from 'libs/entities/transactions.entity';
import { Address } from 'libs/entities/address.entety';
import { CreateAddressDto } from 'libs/dtos/addressDto/addressDto';
import { CreateParcelsDto } from 'libs/dtos/parcelDtos.ts/create-parcel.dto';
import { PaymentType } from 'libs/enums/payment.status.enum';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(

    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
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

    // dummyData.forEach((val: CreateAddressDto) => {
    //   this.createAddress(val)
    // })

  }


  async getFlightsPaginated(
    page: number = 1,
    limit: number = 10,
    flightId?: string,
  ): Promise<{ flights: Flight[]; total: number; page: number; lastPage: number }> {
    try {
      if (flightId) {
        // FlightId is provided: fetch the flight with its parcels
        const flight = await this.flightRepository.findOne({
          where: { flight_id: flightId },
          relations: ['parcels'],
        });
        if (flight) {
          return {
            flights: [flight],
            total: 1,
            page: 1,
            lastPage: 1,
          };
        } else {
          // Optionally, throw an exception or return empty results if the flight is not found.
          return {
            flights: [],
            total: 0,
            page: 1,
            lastPage: 1,
          };
        }
      } else {
        // No flightId provided: return paginated flights without loading parcels
        const [flights, total] = await this.flightRepository.findAndCount({
          skip: (page - 1) * limit,
          take: limit,
          order: { created_at: 'DESC' },
          // Not including the 'parcels' relation here
        });
        const lastPage = Math.ceil(total / limit);
        return {
          flights,
          total,
          page,
          lastPage,
        };
      }
    } catch (error) {
      // Log the error if necessary and throw an appropriate exception.
      throw new InternalServerErrorException(
        'An error occurred while retrieving flights. Please try again later.'
      );
    }
  }
  

  async createFlight(createFlightDto: CreateFlightDto): Promise<Flight> {
    try {
      // Create a new flight instance from the DTO.
      // If needed, convert date strings to Date objects here.
      const flight = this.flightRepository.create({
        ...createFlightDto,
        arrived_at: new Date(createFlightDto.arrived_at),
      });
      return await this.flightRepository.save(flight);
    } catch (error) {
      // Log the error if needed.
      throw new InternalServerErrorException('An error occurred while creating the flight.');
    }
  }

  /**
   * Updates an existing Flight identified by flight_id with the new data from the DTO.
   * If the flight is not found, a NotFoundException is thrown.
   */
  async updateFlight(flightId: string, updateFlightDto: UpdateFlightDto): Promise<Flight> {
    try {
      const flight = await this.flightRepository.findOne({
        where: { flight_id: flightId },
      });
      if (!flight) {
        throw new NotFoundException(`Flight with id ${flightId} not found`);
      }
      // Update fields; if arrived_at is provided, convert it to a Date.
      if (updateFlightDto.arrived_at) {
        updateFlightDto.arrived_at = new Date(updateFlightDto.arrived_at) as any;
      }
      Object.assign(flight, updateFlightDto);
      return await this.flightRepository.save(flight);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred while updating the flight.');
    }
  }

  

  async createParcels(data: CreateParcelsDto): Promise<Parcel[]> {
    try {
      // Retrieve the flight by its flight_id (common for all parcels)
      const flight: Flight = await this.flightRepository.findOne({
        where: { flight_id: data.flightId },
      });
      if (!flight) {
        throw new NotFoundException(`Flight with id ${data.flightId} not found`);
      }
  
      // Retrieve pricing information once
      const priceRecord = await this.PriceRepository.findOne({ where: { id: "1" } });
      if (!priceRecord) {
        throw new NotFoundException('Prices not found');
      }
  
      const parcels: Parcel[] = [];
  
      // Loop through each parcel DTO and create a Parcel entity
      for (const parcelData of data.parcels) {
        // Find the owner for this parcel
        const owner: User = await this.userRepository.findOne({ where: { id: parcelData.ownerId } });
        if (!owner) {
          throw new ConflictException(`Owner with id ${parcelData.ownerId} does not exist`);
        }
  
        // Calculate the parcel price based on the flight's origin
        const calculatedPrice =
          flight.flight_from === FlightFrom.CHINA
            ? parcelData.weight * priceRecord.China
            : parcelData.weight * priceRecord.Turkey;
  
        // Create the Parcel entity and associate it with the owner and flight
        const newParcel = this.parcelRepository.create({
          id: parcelData.tracking_id,
          weight: parcelData.weight,
          price: calculatedPrice,
          owner,
          flight,
        });
  
        parcels.push(newParcel);
      }
  
      // Save all the created parcels in one operation
      const savedParcels = await this.parcelRepository.save(parcels);
      if (!savedParcels || savedParcels.length === 0) {
        throw new ConflictException('Failed to save parcels');
      }
      return savedParcels;
    } catch (error) {
      console.error(error);
      throw new ConflictException(error.message);
    }

}
  async updateParcel(id: string, updateParcelDto: any): Promise<Parcel> {
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
                          
                          
                          // 
                          async updateAddress(id: number, updateAddressDto: CreateAddressDto) {
                              try {
                                  const updateResult = await this.entityManager.update(Address, id, updateAddressDto);
                              
                                  if (updateResult.affected === 0) {
                                     throw new NotFoundException(`Address with ID ${id} not found`);
                                   }
                                
                                
                                   return  "updated"
                                  } catch (error) {
                                      console.log(error)
                                      throw new Error(error)
                                    }
                                  
                                  }
                                  
                                  async findAllAddress(): Promise<Address[]> {
                                      try {
                                          return  await this.entityManager.find(Address);
                                      
                                        } catch (error) {
                                            console.log(error)
                                            throw new Error(error)
                                          }
                                        }
                                        
                                      }
