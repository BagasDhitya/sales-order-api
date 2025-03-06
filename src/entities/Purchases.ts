import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Purchases {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    supplierName: string;

    @Column("json")
    items: string[];

    @Column("decimal")
    totalAmount: number;

    @Column()
    status: string;

    @CreateDateColumn()
    orderDate: Date;
}
