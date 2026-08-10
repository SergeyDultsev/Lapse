import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@resources/user/entites/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '@resources/auth/strategies/jwt.strategy';
import { RegisterDto } from '@resources/auth/dto/register.dto';
import { LoginDto } from '@resources/auth/dto/login.dto';
import { UserService } from '@resources/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private userService: UserService,
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

    const tokens = await this.generateTokens(user);

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
        'User with this already exists.',
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const credentials = this.userRepository.create({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    });

    const user = await this.userRepository.save(credentials);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const tokens = await this.generateTokens(user);

    user.refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);
    await this.userRepository.save(user);

    return {
      ...tokens,
      user: this.userService.sanitizeUser(user),
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

    const tokens = await this.generateTokens(user);

    user.refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);

    await this.userRepository.save(user);

    return tokens;
  }

  private async generateTokens(user: UserEntity) {
    const payload: JwtPayload = {
      userId: user.userId,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN!,
    } as any);

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN!,
    } as any);

    return {
      accessToken,
      refreshToken,
    };
  }
}
