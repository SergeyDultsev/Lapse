import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentLikeService } from './comment-like.service';
import { JwtGuard } from '@resources/auth/guards/jwt.guard';
import { JwtPayload } from '@resources/auth/strategies/jwt.strategy';
import { ToggleCommentLikeDto } from '@resources/comment-like/dto/toggle-comment-like.dto';

@Controller('comment-like')
export class CommentLikeController {
  constructor(private readonly commentLikeService: CommentLikeService) {}

  @UseGuards(JwtGuard)
  @Post('/toggle')
  @HttpCode(HttpStatus.OK)
  async toggleLike(
    @Body() dto: ToggleCommentLikeDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    const comment = await this.commentLikeService.toggleComment(
      dto.commentId,
      req.user.userId,
    );

    return {
      data: comment,
      message: comment.isLiked ? 'Like created' : 'Like removed',
      statusCode: HttpStatus.OK,
    };
  }
}
