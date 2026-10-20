import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { PostEntity } from '@resources/post/entites/post.entity';
import { CommentEntity } from '@resources/comment/entites/comment.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

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

  @Column({
    default: 0,
  })
  countPosts: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  refreshTokenHash: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => PostEntity, (post) => post.user, {
    onDelete: 'CASCADE',
  })
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user, {
    onDelete: 'CASCADE',
  })
  comments: CommentEntity[];
}
