<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $primaryKey = 'user_id';
    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'user_id',
        'role_id',
        'name',
        'surname',
        'phone',
        'password',
        'about',
        'avatar_url',
        'subscriptions_count',
        'subscriber_count',
        'is_deleted'
    ];

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

    public function getFullNameAttribute(): string
    {
        return "$this->name $this->surname";
    }
}
