<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OtpRequested
{
    use Dispatchable, SerializesModels;

    public $code;
    public $email;

    /**
     * Создает событие для отправки OTP-кода.
     *
     * @param string $code OTP-код
     * @param string $email почта получателя
     */
    public function __construct($code, $email)
    {
        $this->code = $code;
        $this->email = $email;
    }
}
