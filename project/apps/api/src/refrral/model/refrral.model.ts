import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Rafrral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  helper: string;

  @Column()
  user: string;

  @CreateDateColumn()
  createdAt: Date;
}

