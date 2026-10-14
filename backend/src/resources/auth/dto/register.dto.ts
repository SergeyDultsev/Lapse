import { IsEmail, IsString, Length } from 'class-validator';
import { Match } from '@/common/decorators/match.decorator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8)
  password: string;

  @IsString()
  @Length(8)
  @Match('password', {
    message: 'The password and repeat password must match.',
  })
  repeatPassword: string;
}
