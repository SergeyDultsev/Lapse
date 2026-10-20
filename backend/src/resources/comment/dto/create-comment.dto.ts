import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsOptional()
  @IsUUID()
  parentCommentId?: string;

  @IsString()
  @IsNotEmpty()
  textContent: string;
}
