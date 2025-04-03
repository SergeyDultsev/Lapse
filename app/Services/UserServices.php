<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserServices {
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

        return [
            'data' => $user, 
            'status' => 200, 
            'message' => 'User updated successfully'
        ];
    }
}