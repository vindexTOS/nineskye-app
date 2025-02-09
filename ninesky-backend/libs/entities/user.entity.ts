import { 
  Entity, 
  Column, 
  PrimaryColumn, 
  OneToMany, 
  OneToOne, 
  JoinColumn, 
  BeforeInsert 
} from 'typeorm';
import { Parcel } from './parcel.entity';
import { AccessLevel } from 'libs/enums/accese.levels.enum';
import { Transaction } from './transactions.entity';
import { TransactionType } from 'libs/enums/transactions.enum';
import { UserDetails } from './userDetails.entity';
import { PaymentHistory } from './payment.entity';

@Entity()
export class User {
  // Use a custom primary column.
  // The id will be generated in the format "sky-000000".
  @PrimaryColumn()
  id: string;

  // Added the personal_number column so that filtering on this field works.
  @Column({ nullable: true })
  personal_number: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: AccessLevel,
    default: AccessLevel.USER,
  })
  accessLevel: AccessLevel;

  // Add a balance column which is a float.
  @Column({ type: 'float', default: 0 })
  balance: number;

  @OneToOne(() => UserDetails, (userDetails) => userDetails.user, {
    cascade: true,
    nullable: true,
  })
  userDetails: UserDetails;

  @OneToMany(() => Parcel, (parcel) => parcel.owner)
  parcels: Parcel[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => PaymentHistory, (paymentHistory) => paymentHistory.user)
  payment_history: PaymentHistory[];

  // Before the entity is inserted, generate a custom id.
  @BeforeInsert()
  generateId() {
    // This example uses a random 6-digit number.
    // For a truly sequential number, you'll need a different strategy.
    const randomNumber = Math.floor(Math.random() * 1000000);
    this.id = `SKY-${randomNumber.toString().padStart(6, '0')}`;
  }
}
