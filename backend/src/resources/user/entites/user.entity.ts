import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    default: '',
  })
  bio: string;

  @Column({
    default: 0,
  })
  countFollowers: number;

  @Column({
    default: 0,
  })
  countSubscriptions: number;
}
