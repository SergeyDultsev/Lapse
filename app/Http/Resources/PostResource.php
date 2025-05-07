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
            'user' => [
                'user_id' => $this->user->user_id,
                'full_name' => $this->user->full_name,
                'avatar_url' => $this->user->avatar_url,
            ],
            'tier' => [
                'tier_id' => $this->tier->tier_id ?? null,
                'title' => $this->tier->title ?? null,
                'description' => $this->tier->description ?? null,
                'preview_url' => $this->tier->preview_url ?? null,
                'price' => $this->tier->price ?? null,
            ],
            'title'=> $this->title,
            'content'=> $this->content,
            'preview_url'=> $this->preview_url,
            'save_count' => $this->save_count,
            'is_favorite' => $this->is_favorite,
            'comment_count'=> $this->comment_count,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
