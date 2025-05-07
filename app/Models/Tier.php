<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Tier extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $primaryKey = 'tier_id';
    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'tier_id',
        'user_id',
        'title',
        'preview_url',
        'description',
        'price'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function getPreviewUrlAttribute(): string|null
    {
        $preview_url = $this->getFirstMedia('tiers');
        if(!$preview_url) return null;
        return $preview_url->getUrl();
    }
}
