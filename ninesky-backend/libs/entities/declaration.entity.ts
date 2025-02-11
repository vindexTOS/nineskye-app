import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Parcel } from './parcel.entity';

@Entity()
export class Declaration {
  @PrimaryGeneratedColumn()
  id: string;
  
  @OneToOne(() => Parcel, (user) => user.declaration)
  @JoinColumn()
  parcel: Parcel;

  @Column()
  type: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column()
  website: string;

  @Column('text', { nullable: true })
  comment: string;

  @Column({
    type: 'longblob',   
    nullable: true,
  })
  invoice_Pdf: Buffer;
  
}
