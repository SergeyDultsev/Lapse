<?php

namespace App\Mail\User;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public $code;

    /**
     * Создает новый экземпляр письма с OTP-кодом.
     *
     * @param string $code OTP-код для отправки пользователю.
     */
    public function __construct($code)
    {
        $this->code = $code;
    }

    public function build()
    {
        return $this->subject('Ваш OTP-код')
                    ->view('emails.otp')
                    ->with(['otp' => $this->code]);
    }
}
