import { Injectable } from '@nestjs/common';
import { PostEntity } from '@resources/post/entites/post.entity';
import { CreatePostDto } from '@resources/post/dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from '@resources/user/entites/user.entity';
import { UserService } from '@resources/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userService: UserService,
  ) {}

  /**
   * Создает пост.
   *
   * @param dto Данные нового пользователя
   * @param userId Идентификатор пользователь
   *
   * @returns Созданный пост из базы данных
   */
  async createPost(userId: string, dto: CreatePostDto) {
    const post = this.postRepository.create({
      userId: userId,
      title: dto.title,
      textContent: dto.textContent,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedPost = await this.postRepository.save(post);

    const user = await this.userRepository.findOne({
      where: { userId: savedPost.userId },
    });

    if (!user) return;

    return this.sanitizePost(savedPost, user);
  }

  /**
   * Получает пост пользователя
   *
   * @param postId Идентификатор поста
   *
   * @returns Удаленный код
   */
  async getPost(postId: string) {
    const post = await this.postRepository.findOne({
      where: { postId: postId },
    });

    if (!post) return null;

    const user = await this.userRepository.findOne({
      where: { userId: post.userId },
    });

    if (!user) return null;

    return this.sanitizePost(post, user);
  }

  /**
   * Удаляет пост пользователя
   *
   * @param postId Идентификатор поста
   *
   * @returns Удаленный код
   */
  async deletePost(postId: string) {
    const post = await this.getPost(postId);

    if (!post) return null;

    await this.postRepository.delete(postId);

    return post;
  }

  /**
   * Выводит посты пользователя
   *
   * @param userId Идентификатор пользователь
   *
   * @returns Коллекцию постов пользователя
   */
  async getPosts(userId: string) {
    const posts = await this.postRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    return this.sanitizePosts(posts);
  }

  /**
   * Создает JSON-коллекцию одного поста
   *
   * @param post Пост
   * @param user Пользователь
   *
   * @returns Коллекцию поста пользователя
   */
  public sanitizePost(post: PostEntity, user: UserEntity) {
    return {
      id: post.postId,
      userId: post.userId,
      title: post.title,
      textContent: post.textContent,
      meta: {
        countLike: post.countLike,
        countComment: post.countComment,
        countView: post.countView,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: this.userService.sanitizeUser(user),
      },
    };
  }

  /**
   * Создает JSON-коллекцию постов
   *
   * @param posts Посты
   *
   * @returns Коллекцию постов пользователя
   */
  public async sanitizePosts(posts: PostEntity[]) {
    if (!posts || posts.length === 0) {
      return [];
    }

    const userIds = [...new Set(posts.map((post) => post.userId))];
    const users = await this.userRepository.findBy({
      userId: In(userIds),
    });

    const userCollection = new Map(users.map((user) => [user.userId, user]));

    return posts
      .map((post) => {
        const user = userCollection.get(post.userId);
        return user ? this.sanitizePost(post, user) : null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }
}
