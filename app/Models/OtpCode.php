<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OtpCode extends Model
{
    use HasFactory;

    protected $primaryKey = 'otp_code_id';
    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'otp_code_id',
        'email', 
        'code',
        'expires_at'
    ];
}