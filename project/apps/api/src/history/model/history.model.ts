import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @Column({default:0})
  coin: number;

  @Column()
  quiz: string;

  @Column()
  skip_quiz: string;

  @Column()
  index_quiz: string;

  @Column({})
  date: string;

  @CreateDateColumn()
  createdAt: Date;
}

