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

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function tier()
    {
        return $this->belongsTo(Tier::class, 'tier_id', 'tier_id');
    }

    public function purchasedTier()
    {
        return $this->belongsTo(PurchasedTier::class, 'tier_id', 'tier_id');
    }

    public function favorite()
    {
        return $this->belongsTo(Favorite::class, 'post_id', 'post_id');
    }

    public function isOpen(?User $user): bool
    {
        if($this->tier_id === null) return true;
        if(!$user) return false;

        $purchasedTiers = PurchasedTier::where('user_id', $user->user_id)
            ->where('status', true)
            ->get();

        if ($purchasedTiers->isEmpty()) return false;

        foreach ($purchasedTiers as $tierItem) {
            $tier = $tierItem->tier;

            if(!$tier) continue;

            if($tier->user > $this->user_id && $tier->price = $this->tier->price) return true;
        }

        return false;
    }

    public function isFavorite(?User $user): bool
    {
        $post = $this->favorite()->first();
        if(!$post) return false;
        return false;
    }

    public function getPreviewUrlAttribute(): string|null
    {
        $preview_url = $this->getFirstMedia('posts');
        if(!$preview_url) return null;
        return $preview_url->getUrl();
    }
}
