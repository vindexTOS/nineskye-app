import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { TransactionType } from 'libs/enums/transactions.enum';


export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  transactionType: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
