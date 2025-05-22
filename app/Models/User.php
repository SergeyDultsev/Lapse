<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\HasMedia;

class User extends Authenticatable implements HasMedia
{
    use HasFactory, Notifiable, HasApiTokens, InteractsWithMedia, SoftDeletes;

    protected $primaryKey = 'user_id';
    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'user_id',
        'role_id',
        'name',
        'surname',
        'email',
        'password',
        'about',
        'avatar_url',
        'subscriptions_count',
        'subscriber_count',
        'is_deleted'
    ];

    protected $dates = ['deleted_at'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function posts()
    {
        return $this->hasMany(Post::class, 'user_id', 'user_id');
    }

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class, 'subscriber_id', 'user_id');
    }

    public function subscribers()
    {
        return $this->hasMany(Subscription::class, 'target_id', 'user_id');
    }

    public function getFullNameAttribute(): string
    {
        return "$this->name $this->surname";
    }

    public function isFollow(string $user_id): bool | string
    {
        if(auth()->id() === $user_id) return 'you';
        return Subscription::where('subscriber_id', auth()->id())
            ->where('target_id', $user_id)
            ->exists();
    }

    public function recommendations(): object
    {
        return User::where('user_id', '!=', Auth::id())
        ->whereDoesntHave('subscribers', function ($query) {
            $query->where('subscriber_id', Auth::id());
        })->get();
    }

    public function getAvatarUrlAttribute(): string|null
    {
        $avatar = $this->getFirstMedia('users');
        if(!$avatar) return null;
        return $avatar->getUrl();
    }
}
