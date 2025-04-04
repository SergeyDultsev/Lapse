<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateRequest;
use Illuminate\Http\Request;
use App\Services\UserServices;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * @var UserServices Сервис для работы с посльзователем.
     */
    protected $userServices;

    /**
     * Создаёт экземпляр контроллера и внедряет сервис пользователей.
     *
     * @param UserServices $userServices Экземпляр сервиса пользователей.
     */
    public function __construct(UserServices $userServices) {
        $this->userServices = $userServices;
    }

    /**
     * Вывод пользователей.
     *
     * @param string $user_id идентификатор пользователя.
     */
    public function index(Request $request, string $user_id): object 
    {
        if($request->routeIs('subscriptions')){
            $data = $this->userServices->getSubscription($user_id);
            return $this->jsonResponse([UserResource::collection((object) $data['data'])], $data['status'], $data['message']);
        } elseif ($request->routeIs('subscribers')) {
            $data = $this->userServices->getSubscribers($user_id);
            return $this->jsonResponse([UserResource::collection((object) $data['data'])], $data['status'], $data['message']);
        }

        return $this->jsonResponse([], 500, 'Internal Server Error');
    }

    /**
     * Вывод пользователя.
     *
     * @param string $user_id идентификатор пользователя.
     */
    public function show(string $user_id): object 
    {
        $data = $this->userServices->showUser($user_id);
        return $this->jsonResponse([new UserResource((object) $data['data'])], $data['status'], $data['message']);
    }

    /**
     * Изменение данных пользователя.
     *
     * @param UserUpdateRequest валидатор данных.
     */
    public function update(UserUpdateRequest $request): object 
    {
        $data = $this->userServices->updateUser($request->all());
        return $this->jsonResponse(new UserResource((object) $data['data']), $data['status'], $data['message']);
    }

    /**
     * Удаление пользователя.
     *
     */
    public function destroy(): object 
    {
        // TODO: Написать логику
        return $this->jsonResponse([], 200, "messages");
    }
}
