import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@resources/user/entites/user.entity';
import { CommentEntity } from '@resources/comment/entites/comment.entity';

@Entity()
@Unique(['userId', 'commentId'])
export class CommentLikeEntity {
  @PrimaryGeneratedColumn('uuid')
  commentLikeId: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @RelationId((like: CommentLikeEntity) => like.user)
  userId: string;

  @ManyToOne(() => CommentEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'commentId' })
  comment: CommentEntity;

  @RelationId((like: CommentLikeEntity) => like.comment)
  commentId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
