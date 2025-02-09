import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../libs/entities/user.entity';
import { Parcel } from 'libs/entities/parcel.entity';
import { Declaration } from 'libs/entities/declaration.entity';
import { AdminModule } from './admin/admin.module';
import { Transaction } from 'libs/entities/transactions.entity';
import { UserDetails } from 'libs/entities/userDetails.entity';
import { Flight } from 'libs/entities/flight.entity';
import { Price } from 'libs/entities/prices.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentHistory } from 'libs/entities/payment.entity';
import { TransactionModule } from './transaction/transaction.module';
import { Address } from 'libs/entities/address.entety';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    AuthModule,
    AdminModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql', // This stays 'mysql'
        host: configService.get<string>('MYSQL_HOST'), // Correct environment variable
        port: configService.get<number>('MYSQL_PORT'), // Correct environment variable
        username: configService.get<string>('MYSQL_USER'), // Correct environment variable
        password: configService.get<string>('MYSQL_PASSWORD'), // Correct environment variable
        database: configService.get<string>('MYSQL_DB'), // Correct environment variable
        entities: [User, Parcel, Declaration, Transaction, UserDetails, Flight,PaymentHistory, Price, Address],
        synchronize: true,
        migrationsRun: true,
        logging: false,
      }),
    }),
    TypeOrmModule.forFeature([Price]),
    TransactionModule,
  ],
})
export class AppModule {}
