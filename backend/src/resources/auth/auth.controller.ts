import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from '@resources/auth/auth.service';
import { LoginDto } from '@resources/auth/dto/login.dto';
import { RegisterDto } from '@resources/auth/dto/register.dto';
import { JwtGuard } from '@resources/auth/guards/jwt.guard';
import { JwtPayload } from '@resources/auth/strategies/jwt.strategy';
import { JwtRefreshGuard } from '@resources/auth/guards/jwt-refresh.guard';
import { cookieConfig } from '@/config/cookie.config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private setAuthCookies(
    res: Response,
    tokens: { accessToken: string; refreshToken: string },
  ) {
    res.cookie('accessToken', tokens.accessToken, cookieConfig.access);
    res.cookie('refreshToken', tokens.refreshToken, cookieConfig.refresh);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.login(dto);

    this.setAuthCookies(res, { accessToken, refreshToken });

    return {
      data: user,
      message: 'Successfully logged in',
      statusCode: HttpStatus.OK,
    };
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.register(dto);

    this.setAuthCookies(res, { accessToken, refreshToken });

    return {
      data: user,
      message: 'Successfully registered',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Post('/logout')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: Request & { user: JwtPayload },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(req.user.userId);

    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/' });

    return {
      data: {},
      message: 'Logged out',
      statusCode: HttpStatus.OK,
    };
  }

  @Get('/me')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async me(@Req() req: Request & { user: JwtPayload }) {
    const user = await this.authService.getMe(req.user.userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      data: user,
      message: 'User authenticated',
      statusCode: HttpStatus.OK,
    };
  }

  @Post('/refresh')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req()
    req: Request & { user: JwtPayload; cookies: { refreshToken: string } },
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies.refreshToken;

    const tokens = await this.authService.refresh(
      req.user.userId,
      refreshToken,
    );

    this.setAuthCookies(res, tokens);

    return {
      data: {},
      message: 'User authenticated',
      statusCode: HttpStatus.OK,
    };
  }
}
