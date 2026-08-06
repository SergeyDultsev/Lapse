import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '@resources/post/dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/posts')
  async createPost(@Body: CreatePostDto, response: Response) {
    return {
      data: response,
      message: 'Post created',
      statusCode: HttpStatus.CREATED,
    }
  }

  @Get('/posts/:id')
  async getPostsUser(userId: string) {
    return {
      data: userId,
      message: 'Posts user',
      statusCode: HttpStatus.OK,
    }
  }
}
