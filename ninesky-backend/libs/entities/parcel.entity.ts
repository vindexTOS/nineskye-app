import { Entity, Column, PrimaryColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { ShippingStatus } from 'libs/enums/shipping.status.enum';
import { Declaration } from './declaration.entity';
import { PaymentType } from 'libs/enums/payment.status.enum';
import { Flight } from './flight.entity';

@Entity()
export class Parcel {

  @PrimaryColumn()
  id : string;
  
  @Column({type : 'float' }) 
  weight: number;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: PaymentType,
    default: PaymentType.UNPAID,
  })
  payment_status: string;

  @OneToOne(() => Declaration,(declaration)=>declaration.parcel ,{ cascade: true })
  @JoinColumn() 
  declaration: Declaration;

  @ManyToOne(() => User, (user) => user.parcels)
  owner: User; 

  @ManyToOne(() => Flight, (flight) => flight.parcels)
  @JoinColumn()
  flight: Flight;


}
