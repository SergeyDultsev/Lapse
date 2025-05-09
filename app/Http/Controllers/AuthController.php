<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthServices;
use App\Http\Requests\RegisterOrLoginRequest;
use App\Http\Resources\UserResource;

class AuthController extends Controller
{
    /**
     * @var AuthServices Сервис для работы с авторизацией.
     */
    protected $authService;

    /**
     * Создаёт экземпляр контроллера и внедряет сервис аутентификации.
     *
     * @param AuthServices $authService Экземпляр сервиса аутентификации.
     */
    public function __construct(AuthServices $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Логин или регистрация через OTP.
     *
     * @param OtpRequest $request Запрос с данными для авторизации.
     * @return object JSON-ответ с информацией о пользователе и токеном.
     */
    public function registerOrLoginWithOtp(RegisterOrLoginRequest $request): object
    {
        $data = $this->authService->registerOrLoginWithOtp($request->all());

        if ($data['status'] !== 200 || !isset($data['data'])) {
            return $this->jsonResponse([], $data['status'], $data['message']);
        }

        return $this->jsonResponse($data['data'], $data['status'], $data['message'])
            ->cookie(
                'auth_token',
                $data['data'] ?? '',
                60 * 24,
                '/',
                null,
                false,
                false
            );
    }

    /**
     * Завершает сессию пользователя (выход из системы).
     *
     * @param Request $request Запрос с текущим пользователем.
     * @return object JSON-ответ о выходе пользователя.
     */
    public function logout(Request $request): object
    {
        $request->user()->tokens()->delete();
        return $this->jsonResponse([], 200, 'User logout successfully.')
            ->cookie(
                'auth_token',
                '',
                -1,
                '/',
                null,
                false,
                false
            );
    }

    /**
     * Проверяет, авторизован ли пользователь.
     *
     * @return object JSON-ответ с флагом авторизации.
     */
    public function check(): object
    {
        if (!auth()->check()) {
            return $this->jsonResponse(['authorized' => false], 200, 'User not authorized');
        }

        $user = auth()->user();

        return $this->jsonResponse(new UserResource($user), 200, 'User authorized.');
    }
}
