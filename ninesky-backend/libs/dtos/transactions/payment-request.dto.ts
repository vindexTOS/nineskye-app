import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { TransactionType } from 'libs/enums/transactions.enum';


export class PaymentRequestDto {
    @IsString()
    @IsNotEmpty()
    customerFirstName: string

    @IsString()
    @IsNotEmpty()
    customerLastName: string
    
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    currency: string





}
