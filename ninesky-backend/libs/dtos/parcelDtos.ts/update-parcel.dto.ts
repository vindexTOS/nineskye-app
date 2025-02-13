
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentType } from 'libs/enums/payment.status.enum';
import { parcelStatus } from 'libs/enums/parcelstatus.enum';

export class UpdateParcelDto {
  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsEnum(PaymentType)
  payment_status?: PaymentType;

  @IsOptional()
  @IsEnum(parcelStatus)
  parcelStatus?: parcelStatus;

}
