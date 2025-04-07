<?php

namespace App\Http\Controllers;

use App\Http\Requests\OtpRequest;
use App\Supports\OtpSend;

class OtpController extends Controller
{
    // Класс для отправки OTP
    protected $otpSend;

    /**
     * Создаёт экземпляр сервиса и внедряет генератор OTP-кода.
     *
     * @param OtpSend $otpSend Экземпляр отправки OTP-кода.
     */
    public function __construct(OtpSend $otpSend) {
        $this->otpSend = $otpSend;
    }

    public function OtpRequest(OtpRequest $response): array
    {
        $email = $response->email;
        return $this->otpSend->send($email);
    }
}
