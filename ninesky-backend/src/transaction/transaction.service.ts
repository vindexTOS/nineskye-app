import { BadGatewayException, BadRequestException, ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

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



  async depositeBalance(body: any) {
    try {
      // Extract userId from order_id; expected format:
      // "userId:SKY-205570;firstName:...;lastName:...;dateTime:..."
      const userId = body.order_id.split(";")[0].split(":")[1];
      if (!userId) {
        throw new BadRequestException('Invalid order_id format');
      }
  
      // Check payment approval status
      if (body.order_status !== 'approved') {
        console.log("Order has not been approved");
        throw new ConflictException("Payment failed");
      }
  
      // Run all updates inside a transaction to ensure atomicity
      return await this.entityManager.transaction(async (manager) => {
        // Check if the payment has already been recorded
        const existingPayment = await manager.findOne(PaymentHistory, {
          where: {
       
            payment_id: body.payment_id,
            
          },
        });
  
        if (existingPayment) {
          throw new ConflictException('Payment already recorded.');
        }
  
        // Find the user
        const user = await manager.findOne(User, { where: { id: userId } });
        if (!user) {
          throw new NotFoundException("User does not exist");
        }
  
        // Calculate deposit amount (assuming body.amount is in cents)
        const depositAmount = body.amount / 100;
  
        // Create a new deposit transaction record
        const newTransaction = manager.create(Transaction, {
          user,
          date: new Date(),
          amount: depositAmount,
          transactionType: TransactionType.DEPOSIT,
        });
  
        // Create a new payment history record
        const paymentHistory = manager.create(PaymentHistory, {
          amount: depositAmount,
          payment_id: body.payment_id,
          currency: body.currency,
          masked_card: body.masked_card,
          maskresponse_signature_stringed_card: body.response_signature_string, // adjust field name as needed
          userId: userId,
          user,
        });
  
        // Increment the user's balance
        user.balance = Number(user.balance) + depositAmount;
  
        // Save all changes within the transaction
        await manager.save(PaymentHistory, paymentHistory);
        await manager.save(Transaction, newTransaction);
        await manager.save(User, user);
  
        // Return the new transaction (or any other result as desired)
        return newTransaction;
      });
    } catch (error) {
      console.log(error);
      throw new ConflictException("Payment failed");
    }
  }
 

  public async GetRedirectUrlAsync(paymentReq: PaymentRequestDto): Promise<any> {
    console.log(paymentReq)
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
        "order_id": `userId:${paymentReq.userId};firstName:${paymentReq.customerFirstName};lastName:${paymentReq.customerLastName};dateTime:${unixSecound}`,
        "currency": paymentReq.currency,
        // "merchant_id": 1549901,
        "merchant_id": process.env.PAYMENT_VENDOR_CODE,
        "order_desc": paymentReq.userId,
        "amount": paymentReq.amount  ,
        "signature": signature
      }
    };
  }
  private async buildSignature(paymentReq: any, unixSecond: number): Promise<string> {
    // Concatenate the parameters in the correct order // 
    return `test|${paymentReq.amount}|${paymentReq.currency}|${process.env.PAYMENT_VENDOR_CODE}|${paymentReq.userId}|userId:${paymentReq.userId};firstName:${paymentReq.customerFirstName};lastName:${paymentReq.customerLastName};dateTime:${unixSecond}|https://ninesky.ge/backend/api/transaction/deposite`;
  }

  public async hashData(data: string): Promise<string> {
    console.log(crypto.createHash('sha1').update(data).digest('hex'))
    return crypto.createHash('sha1').update(data).digest('hex');
  }
}
