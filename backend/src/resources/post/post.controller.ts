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
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '@resources/post/dto/create-post.dto';
import { JwtGuard } from '@resources/auth/guards/jwt.guard';
import { OptionalJwtGuard } from '@resources/auth/guards/optional-jwt.guard';
import { PaginationDto } from '@/common/dto/PaginationDto';
import { JwtPayload } from '@resources/auth/strategies/jwt.strategy';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtGuard)
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async createPost(
    @Body() dto: CreatePostDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    const newPost = await this.postService.createPost(req.user.userId, dto);

    return {
      data: newPost,
      message: 'Post created',
      statusCode: HttpStatus.CREATED,
    };
  }

  @UseGuards(OptionalJwtGuard)
  @Get('users/:id')
  @HttpCode(HttpStatus.OK)
  async getUserPosts(
    @Param('id') userId: string,
    @Query() pagination: PaginationDto,
    @Req() req: Request & { user?: JwtPayload },
  ) {
    const posts = await this.postService.getPosts(
      userId,
      pagination.page,
      pagination.limit,
      req.user?.userId,
    );

    return {
      data: posts,
      message: 'User posts retrieved',
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(OptionalJwtGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getPost(
    @Param('id') postId: string,
    @Req() req: Request & { user?: JwtPayload },
  ) {
    const post = await this.postService.getPost(postId, req.user?.userId);

    return {
      data: post,
      message: 'Post retrieved',
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletePost(
    @Param('id') postId: string,
    @Req() req: Request & { user: JwtPayload },
  ) {
    const deletedPost = await this.postService.deletePost(
      postId,
      req.user.userId,
    );

    return {
      data: deletedPost,
      message: 'Post deleted',
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(OptionalJwtGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async postsAll(@Req() req: Request & { user?: JwtPayload }) {
    const posts = await this.postService.getAll(req.user?.userId);

    return {
      data: posts,
      message: 'Posts retrieved',
      statusCode: HttpStatus.OK,
    };
  }
}
