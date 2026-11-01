import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostLikeService } from './post-like.service';
import { JwtGuard } from '@resources/auth/guards/jwt.guard';
import { JwtPayload } from '@resources/auth/strategies/jwt.strategy';
import { TogglePostLikeDto } from '@/resources/post-like/dto/toggle-post-like';

@Controller('post-like')
export class PostLikeController {
  constructor(private readonly postLikeService: PostLikeService) {}

  @UseGuards(JwtGuard)
  @Post('/toggle')
  @HttpCode(HttpStatus.OK)
  async toggleLike(
    @Body() dto: TogglePostLikeDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    const post = await this.postLikeService.togglePost(
      dto.postId,
      req.user.userId,
    );

    return {
      data: post,
      message: post.isLiked ? 'Like created' : 'Like removed',
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(JwtGuard)
  @Post('/favorite')
  @HttpCode(HttpStatus.OK)
  async getFavorite(@Req() req: Request & { user: JwtPayload }) {
    const posts = await this.postLikeService.getFavoritePosts(req.user.userId);

    return {
      data: posts,
      message: 'Posts found',
      statusCode: HttpStatus.OK,
    };
  }
}
