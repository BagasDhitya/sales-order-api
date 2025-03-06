import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Sales {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column("json")
  items: string[];

  @Column("decimal")
  totalAmount: number;

  @CreateDateColumn()
  date: Date;
}
