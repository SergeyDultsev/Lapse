import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '@resources/comment/entites/comment.entity';
import { UserEntity } from '@resources/user/entites/user.entity';
import { PostModule } from '@resources/post/post.module';
import { UserModule } from '@resources/user/user.module';
import { PostService } from '@resources/post/post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, UserEntity]),
    PostModule,
    UserModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, PostService],
})
export class CommentModule {}
