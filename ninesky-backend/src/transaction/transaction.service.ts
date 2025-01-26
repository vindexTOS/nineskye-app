import { BadGatewayException, ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import * as moment from "moment"
import * as crypto from "crypto";
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { PaymentRequestDto } from '../../libs/dtos/transactions/payment-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { User } from '../../libs/entities/user.entity';
import { PaymentHistory } from '../../libs/entities/payment.entity';
import { Transaction } from '../../libs/entities/transactions.entity';
import { TransactionType } from '../../libs/enums/transactions.enum';

@Injectable()
export class TransactionService {
    constructor(
      private readonly entityManager: EntityManager
      ,
        private readonly httpService: HttpService,
      ) {}

     // ***********************************************************************************
  //  transactions 



  async depositeBalance(body) {



    try {

      const userId = body.order_id.split(";")[0].split(":")[1]
      console.log(body.order_status)

      if (body.order_status != 'approved') {
        console.log("Order has not been approved")

        throw new ConflictException("Payment failed")
      }


      const user = await this.entityManager.findOne(User,{
        where: {
          id: userId
        }
      })

      if (!user) {
        throw new NotFoundException("user does not not existed");
      }
      const newTransaction = this.entityManager.create(Transaction,{
        user,
        date: new Date,
        amount: body.amount,
        transactionType: TransactionType.DEPOSIT

      })
      await this.entityManager.create(PaymentHistory,{
        amount: body.amount,
        payment_id: body.payment_id,
        currency: body.currency,
        masked_card: body.masked_card,
        maskresponse_signature_stringed_card: body.response_signature_string,
        userId: userId
      })




      return this.entityManager.save(Transaction,newTransaction)


    } catch (error) {

      throw new ConflictException("Payment failed")
    }
  }



  public async GetRedirectUrlAsync(paymentReq: any): Promise<any> {
    const body = await this.createPaymentRequestBody(paymentReq);
    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.post('https://pay.flitt.com/api/checkout/url', body, {
          headers: { 'Content-Type': 'application/json' }
        }));
      return response.data;
    }
    catch (error) {
      console.error('Error making payment request:', error.response?.data || error.message);
      throw new Error('Payment request failed');
    }
  }


  private async createPaymentRequestBody(paymentReq: PaymentRequestDto): Promise<any> {
    const unixSecound = moment().unix();
    const signatureData = await this.buildSignature(paymentReq, unixSecound);
    const signature = (await this.hashData(signatureData)).toLowerCase();
    console.log(signatureData)
    console.log(signature)
    return {
      "request": {
        "server_callback_url": "https://ninesky.ge/backend/api/transaction/deposite",
        "order_id": `userId:robikaID;firstName:${paymentReq.customerFirstName};lastName:${paymentReq.customerLastName};dateTime:${unixSecound}`,
        "currency": paymentReq.currency,
        "merchant_id": 1549901,
        "order_desc": paymentReq.userId,
        "amount": paymentReq.amount,
        "signature": signature
      }
    };
  }
  private async buildSignature(paymentReq: any, unixSecond: number): Promise<string> {
    // Concatenate the parameters in the correct order // 
    return `test|${paymentReq.amount}|${paymentReq.currency}|1549901|${paymentReq.userId}|userId:${paymentReq.userId};firstName:${paymentReq.customerFirstName};lastName:${paymentReq.customerLastName};dateTime:${unixSecond}|https://ninesky.ge/backend/api/transaction/deposite`;
  }

  public async hashData(data: string): Promise<string> {
    console.log(crypto.createHash('sha1').update(data).digest('hex'))
    return crypto.createHash('sha1').update(data).digest('hex');
  }
}
