<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'comment_id' => $this->comment_id, 
            'post_id' => $this->post_id,
            'user' => [
                'user_id' => $this->user->user_id,
                'full_name' => $this->user->full_name,
                'avatar_url' => $this->user->avatar_url,
            ],
            'content' => $this->content,
            'kids' => CommentResource::collection($this->kids),
        ];
    }
}
