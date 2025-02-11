import { IsNotEmpty, IsString, IsArray, ValidateNested, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

class ParcelDto {
  @IsNotEmpty()
  @IsString()
  tracking_id: string;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsString()
  ownerId: string;

}

export class CreateParcelsDto {
  @IsNotEmpty()
  @IsString()
  flightId: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParcelDto)
  parcels: ParcelDto[];
}
