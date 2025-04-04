<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserServices {
    public function showUser(string $user_id): array {
        $user = User::find($user_id);
        return [
            'data' => $user, 
            'status' => 200, 
            'message' => 'User show successfully'
        ];
    }

    public function updateUser(array $data): array
    {
        $name = $data['name'];
        $surname = $data['surname'];
        $about = $data['about'];

        $user = Auth::user();

        if(!$user){
            return [
                'data' => [], 
                'status' => 404, 
                'message' => 'User not fount'
            ];
        }

        $user->name = $name;
        $user->surname = $surname;
        $user->about = $about;
        $user->save();

        if(isset($data['avatar_url']) && $data['avatar_url']){
            $user->addMediaFromRequest('avatar_url')->toMediaCollection('users');
        }

        return [
            'data' => $user, 
            'status' => 200, 
            'message' => 'User updated successfully'
        ];
    }
}