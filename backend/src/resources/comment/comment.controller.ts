import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtGuard } from '@resources/auth/guards/jwt.guard';
import { CreateCommentDto } from '@resources/comment/dto/create-comment.dto';
import { JwtPayload } from '@resources/auth/strategies/jwt.strategy';
import { PaginationDto } from '@/common/dto/PaginationDto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtGuard)
  @Post('/create/:postId')
  @HttpCode(HttpStatus.CREATED)
  async createComment(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    const newComment = await this.commentService.createComment(
      req.user.userId,
      postId,
      dto,
    );

    return {
      data: newComment,
      message: 'Comment created',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get('/:postId')
  @HttpCode(HttpStatus.OK)
  async getComments(
    @Param('postId') postId: string,
    @Query() pagination: PaginationDto,
  ) {
    const comments = await this.commentService.getComments(
      postId,
      pagination.page,
      pagination.limit,
    );

    return {
      data: comments,
      message: 'Comment found',
      statusCode: HttpStatus.OK,
    };
  }

  @Get('/:commentId/replies')
  @HttpCode(HttpStatus.OK)
  async getReplies(@Param('commentId') commentId: string) {
    const replies = await this.commentService.getReplies(commentId);

    return {
      data: replies,
      message: 'Replies found',
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(JwtGuard)
  @Delete('/:commentId')
  @HttpCode(HttpStatus.OK)
  async deleteComment(
    @Param('commentId') commentId: string,
    @Req() req: Request & { user: JwtPayload },
  ) {
    const comment = await this.commentService.deleteComment(
      commentId,
      req.user.userId,
    );

    return {
      data: comment,
      message: 'Comment deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
