import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from '@resources/user/entites/user.entity';
import { PostService } from '@resources/post/post.service';
import { PostLikeEntity } from '@resources/post-like/entites/post-like.entity';
import { PostEntity } from '@resources/post/entites/post.entity';

@Injectable()
export class PostLikeService {
  constructor(
    @InjectRepository(PostLikeEntity)
    private readonly postLikeRepository: Repository<PostLikeEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly postService: PostService,
  ) {}

  /**
   * Переключает лайк поста пользователя.
   *
   * @param postId Идентификатор поста
   * @param userId Идентификатор пользователя
   *
   * @returns Сериализованный пост с актуальным флагом лайка
   */
  async togglePost(postId: string, userId: string) {
    const post = await this.postService.findPostById(postId);

    const author = await this.userRepository.findOne({
      where: { userId: post.userId },
    });

    if (!author) throw new NotFoundException('Author not found');

    const existingLike = await this.postLikeRepository.findOne({
      where: { postId, userId },
    });

    if (existingLike) {
      await this.postLikeRepository.remove(existingLike);
      await this.postRepository.decrement({ postId }, 'countLike', 1);
      post.countLike = Math.max((post.countLike ?? 1) - 1, 0);
      return this.postService.sanitizePost(post, author, false);
    }

    const createLike = this.postLikeRepository.create({
      userId: userId,
      postId: postId,
    });

    await this.postRepository.increment({ postId }, 'countLike', 1);
    await this.postLikeRepository.save(createLike);
    post.countLike = (post.countLike ?? 0) + 1;

    return this.postService.sanitizePost(post, author, true);
  }

  /**
   * Выводит посты, лайкнутые пользователем.
   *
   * @param userId Идентификатор пользователя
   *
   * @returns Коллекцию лайкнутых постов
   */
  async getFavoritePosts(userId: string) {
    const likes = await this.postLikeRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    const postIds = likes.map((like) => like.postId);

    if (postIds.length === 0) {
      return [];
    }

    const posts = await this.postRepository.find({
      where: { postId: In(postIds) },
    });

    return this.postService.sanitizePosts(posts, userId);
  }
}
