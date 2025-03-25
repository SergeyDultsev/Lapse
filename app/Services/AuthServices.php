<?php

namespace App\Services;

use App\Supports\OtpGenerator;
use App\Models\User;
use App\Models\Role;
use App\Models\OtpCode;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class AuthServices
{
    /**
     * @var OtpGenerator Генератор OTP-кода.
     */
    protected $otpGenerator;

    /**
     * Создаёт экземпляр сервиса и внедряет генератор OTP-кода.
     *
     * @param OtpGenerator $otpGenerator Экземпляр генератора OTP-кода.
     */
    public function __construct(OtpGenerator $otpGenerator) {
        $this->otpGenerator = $otpGenerator;
    }

    /**
     * Выполняет аутентификацию пользователя.
     *
     * Если пользователь уже существует и пароль совпадает, отправляется OTP-код.
     *
     * @param array $data Данные пользователя (телефон, пароль).
     * @return array Ответ с кодом состояния и сообщением.
     */
    public function authorize(array $data): array 
    {
        $phone = $data['phone'];
        $password = $data['password'];
        
        $user = User::where('phone', $phone)->first();

        if (!$user) {
            return [
                'status' => 404, 
                'message' => 'Not Fount.'
            ];
        }

        if (!Hash::check($password, $user->password)) {
            return [
                'status' => 403, 
                'message' => 'Invalid password.'
            ];
        }

        $this->otpGenerator->generator($phone);
        return [
            'status' => 200, 
            'message' => 'OTP-code sent.'
        ];
    }

    /**
     * Выполняет регистрацию пользователя.
     *
     * Если пользователя нет, создаётся новый аккаунт с указанной ролью.
     *
     * @param array $data Данные пользователя (телефон, пароль, имя, фамилия).
     * @return array Ответ с кодом состояния и сообщением.
     */
    public function createUser(array $data): array 
    {
        $phone = $data['phone'];
        $password = $data['password'];
        $name = $data['name'];
        $surname = $data['surname'];

        $userRole = Role::where('name', 'user')->first();

        if(!$userRole) {
            return [
                'status' => 500, 
                'message' => 'Role "user" not found.'
            ];
        }

        $user = new User;
        $user->user_id = Uuid::uuid4()->toString();
        $user->role_id = $userRole->role_id;
        $user->name = $name;
        $user->surname = $surname;
        $user->phone = $phone;
        $user->password = Hash::make($password);
        $user->save();

        $this->otpGenerator->generator($phone);
        return [
            'status' => 201, 
            'message' => 'OTP-code sent.'
        ];
    }

    /**
     * Проверяет введённый пользователем OTP-код.
     *
     * Если код совпадает и не истёк, пользователь получает токен авторизации.
     *
     * @param array $data Данные с телефона и OTP-кода.
     * @return array Ответ с токеном и данными пользователя, либо ошибкой.
     */
    public function verifyCode(array $data): array
    {
        $phone = $data['phone'];
        $code = $data['code'];

        $otp = OtpCode::where('phone', $phone)
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

        $user = User::where('phone', $phone)->first();
        $token = $user->createToken('auth_token')->plainTextToken;
        return [
            'token' => $token,
            'user_id' => $user->user_id,
            'full_name' => $user->name,
            'email' => $user->email,
            'status' => 200,
            'message' => 'User logged in successfully.'
        ];
    } 
}