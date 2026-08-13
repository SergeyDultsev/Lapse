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

  async getUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: { userId },
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return this.sanitizeUser(user);
  }

  async getAll() {
    const users = await this.userRepository.find();
    return this.sanitizeUsers(users);
  }

  public sanitizeUser(user: UserEntity) {
    return {
      id: user.userId,
      username: user.username,
      email: user.email,
      bio: user.bio,
      meta: {
        countFollowers: user.countFollowers,
        countSubscriptions: user.countSubscriptions,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  public sanitizeUsers(users: UserEntity[]) {
    return users.map((user) => this.sanitizeUser(user));
  }
}
