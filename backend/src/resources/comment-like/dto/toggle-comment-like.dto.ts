import { IsUUID } from 'class-validator';

export class ToggleCommentLikeDto {
  @IsUUID()
  commentId: string;
}
