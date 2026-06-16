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

  async getUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return this.sanitizeUser(user);
  }

  async getAll() {
    return await this.userRepository.find();
  }

  public sanitizeUser(user: UserEntity) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      countFollowers: user.countFollowers,
      countSubscriptions: user.countSubscriptions,
    };
  }

  public sanitizeUsers(users: UserEntity[]) {
    return users.map((user) => this.sanitizeUser(user));
  }
}
