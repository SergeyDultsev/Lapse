import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentLikeService } from './comment-like.service';
import { CommentLikeController } from './comment-like.controller';
import { CommentLikeEntity } from '@resources/comment-like/entites/comment-like.entity';
import { CommentEntity } from '@resources/comment/entites/comment.entity';
import { UserEntity } from '@resources/user/entites/user.entity';
import { CommentModule } from '@resources/comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentLikeEntity, CommentEntity, UserEntity]),
    CommentModule,
  ],
  controllers: [CommentLikeController],
  providers: [CommentLikeService],
})
export class CommentLikeModule {}
