import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateUserDto } from 'libs/dtos/UserDto.ts/update-user.dto';
import { UploadParcelsDto } from 'libs/dtos/parcelDtos.ts/UploadParcelsDto';
import { UpdateParcelDto } from 'libs/dtos/parcelDtos.ts/update-parcel.dto';
import { JwtAdminGuard } from 'libs/guards/jwt.Admin.Guard';
import { CreateAddressDto } from 'libs/dtos/addressDto/addressDto';


@UseGuards(JwtAdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
  ) { }


  @Post('/create-parcels')
  uploadParcels(@Body() body: UploadParcelsDto) {
    return this.adminService.uploadParcels(body)
  }

  @Get('/get-parcels')
  getParcels(@Query() data: getParcelDto) {
    return this.adminService.getAllParcel(data)
  }

  //  amanatebis  redaqtireba +
  @Put('/update-parcel/:id')
  updateParcel(@Param('id') id: string, @Body() updateParcelDto: UpdateParcelDto) {
    return this.adminService.updateParcel(id, updateParcelDto);
  }

  //  amanatebis washla 

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
