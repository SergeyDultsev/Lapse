<?php

namespace App\Supports;

use App\Events\OtpRequested;
use App\Models\OtpCode;
use Ramsey\Uuid\Uuid;

class OtpGenerator 
{
    /**
     * Генерирует, сохраняет и передает в событие OTP-код.
     *
     * @param string $email почта.
     */
    public function generator(string $email): void
    {
        $code = rand(1000, 9999);
        OtpCode::updateOrCreate(
            ['email' => $email],
            [
                'otp_code_id' => Uuid::uuid4()->toString(), 
                'code' => $code, 
                'expires_at' => now()->addMinutes(5)
            ],
        );

        event(new OtpRequested($code, $email));
    }
}