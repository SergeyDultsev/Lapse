<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OtpRequested
{
    use Dispatchable, SerializesModels;

    public string $phone;
    public string $code;

    /**
     * Создаёт экземпляр слушателя.
     *
     * @param string $code - OTP-кода.
     * @param string $phone - телефон получателя кода.
     */
    public function __construct(string $code, string $phone)
    {
        $this->phone = $phone;
        $this->code = $code;
    }
}
