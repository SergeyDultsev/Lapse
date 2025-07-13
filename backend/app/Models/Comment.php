<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $primaryKey = 'comment_id';
    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'comment_id', 
        'post_id',
        'user_id',
        'target_comment_id',
        'content'
    ];

    public function kids()
    {
        return $this->hasMany(Comment::class, 'target_comment_id', 'comment_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}