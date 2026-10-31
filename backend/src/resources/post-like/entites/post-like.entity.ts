import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from '@resources/post/entites/post.entity';
import { UserEntity } from '@resources/user/entites/user.entity';

@Entity()
export class PostLikeEntity {
  @PrimaryGeneratedColumn('uuid')
  postLikeId: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @RelationId((like: PostLikeEntity) => like.user)
  userId: string;

  @ManyToOne(() => PostEntity, (post) => post.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  post: PostEntity;

  @RelationId((like: PostLikeEntity) => like.post)
  postId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
