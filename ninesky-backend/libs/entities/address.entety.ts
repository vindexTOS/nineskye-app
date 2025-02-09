import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
 

@Entity()
export class Address {

    @PrimaryGeneratedColumn("increment")// or use @PrimaryGeneratedColumn() for auto-incrementing numbers
    id: number; // Change to `number` if using auto-increment




    @Column()
    Province: string;

     @Column()
     Country:string
    

    @Column()
    District: string;

    @Column()
    Street: string;



    @Column()
    Address: string;

    @Column()
    TEL: string;
    @Column()
    ZIP: string;
}
