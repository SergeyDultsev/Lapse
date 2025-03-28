<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthServices;
use App\Http\Requests\AuthRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\OtpRequest;
use App\Http\Resources\AuthResource;

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
     * Выполняет вход или регистрацию пользователя в системе.
     *
     * @param AuthRequests $request Запрос с данными пользователя.
     * @return object JSON-ответ с результатом авторизации.
     */
    public function login(AuthRequest $request): object
    {
        $data = $this->authService->authorize($request->all());

        if ($data['status'] === 500) {
            return $this->jsonResponse([], $data['status'], $data['message']);
        }

        return $this->jsonResponse([], $data['status'], $data['message']);
    }


    /**
     * Выполняет вход или регистрацию пользователя в системе.
     *
     * @param RegisterRequest $request Запрос с данными пользователя.
     * @return object JSON-ответ с результатом авторизации.
     */
    public function register(RegisterRequest $request): object
    {
        $data = $this->authService->createUser($request->all());

        if ($data['status'] === 500) {
            return $this->jsonResponse([], $data['status'], $data['message']);
        }

        return $this->jsonResponse([], $data['status'], $data['message']);
    }


    /**
     * Проверяет введённый пользователем OTP-код.
     *
     * @param OtpRequest $request Запрос с OTP-кодом.
     * @return object JSON-ответ с информацией о пользователе и токеном.
     */
    public function verifyOtpAuth(OtpRequest $request): object
    {
        $data = $this->authService->verifyCodeAuth($request->all());

        if ($data['status'] !== 200 || !isset($data['data'])) {
            return $this->jsonResponse([], $data['status'], $data['message']);
        }

        return $this->jsonResponse(new AuthResource((object) $data['data']), $data['status'], $data['message'])
            ->cookie(
                'auth_token',
                $data['token'] ?? '',
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

        return $this->jsonResponse(['authorized' => true], 200, 'User authorized.');
    }
}
