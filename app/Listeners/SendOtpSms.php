<?php

namespace App\Listeners;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Events\OtpRequested;
use App\Mail\User\OtpMail;

class SendOtpSms
{
    /**
     * Обрабатывает событие запроса OTP-кода и отправляет его на email.
     * 
     * @param OtpRequested $event Событие, содержащее OTP-код и email пользователя.
     */
    public function handle(OtpRequested $event): void
    {
        Mail::to($event->email)->send(new OtpMail($event->code));
    }
}
