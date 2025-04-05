<?php

namespace App\Services;

use App\Models\User;
use App\Models\Role;
use App\Models\OtpCode;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class AuthServices
{
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

        $user = User::withTrashed()->where('email', $email)->first();

        if ($user) {
            if ($user->trashed()) {
                $user->restore();
            }
        
            if (!Hash::check($password, $user->password)) {
                return [
                    'status' => 403,
                    'message' => 'Invalid password.'
                ];
            }
        } else {
            $user = new User;
            $user->user_id = Uuid::uuid4()->toString();
            $user->role_id = $userRole->role_id;
            $user->name = $name;
            $user->surname = $surname;
            $user->email = $email;
            $user->password = Hash::make($password);
            $user->save();
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