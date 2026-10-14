import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '@resources/user/entites/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '@resources/auth/strategies/jwt.strategy';
import { RegisterDto } from '@resources/auth/dto/register.dto';
import { LoginDto } from '@resources/auth/dto/login.dto';
import { UserService } from '@resources/user/user.service';
import type { SignOptions } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const tokens = this.generateTokens(user);

    user.refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);
    await this.userRepository.save(user);

    return {
      ...tokens,
      user: this.userService.sanitizeUser(user),
    };
  }

  async register(dto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: [{ username: dto.username }, { email: dto.email }],
    });

    if (existingUser) {
      throw new HttpException(
        'User with this email or username already exists.',
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    const tokens = this.generateTokens(savedUser);

    savedUser.refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);
    await this.userRepository.save(savedUser);

    return {
      ...tokens,
      user: this.userService.sanitizeUser(savedUser),
    };
  }

  async getMe(userId: string) {
    const user = await this.userRepository.findOne({
      where: { userId: userId },
    });

    if (!user) return null;

    return this.userService.sanitizeUser(user);
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.userRepository.findOne({
      where: {
        userId: userId,
      },
    });

    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException();
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshTokenHash);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    const tokens = this.generateTokens(user);

    user.refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);

    await this.userRepository.save(user);

    return tokens;
  }

  /**
   * Инвалидирует refresh-токен пользователя (logout).
   *
   * @param userId Идентификатор пользователя
   */
  async logout(userId: string) {
    await this.userRepository.update({ userId }, { refreshTokenHash: null });
  }

  private generateTokens(user: UserEntity) {
    const payload: JwtPayload = {
      userId: user.userId,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
      expiresIn: this.configService.get<string>(
        'jwt.refreshExpiresIn',
      ) as SignOptions['expiresIn'],
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
