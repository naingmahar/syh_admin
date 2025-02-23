import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Coin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default:0})
  amount: number;

  @Column()
  user:string;

  @UpdateDateColumn()
  updateAt:Date;

  @CreateDateColumn()
  createdAt: Date;
}

