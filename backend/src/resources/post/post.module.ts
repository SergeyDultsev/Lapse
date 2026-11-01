import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@resources/user/user.module';
import { PostEntity } from '@resources/post/entites/post.entity';
import { UserEntity } from '@resources/user/entites/user.entity';
import { UserService } from '@resources/user/user.service';
import { PostLikeEntity } from '@resources/post-like/entites/post-like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, UserEntity, PostLikeEntity]),
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostService, UserService],
  exports: [PostService],
})
export class PostModule {}
