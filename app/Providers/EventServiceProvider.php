<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Events\OtpRequested;
use App\Listeners\SendOtpSms;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Карта событий и слушателей
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        OtpRequested::class => [
            SendOtpSms::class,
        ],
    ];
}
