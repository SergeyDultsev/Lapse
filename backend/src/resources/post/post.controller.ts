import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '@resources/post/dto/create-post.dto';
import { JwtGuard } from '@resources/auth/guards/jwt.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtGuard)
  @Post('/created')
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() dto: CreatePostDto, @Req() req: any) {
    const newPost = await this.postService.createPost(req.user.userId, dto);

    return {
      data: newPost,
      message: 'Post created',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getPost(@Param('id') postId: string) {
    const post = await this.postService.getPost(postId);

    return {
      data: post,
      message: 'Post retrieved',
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(JwtGuard)
  @Get('users/:id')
  @HttpCode(HttpStatus.OK)
  async getUserPosts(@Req() req: any) {
    const posts = await this.postService.getPosts(req.user.userId);

    return {
      data: posts,
      message: 'User posts retrieved',
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletePost(@Param('id') postId: string) {
    const deletedPost = await this.postService.deletePost(postId);

    return {
      data: deletedPost,
      message: 'Post deleted',
      statusCode: HttpStatus.OK,
    };
  }
}
