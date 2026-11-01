import { IsUUID } from 'class-validator';

export class TogglePostLikeDto {
  @IsUUID()
  postId: string;
}
