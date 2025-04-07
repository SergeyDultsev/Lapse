<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'post_id' => $this->post_id,
            'user_id' => $this->user_id,
            'tier_id' => $this->tier_id,
            'title'=> $this->title,
            'content'=> $this->content,
            'preview_url'=> $this->preview_url,
            'save_count' => $this->save_count,
            'comment_count'=> $this->comment_count,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
