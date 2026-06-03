import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
