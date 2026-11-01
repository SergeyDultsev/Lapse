import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@resources/user/entites/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Находит пользователя по идентификатору.
   *
   * @param userId Идентификатор пользователя
   *
   * @returns Сериализованного пользователя
   *
   * @throws HttpException 404 — пользователь не найден
   */
  async getUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: { userId },
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return this.sanitizeUser(user);
  }

  /**
   * Возвращает всех пользователей.
   *
   * @returns Коллекцию сериализованных пользователей
   */
  async getAll() {
    const users = await this.userRepository.find();
    return this.sanitizeUsers(users);
  }

  /**
   * Создает JSON-представление пользователя без чувствительных полей.
   *
   * @param user Пользователь
   *
   * @returns Публичный профиль с метой счетчиков
   */
  public sanitizeUser(user: UserEntity) {
    return {
      userId: user.userId,
      username: user.username,
      email: user.email,
      bio: user.bio,
      meta: {
        countFollowers: user.countFollowers,
        countSubscriptions: user.countSubscriptions,
        countPosts: user.countPosts,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  /**
   * Сериализует коллекцию пользователей.
   *
   * @param users Пользователи
   *
   * @returns Коллекцию публичных профилей
   */
  public sanitizeUsers(users: UserEntity[]) {
    return users.map((user) => this.sanitizeUser(user));
  }
}
