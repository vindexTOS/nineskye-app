import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {

  constructor(private readonly transactionService: TransactionService) { }

  @Post("callback-topay")
  async callBackToPay(@Body() paymentReq: any) {

    return this.transactionService.GetRedirectUrlAsync(paymentReq)
  }

  @Post('deposite')
  async updateBalance(@Body() body: any) {
    return this.transactionService.depositeBalance(body)
  }
}
