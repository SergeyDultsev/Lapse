import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  postId: string;

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column()
  textContent: string;

  @Column({
    default: 0,
  })
  countLike: number;

  @Column({
    default: 0,
  })
  countComment: number;

  @Column({
    default: 0,
  })
  countView: number;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
