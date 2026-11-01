import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '@resources/comment/entites/comment.entity';
import { Repository } from 'typeorm';
import { CommentService } from '@resources/comment/comment.service';
import { CommentLikeEntity } from '@resources/comment-like/entites/comment-like.entity';
import { UserEntity } from '@resources/user/entites/user.entity';

@Injectable()
export class CommentLikeService {
  constructor(
    @InjectRepository(CommentLikeEntity)
    private readonly commentLikeRepository: Repository<CommentLikeEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly commentService: CommentService,
  ) {}

  /**
   * Выводит топ-уровневые комментарии поста.
   *
   * @param commentId Идентификатор комментарии
   * @param userId Идентификатор пользователя
   *
   * @returns Коллекцию комментариев с метой пагинации
   */
  async toggleComment(commentId: string, userId: string) {
    const comment = await this.commentService.findCommentById(commentId);
    const author = await this.userRepository.findOne({
      where: { userId: comment.userId },
    });

    if (!author) throw new NotFoundException('Author not found');

    const existingLike = await this.commentLikeRepository.findOne({
      where: { commentId, userId },
    });

    if (existingLike) {
      await this.commentLikeRepository.remove(existingLike);
      await this.commentRepository.decrement({ commentId }, 'countLike', 1);
      comment.countLike = Math.max((comment.countLike ?? 1) - 1, 0);
      return this.commentService.sanitizeComment(comment, author, false);
    }

    const createLike = this.commentLikeRepository.create({
      userId: userId,
      commentId: commentId,
    });

    await this.commentRepository.increment({ commentId }, 'countLike', 1);
    await this.commentLikeRepository.save(createLike);
    comment.countLike = (comment.countLike ?? 0) + 1;

    return this.commentService.sanitizeComment(comment, author, true);
  }
}
