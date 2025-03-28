<?php

namespace App\Clients;

USE Illuminate\Support\Facades\Http;

class SmsClient{
    public function sendOtp($code, $phone){
        /** 
         * Запрос к API SMS.ru
        */
        $response = Http::Post('https://sms.ru/sms/send', [
            'api_id' => env('SMSRU_API_KEY'),
            'to' => $phone,
            'msg' => "Ваш код: $code",
            'json' => 1
        ]);

        return $response->json();
    }
}