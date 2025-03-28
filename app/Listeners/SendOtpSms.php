<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use App\Events\OtpRequested;
use App\Clients\SmsClient;


class SendOtpSms implements ShouldQueue
{
    /**
     * @var SmsClient Класс запроса к API SMS.ru.
     */
    protected $smsClient;

    /**
     * Создаем экземпляр класса и внедряем класс SmsClient.
     * 
     * @param SmsClient $smsClient Экземпляр класса запроса к API SMS.ru.
     */
    public function __construct(SmsClient $smsClient)
    {
        $this->smsClient = $smsClient;
    }

    public function handle(OtpRequested $event): void
    {
        $this->smsClient->sendOtp($event->code, $event->phone);
    }
}
