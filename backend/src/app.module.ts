import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from '@resources/post/post.module';
import { UserModule } from '@resources/user/user.module';
import { CommentModule } from '@resources/comment/comment.module';
import { AuthModule } from '@resources/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PostModule,
    UserModule,
    CommentModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
