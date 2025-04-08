<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Post extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $primaryKey = 'post_id';
    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'post_id', 
        'user_id',
        'tier_id',
        'title',
        'content',
        'preview_url',
        'save_count',
        'comment_count'
    ];

    public function comments() 
    {
        return $this->hasMany(Comment::class, 'post_id', 'post_id');
    }

    public function getPreviewUrlAttribute(): string|null
    {
        $preview_url = $this->getFirstMedia('posts');
        if(!$preview_url) return null;
        return $preview_url->getUrl();
    }
}