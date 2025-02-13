import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseGuards, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateUserDto } from 'libs/dtos/UserDto.ts/update-user.dto';
import { UpdateParcelDto } from 'libs/dtos/parcelDtos.ts/update-parcel.dto';
import { JwtAdminGuard } from 'libs/guards/jwt.Admin.Guard';
import { Flight } from 'libs/entities/flight.entity';
import { CreateFlightDto, UpdateFlightDto } from 'libs/dtos/flightDtos/createFlightDto';
import { CreateParcelsDto } from 'libs/dtos/parcelDtos.ts/create-parcel.dto';
import { Parcel } from 'libs/entities/parcel.entity';


// @UseGuards(JwtAdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
  ) { }


  @Get('/get-flights')
  getFlights(@Query() data:  { page: number , limit : number, flight_id : string}){
    return this.adminService.getFlightsPaginated(data.page, data.limit, data.flight_id)
  }

  @Post('/create-flight')
  async createFlight(@Body() createFlightDto: CreateFlightDto): Promise<Flight> {
    return this.adminService.createFlight(createFlightDto);
  }

  @Put('/update-flight/:flightId')
  async updateFlight(
    @Param('flightId') flightId: string,
    @Body() updateFlightDto: UpdateFlightDto,
  ): Promise<Flight> {
    return this.adminService.updateFlight(flightId, updateFlightDto);
  }

    
  @Get('/get-parcels')
  getParcels(@Query() data: getParcelDto) {
    return this.adminService.getAllParcel(data)
  }
  
  @Post('/create-parcels')
  async createParcels(@Body() createParcelsDto: CreateParcelsDto): Promise<Parcel[]> {
    return this.adminService.createParcels(createParcelsDto);
  }

 @Put('/update-parcel/:id')
 updateParcel(@Param('id') id: string, @Body() updateParcelDto: UpdateParcelDto) {
   return this.adminService.updateParcel(id, updateParcelDto);
 }
  
 @Delete('/delete-parcel/:id')
 deleteParcel(@Param('id') id: string) {
   return this.adminService.deleteParcel(id);
 }
  
  //  useres  modzebna
  @Get('/get-users')
  getUsers(@Query() data: getUserDto) {
    return this.adminService.getUsers(data)
  }
  //  users update

  @Put('/update-user/:id')
  updateUser(@Body() data: UpdateUserDto, @Param('id') id: string,) {
    return this.adminService.updateUser(id, data)
  }

  //  users washla 
  @Delete('/delete-user/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id)
  }

  @Put('update-price')
  updatePrice(@Query() data : {china : number, turkey : number}){
    return this.adminService.updatePrice(data)
  }

  // 
  @Get('/payment-history')
  async paymentHistory(
    @Query('page') page: number =1, // Default to page 1
    @Query('limit') limit: number = 10, // Default to 10 items per page
    @Query('userId') userId?: string, // Optional userId for search
    @Query('sort') sort: 'ASC' | 'DESC' = 'DESC', // Sort order (default: DESC)
  ) {
    return this.adminService.getPaymentHistory(page, limit, userId, sort);
  }
  @Get('/transaction-history')
  async transactionHistory(
    @Query('page') page: number =1, // Default to page 1
    @Query('limit') limit: number = 10, // Default to 10 items per page
    @Query('userId') userId?: string, // Optional userId for search
    @Query('sort') sort: 'ASC' | 'DESC' = 'DESC', // Sort order (default: DESC)
  ) {
    return this.adminService.transactionHistory(page, limit, userId, sort);
  }


  // @Post("create-address")
  // async createAddress(
  //   @Body() createAddressDto: CreateAddressDto,
  // )  {
  //   return await this.adminService.createAddress(createAddressDto);
  // }

  // @Post('address/:id')
  // async updateAddress(
  //   @Param('id') id: string,
  //   @Body() updateAddressDto: CreateAddressDto,
  // )  {
  //   return await this.adminService.updateAddress(+id, updateAddressDto);
  // }


  
  // @Get("get-all-address")
  // async getAddresses()  {
  //   return await this.adminService.findAllAddress();
  // }

}
