import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostLikeService } from './post-like.service';
import { PostLikeController } from './post-like.controller';
import { PostLikeEntity } from '@resources/post-like/entites/post-like.entity';
import { PostEntity } from '@resources/post/entites/post.entity';
import { UserEntity } from '@resources/user/entites/user.entity';
import { PostModule } from '@resources/post/post.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostLikeEntity, PostEntity, UserEntity]),
    PostModule,
  ],
  controllers: [PostLikeController],
  providers: [PostLikeService],
})
export class PostLikeModule {}
