import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, UseGuards, Put, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from '../../libs/dtos/UserDto.ts/update-user.dto';
import { JwtAuthGuard } from 'libs/guards/Jwt.Auth.Guard';
import { GetUser } from 'libs/decorators/getUser';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateDeclarationDto } from 'libs/dtos/declarationDtos.ts/createDeclarationDto';
import { CreateAddressDto } from 'libs/dtos/addressDto/addressDto';


@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get('profile') 
  async getProfile(@GetUser() user : userPaylaod ) {
    return  await this.userService.getProfile(user.sub); 
  }


  @Post("update")
  async updateProfile(@GetUser() user : userPaylaod , @Body() body: UpdateUserDto) {
    return await this.userService.updateProfile(user.sub, body);
  }


  @Post('declarate-parcel')
  @UseInterceptors(FileInterceptor('file'))
  async declarateParcel(
    @Body() body: CreateDeclarationDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    
    const invoice_Pdf = file ? file.buffer : null;
    
    return await this.userService.createDeclaration({
      ...body,
      invoice_Pdf,
    });
  }

 
  // Update declaration endpoint
  @Put('update-declaration')
  @UseInterceptors(FileInterceptor('file'))
  async updateDeclaration(
    @Body() body: CreateDeclarationDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    // When updating, we pass the file buffer only if a file is provided.
    // If no file is provided, invoice_Pdf will be undefined, so the service can decide to leave it unchanged.
    const invoice_Pdf = file ? file.buffer : undefined;
    return await this.userService.updateDeclaration({ ...body, invoice_Pdf });
  }
 

// 
  @Post('pay-parcels')
  async payParcels(@GetUser() user: userPaylaod, @Body() body: {tracking_id:string}[]) {
    return this.userService.payParcels(user.sub, body)
  }

  // 


  
}
