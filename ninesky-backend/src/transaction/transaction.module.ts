import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../libs/entities/user.entity';
import { PaymentHistory } from '../../libs/entities/payment.entity';
import { HttpModule } from '@nestjs/axios';
import { Transaction } from 'typeorm';


@Module({
  imports: [
     HttpModule,
 
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService], 
})
export class TransactionModule {}
