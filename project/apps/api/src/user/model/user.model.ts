import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, AfterInsert } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  device_id: string;

  @Column()
  device_info: string;

  @Column()
  device_name: string;

  @Column({nullable:true})
  phone: string;

  @Column()
  referral: string;

  @Column({})
  my_referral: string;

  @Column({nullable:true})
  password: string;

  @Column({nullable:true})
  user_image: string;

  @Column({nullable:true})
  nrc: string;


  @Column({nullable:true})
  dob: string;

  @Column()
  token: string;


}