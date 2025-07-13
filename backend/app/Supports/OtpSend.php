<?php

namespace App\Supports;

class OtpSend 
{
    protected $otpGenerator;

    /**
     * Создаёт экземпляр сервиса и внедряет генератор OTP-кода.
     *
     * @param OtpGenerator $otpGenerator Экземпляр генератора OTP-кода.
     */
    public function __construct(OtpGenerator $otpGenerator) {
        $this->otpGenerator = $otpGenerator;
    }

    /**
     * Генерирует, сохраняет и передает в событие OTP-код.
     *
     * @param string $email почта.
     */
    public function send(string $email): array
    {
        $this->otpGenerator->generator($email);

        return [
            'data' => [],
            'status' => 200, 
            'message' => 'OTP-code sent.'
        ];
    }
}