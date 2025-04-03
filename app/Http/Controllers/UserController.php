<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateRequest;
use Illuminate\Http\Request;
use App\Services\UserServices;
use Illuminate\Http\Resources\Json\JsonResource;

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
     */
    public function index(Request $request): object 
    {
        if($request->routeIs('subscription')){
            // TODO: Написать логику
        } elseif ($request->routeIs('subscribers')) {
            // TODO: Написать логику
        }

        return $this->jsonResponse([], 200, "messages");
    }

    /**
     * Изменение данных пользователя.
     *
     */
    public function update(UserUpdateRequest $request): object 
    {
        $data = $this->userServices->updateUser($request->all());
        return $this->jsonResponse($data['data'], $data['status'], $data['message']);
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
