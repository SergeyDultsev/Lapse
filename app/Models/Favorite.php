<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $primaryKey = 'favorite_id';
    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'favorite_id',
        'post_id',
        'user_id',
    ];

    public static function isFavorite(string $post_id, string $user_id): bool
    {
        return Favorite::where('post_id', $post_id)
            ->where('user_id', $user_id)
            ->exists();
    }
}
