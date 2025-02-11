// src/address/dto/create-address.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  Province: string;
  @IsNotEmpty()
  @IsString()
  Country: string;

  @IsNotEmpty()
  @IsString()
  District: string;

  @IsNotEmpty()
  @IsString()
  Street: string;

  @IsNotEmpty()
  @IsString()
  Address: string;

  @IsNotEmpty()
  @IsString()
  TEL: string;

  @IsNotEmpty()
  @IsString()
  ZIP: string;
}
