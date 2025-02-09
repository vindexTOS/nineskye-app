import { PartialType } from '@nestjs/mapped-types';
import { CreateParcelDto } from './create-parcel.dto';
import { IsEnum, IsNumber, isNumber, IsOptional } from 'class-validator';
import { PaymentType } from 'libs/enums/payment.status.enum';

export class UpdateParcelDto extends PartialType(CreateParcelDto) {

    @IsOptional()     
    @IsEnum(PaymentType)    
     payment_status: PaymentType; 

     @IsOptional()     
  @IsNumber()
  price: number   

}
