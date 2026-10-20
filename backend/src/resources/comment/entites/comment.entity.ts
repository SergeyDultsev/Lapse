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
import { PostEntity } from '@resources/post/entites/post.entity';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  commentId: string;

  @ManyToOne(() => CommentEntity, (comment) => comment.replies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parentCommentId' })
  parentComment: CommentEntity | null;

  @RelationId((comment: CommentEntity) => comment.parentComment)
  parentCommentId: string | null;

  @OneToMany(() => CommentEntity, (comment) => comment.parentComment)
  replies: CommentEntity[];

  @Column()
  textContent: string;

  @Column({ default: 0 })
  countLike: number;

  @Column({ default: 0 })
  countReplies: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @RelationId((comment: CommentEntity) => comment.user)
  userId: string;

  @ManyToOne(() => PostEntity, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  post: PostEntity;

  @RelationId((comment: CommentEntity) => comment.post)
  postId: string;
}
