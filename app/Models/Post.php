<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id', 
        'user_id',
        'tier_id',
        'content',
        'preview_url',
        'save_count',
        'comment_count'
    ];
}