import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
   * Находит пост по идентификатору без побочных эффектов.
   *
   * @param postId Идентификатор поста
   *
   * @returns Пост из базы данных
   */
  public async findPostById(postId: string) {
    const post = await this.postRepository.findOne({
      where: { postId },
    });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return post;
  }

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
      user: { userId } as UserEntity,
      title: dto.title,
      textContent: dto.textContent,
    });

    const savedPost = await this.postRepository.save(post);

    const user = await this.userRepository.findOne({
      where: { userId: savedPost.userId },
    });

    await this.userRepository.increment({ userId }, 'countPosts', 1);

    if (!user) return;

    return this.sanitizePost(savedPost, user);
  }

  /**
   * Получает пост пользователя и засчитывает просмотр.
   *
   * @param postId Идентификатор поста
   *
   * @returns Пост из базы данных
   */
  async getPost(postId: string) {
    const post = await this.findPostById(postId);

    const user = await this.userRepository.findOne({
      where: { userId: post.userId },
    });

    await this.postRepository.increment({ postId }, 'countView', 1);

    if (!user) return null;

    return this.sanitizePost(post, user);
  }

  /**
   * Удаляет пост пользователя
   *
   * @param postId Идентификатор поста
   * @param userId Идентификатор пользователя
   *
   * @returns Удаленный пост
   */
  async deletePost(postId: string, userId: string) {
    const post = await this.findPostById(postId);

    if (post.userId !== userId) {
      throw new HttpException('Post cannot be deleted', HttpStatus.FORBIDDEN);
    }

    await this.postRepository.delete(postId);

    const user = await this.userRepository.findOne({
      where: { userId: post.userId },
    });

    return user ? this.sanitizePost(post, user) : post;
  }

  /**
   * Выводит посты пользователя
   *
   * @param userId Идентификатор пользователь
   * @param page текущая страница
   * @param limit кол-во постов
   *
   * @returns Коллекцию постов пользователя
   */
  async getPosts(userId: string, page: number, limit: number) {
    const [posts, totalItems] = await this.postRepository.findAndCount({
      where: { user: { userId } },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      posts: await this.sanitizePosts(posts),
      meta: {
        totalItems,
        page,
        limit,
        lastPage: Math.ceil(totalItems / limit),
      },
    };
  }

  /**
   * Выводит все посты
   *
   * @returns Коллекцию постов пользователя
   */
  async getAll() {
    const posts = await this.postRepository.find({
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
      postId: post.postId,
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
