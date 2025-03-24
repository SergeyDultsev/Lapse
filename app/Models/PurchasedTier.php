<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchasedTier extends Model
{
    use HasFactory;

    protected $fillable = [
        'purchased_tier_id', 
        'tier_id',
        'user_id',
    ];
}