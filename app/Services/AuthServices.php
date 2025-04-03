<?php

namespace App\Services;

use App\Supports\OtpSend;
use App\Models\User;
use App\Models\Role;
use App\Models\OtpCode;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class AuthServices
{
    protected $otpSend;

    /**
     * Создаёт экземпляр сервиса и внедряет генератор OTP-кода.
     *
     * @param OtpSend $otpSend Экземпляр отправки OTP-кода.
     */
    public function __construct(OtpSend $otpSend) {
        $this->otpSend = $otpSend;
    }

    /**
     * Инициализация процесса входа — отправка OTP-кода.
     *
     * @param array $data Электронная почта пользователя.
     * @return array Ответ с кодом состояния и сообщением.
     */
    public function initiateLogin(array $data): array 
    {
        $email = $data['email'];
        return $this->otpSend->send($email);
    }

    /**
     * Регистрация или авторизация пользователя с OTP-кодом.
     *
     * @param array $data Данные пользователя (Электронная почта, код, пароль, имя и фамилия.).
     * @return array Ответ с токеном и данными пользователя.
     */
    public function registerOrLoginWithOtp(array $data): array
    {
        $email = $data['email'];
        $code = $data['otp_code'];
        $password = $data['password'];
        $name = $data['name'];
        $surname = $data['surname'];

        $userRole = Role::where('name', 'user')->first();

        if (!$userRole) {
            return [
                'status' => 500, 
                'message' => 'Role "user" not found.'
            ];
        }

        $otp = OtpCode::where('email', $email)
                    ->where('code', $code)
                    ->where('expires_at', '>', now())
                    ->first();

        if (!$otp) {
            return [
                'status' => 422, 
                'message' => 'Invalid code or code is outdated.'
            ];
        }

        $otp->delete();

        $user = User::firstOrNew(['email' => $email]);

        if (!$user->exists) {
            $user->user_id = Uuid::uuid4()->toString();
            $user->role_id = $userRole->role_id;
            $user->name = $name;
            $user->surname = $surname;
            $user->password = Hash::make($password);
            $user->save();
        } else {
            if (!Hash::check($password, $user->password)) {
                return [
                    'status' => 403, 
                    'message' => 'Invalid password.'
                ];
            }
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        return [
            'status' => 200,
            'message' => 'User logged in successfully.',
            'token' => $token,
            'data' => [
                'user_id' => $user->user_id,
                'full_name' => $user->full_name,
                'email' => $user->email,
                'about' => $user->about,
                'avatar_url' => $user->avatar_url,
                'subscriptions_count' => $user->subscriptions_count,
                'subscriber_count' => $user->subscriber_count,
            ]
        ];
    }
}