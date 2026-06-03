import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from '@resources/auth/auth.service';
import { LoginDto } from '@resources/auth/dto/login.dto';
import { RegisterDto } from '@resources/auth/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto.email, dto.password, res);
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.register(
      dto.username,
      dto.email,
      dto.password,
      dto.repeatPassword,
    );
  }

  // TODO: Доделать
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.loggout(res);
  }

  // TODO: Доделать
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  me() {
    return 'me';
  }
}
