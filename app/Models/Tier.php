<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tier extends Model
{
    use HasFactory;

    protected $primaryKey = 'tier_id';
    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'tier_id', 
        'title',
        'description',
        'price'
    ];
}