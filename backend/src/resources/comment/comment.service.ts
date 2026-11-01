import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from '@resources/comment/dto/create-comment.dto';
import { In, IsNull, Repository } from 'typeorm';
import { CommentEntity } from '@resources/comment/entites/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@resources/user/entites/user.entity';
import { UserService } from '@resources/user/user.service';
import { PostService } from '@resources/post/post.service';
import { PostEntity } from '@resources/post/entites/post.entity';
import { CommentLikeEntity } from '@resources/comment-like/entites/comment-like.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(CommentLikeEntity)
    private readonly commentLikeRepository: Repository<CommentLikeEntity>,
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  /**
   * Находит коммента по идентификатору без побочных эффектов.
   *
   * @param commentId Идентификатор коммент
   *
   * @returns Пост из базы данных
   */
  public async findCommentById(commentId: string) {
    const comment = await this.commentRepository.findOne({
      where: { commentId },
    });

    if (!comment) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return comment;
  }

  /**
   * Создает комментарий.
   *
   * @param userId Идентификатор автора
   * @param postId Идентификатор поста
   * @param dto Данные нового комментария
   *
   * @returns Созданный комментарий
   */
  async createComment(
    userId: string,
    postId: string,
    dto: CreateCommentDto,
  ): Promise<ReturnType<CommentService['sanitizeComment']>> {
    await this.postService.findPostById(postId);

    let parentComment: CommentEntity | null = null;

    if (dto.parentCommentId) {
      parentComment = await this.commentRepository.findOne({
        where: {
          commentId: dto.parentCommentId,
          postId: postId,
        },
      });

      if (!parentComment) {
        throw new NotFoundException('Parent comment not found');
      }

      if (parentComment.parentCommentId) {
        throw new BadRequestException(
          'Replies to replies are not allowed: max nesting depth is 1',
        );
      }
    }

    const comment = this.commentRepository.create({
      user: { userId } as UserEntity,
      post: { postId } as PostEntity,
      parentComment: parentComment,
      textContent: dto.textContent,
    });

    const savedComment = await this.commentRepository.save(comment);

    await this.postRepository.increment({ postId: postId }, 'countComment', 1);
    if (parentComment) {
      await this.commentRepository.increment(
        { commentId: parentComment.commentId },
        'countReplies',
        1,
      );
    }

    const [sanitizedComment] = await this.sanitizeComments(
      [savedComment],
      userId,
    );

    return sanitizedComment;
  }

  /**
   * Выводит топ-уровневые комментарии поста.
   *
   * @param postId Идентификатор поста
   * @param page текущая страница
   * @param limit кол-во комментариев
   * @param userId Идентификатор авторизованного пользователя (необязательный)
   *
   * @returns Коллекцию комментариев с метой пагинации
   */
  async getComments(
    postId: string,
    page: number,
    limit: number,
    userId?: string,
  ) {
    const [comments, totalItems] = await this.commentRepository.findAndCount({
      where: { postId: postId, parentCommentId: IsNull() },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      comments: await this.sanitizeComments(comments, userId),
      meta: {
        totalItems,
        page: page,
        limit,
        lastPage: Math.ceil(totalItems / limit),
      },
    };
  }

  /**
   * Выводит ответы на комментарий.
   *
   * @param commentId Идентификатор комментария
   * @param userId Идентификатор авторизованного пользователя
   *
   * @returns Коллекцию ответов
   */
  async getReplies(commentId: string, userId?: string) {
    const replies = await this.commentRepository.find({
      where: { parentCommentId: commentId },
      order: { createdAt: 'ASC' },
    });

    return this.sanitizeComments(replies, userId);
  }

  /**
   * Удаляет комментарий автора.
   *
   * @param commentId Идентификатор комментария
   * @param userId Идентификатор авторизованного пользователя
   *
   * @returns Идентификатор удаленного комментария
   */
  async deleteComment(commentId: string, userId: string) {
    const comment = await this.commentRepository.findOne({
      where: { commentId: commentId },
    });

    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.userId !== userId)
      throw new ForbiddenException('Not your comment');
    if (comment.countReplies > 0)
      throw new BadRequestException('Cannot delete a comment with replies');

    if (comment.parentCommentId) {
      await this.commentRepository.decrement(
        { commentId: comment.parentCommentId },
        'countReplies',
        1,
      );
    }

    await this.postRepository.decrement(
      { postId: comment.postId },
      'countComment',
      1,
    );

    await this.commentRepository.delete(commentId);

    return { commentId };
  }

  /**
   * Создает JSON-коллекцию одного комментария
   *
   * @param comment Комментарий
   * @param user Пользователь
   * @param isLiked Флаг лайка
   *
   * @returns Коллекцию поста пользователя
   */
  public sanitizeComment(
    comment: CommentEntity,
    user: UserEntity,
    isLiked: boolean,
  ) {
    return {
      commentId: comment.commentId,
      userId: comment.userId,
      postId: comment.postId,
      parentCommentId: comment.parentCommentId,
      textContent: comment.textContent,
      isLiked: isLiked,
      meta: {
        countLike: comment.countLike,
        countReplies: comment.countReplies,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        author: this.userService.sanitizeUser(user),
      },
    };
  }

  /**
   * Создает JSON-коллекцию комментариев
   *
   * @param comments Комментарии
   * @param userId Идентификатор авторизованного пользователя (необязательный)
   *
   * @returns Коллекцию комментариев
   */
  public async sanitizeComments(comments: CommentEntity[], userId?: string) {
    if (!comments || comments.length === 0) {
      return [];
    }

    let likesSet = new Set<string>();

    if (userId) {
      const commentsIds = comments.map((c) => c.commentId);

      const likes = await this.commentLikeRepository.find({
        where: { userId, commentId: In(commentsIds) },
      });

      likesSet = new Set(likes.map((like) => like.commentId));
    }

    const userIds = [...new Set(comments.map((comment) => comment.userId))];
    const users = await this.userRepository.findBy({
      userId: In(userIds),
    });

    const userCollection = new Map(users.map((user) => [user.userId, user]));

    return comments
      .map((comment) => {
        const user = userCollection.get(comment.userId);
        return user
          ? this.sanitizeComment(comment, user, likesSet.has(comment.commentId))
          : null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }
}
