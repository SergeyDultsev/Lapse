<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateRequest;
use Illuminate\Http\Request;
use App\Services\UserServices;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    // Сервис для работы с пользователями
    protected $userServices;

    /**
     * Конструктор контроллера пользователей.
     *
     * Внедряет зависимость UserServices.
     *
     * @param UserServices $userServices Экземпляр сервиса пользователей.
     */
    public function __construct(UserServices $userServices)
    {
        $this->userServices = $userServices;
    }

    /**
     * Получение подписок или подписчиков пользователя.
     *
     * Обрабатывает маршрут в зависимости от имени: 'subscriptions' или 'subscribers'.
     *
     * @param Request $request HTTP-запрос.
     * @param string $user_id Идентификатор пользователя.
     * @return object JSON-ответ с коллекцией пользователей или сообщение об ошибке.
     */
    public function index(Request $request, string $user_id): object 
    {
        if ($request->routeIs('subscriptions')) {
            $data = $this->userServices->getSubscription($user_id);
            return $this->jsonResponse(
                UserResource::collection(collect($data['data'])),
                $data['status'],
                $data['message']
            );
        } elseif ($request->routeIs('subscribers')) {
            $data = $this->userServices->getSubscribers($user_id);
            return $this->jsonResponse(
                UserResource::collection(collect($data['data'])),
                $data['status'],
                $data['message']
            );
        }

        // Если маршрут не соответствует ожиданиям
        return $this->jsonResponse([], 500, 'Internal Server Error');
    }

    /**
     * Получение информации о конкретном пользователе.
     *
     * @param string $user_id Идентификатор пользователя.
     * @return object JSON-ответ с данными пользователя.
     */
    public function show(string $user_id): object 
    {
        $data = $this->userServices->showUser($user_id);
        return $this->jsonResponse(
            new UserResource((object) $data['data']),
            $data['status'],
            $data['message']
        );
    }

    /**
     * Обновление данных пользователя.
     *
     * @param UserUpdateRequest $request Валидированный запрос с данными пользователя.
     * @return object JSON-ответ с обновлёнными данными пользователя.
     */
    public function update(UserUpdateRequest $request): object 
    {
        $data = $this->userServices->updateUser($request->all());
        return $this->jsonResponse(
            new UserResource((object) $data['data']),
            $data['status'],
            $data['message']
        );
    }

    /**
     * Удаление текущего пользователя и его токенов.
     *
     * При успешном удалении также удаляет cookie с auth_token.
     *
     * @param Request $request HTTP-запрос.
     * @return object JSON-ответ с результатом удаления.
     */
    public function destroy(Request $request): object 
    {
        $data = $this->userServices->deleteUser();

        if ($data['status'] === 200) {
            // Удаление всех токенов пользователя и сброс куки
            $request->user()->tokens()->delete();
            return $this->jsonResponse([], $data['status'], $data['message'])
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

        return $this->jsonResponse($data['data'], $data['status'], $data['message']);
    }
}