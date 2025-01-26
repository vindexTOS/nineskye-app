import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, } from 'typeorm';
import { User } from './user.entity';
@Entity()
export class PaymentHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Use 'string' for uuid

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  payment_id: string;

  @Column()
  currency: string;

  @Column()
  masked_card: string;

  @Column()
  maskresponse_signature_stringed_card: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.transactions, { eager: false })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  date: Date;
}
