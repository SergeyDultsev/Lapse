<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Services\UserServices;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userServices;

    public function __construct(UserServices $userServices)
    {
        $this->userServices = $userServices;
    }

    public function index(Request $request, string $user_id): object
    {
        if ($request->routeIs('subscriptions')) {
            $data = $this->userServices->getSubscriptions($user_id);
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

        return $this->jsonResponse([], 500, 'Internal Server Error');
    }

    public function show(string $user_id): object
    {
        $data = $this->userServices->showUser($user_id);
        return $this->jsonResponse(
            new UserResource((object) $data['data']),
            $data['status'],
            $data['message']
        );
    }

    public function update(UserUpdateRequest $request): object
    {
        $data = $this->userServices->updateUser($request->all());
        return $this->jsonResponse(
            new UserResource((object) $data['data']),
            $data['status'],
            $data['message']
        );
    }

    public function destroy(Request $request): object
    {
        $data = $this->userServices->deleteUser();

        if ($data['status'] === 200) {
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
