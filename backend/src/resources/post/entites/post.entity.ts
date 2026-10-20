import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@resources/user/entites/user.entity';
import { CommentEntity } from '@resources/comment/entites/comment.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  postId: string;

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @RelationId((post: PostEntity) => post.user)
  userId: string;

  @OneToMany(() => CommentEntity, (comment) => comment.post, {
    onDelete: 'CASCADE',
  })
  comments: CommentEntity[];
}
