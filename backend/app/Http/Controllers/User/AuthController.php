<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\OtpRequest;
use App\Http\Requests\RegisterOrLoginRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthServices;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthServices $authService)
    {
        $this->authService = $authService;
    }

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

    public function check(): object
    {
        if (!auth()->check()) {
            return $this->jsonResponse(['authorized' => false], 200, 'User not authorized');
        }

        $user = auth()->user();

        return $this->jsonResponse(new UserResource($user), 200, 'User authorized.');
    }
}
