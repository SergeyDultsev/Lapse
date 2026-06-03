import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@resources/user/entites/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '@resources/auth/strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return {
        data: {},
        message: 'Invalid email or password',
        statusCode: 401,
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        data: {},
        message: 'Invalid email or password',
        statusCode: 401,
      };
    }

    const payload: JwtPayload = { id: user.id, email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        countFollowers: user.countFollowers,
        countSubscriptions: user.countSubscriptions,
      },
      message: 'Successfully logged in',
      statusCode: 200,
    };
  }

  async register(
    username: string,
    email: string,
    password: string,
    repeatPassword: string,
  ) {
    if (password !== repeatPassword) {
      return {
        data: [],
        statusCode: 404,
        message: `The password and repeat password must match.`,
      };
    }

    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      return {
        data: [],
        statusCode: 409,
        message: `User with this already exists.`,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const credentials = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(credentials);

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return {
        data: {},
        message: 'User not found',
        statusCode: 401,
      };
    }

    const payload: JwtPayload = { id: user.id, email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        countFollowers: user.countFollowers,
        countSubscriptions: user.countSubscriptions,
      },
      message: 'Successfully registered',
      statusCode: 201,
    };
  }
}
