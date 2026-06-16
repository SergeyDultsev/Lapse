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
import { JwtAuthGuard } from '@resources/auth/guards/jwt-auth.guard';
import { JwtPayload } from '@resources/auth/strategies/jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user } = await this.authService.login(dto);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 20 * 60 * 1000,
      path: '/',
    });

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
    if (dto.password !== dto.repeatPassword) {
      return {
        data: [],
        statusCode: HttpStatus.BAD_REQUEST,
        message: `The password and repeat password must match.`,
      };
    }

    const { accessToken, user } = await this.authService.register(dto);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 20 * 60 * 1000,
      path: '/',
    });

    return {
      data: user,
      message: 'Successfully registered',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    return {
      data: {},
      message: 'Logged out',
      statusCode: HttpStatus.OK,
    };
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async me(@Req() req: Request & { user: JwtPayload }) {
    const user = await this.authService.getMe(req.user.id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      data: user,
      message: 'User authenticated',
      statusCode: HttpStatus.OK,
    };
  }
}
