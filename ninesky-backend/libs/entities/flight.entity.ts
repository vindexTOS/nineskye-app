import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Parcel } from "./parcel.entity";
import { FlightFrom } from "libs/enums/flightsFrom.enum";
import { ShippingStatus } from "libs/enums/shipping.status.enum";

@Entity()
export class Flight {
    @PrimaryGeneratedColumn("increment")// or use @PrimaryGeneratedColumn() for auto-incrementing numbers
    id: number; // Change to `number` if using auto-increment

    @Column({ unique: true })
    flight_id: string;

    @OneToMany(() => Parcel, (parcel) => parcel.flight)
    parcels: Parcel[];
  
    @Column({
      type: 'enum',
      enum: FlightFrom,
    })
    flight_from: FlightFrom;
  
    @Column({
      type: 'enum',
      enum: ShippingStatus,
      default: ShippingStatus.BROUGHT,
    })
    shipping_status: ShippingStatus;
    
    // Changed from string to Date (timestamp)
    @Column({ type: 'timestamp' })
    arrived_at: Date;
  
    // New column to store when the flight was created
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  }