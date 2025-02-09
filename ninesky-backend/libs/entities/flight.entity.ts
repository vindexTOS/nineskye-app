import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Parcel } from "./parcel.entity";
import { FlightFrom } from "libs/enums/flightsFrom.enum";

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

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
