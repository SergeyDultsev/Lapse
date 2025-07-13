<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\OtpRequest;
use App\Supports\OtpSend;

class OtpController extends Controller
{
    protected $otpSend;

    public function __construct(OtpSend $otpSend) {
        $this->otpSend = $otpSend;
    }

    public function OtpRequest(OtpRequest $response): array
    {
        $email = $response->email;
        return $this->otpSend->send($email);
    }
}
