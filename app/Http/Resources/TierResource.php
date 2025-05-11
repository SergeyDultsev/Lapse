<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TierResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'tier_id' => $this->tier_id,
            'user_id' => $this->user_id,
            'title' => $this->title,
            'description' => $this->description,
            'preview_url' => $this->preview_url,
            'price' => $this->price,
        ];
    }
}
