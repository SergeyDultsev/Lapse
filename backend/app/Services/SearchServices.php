<?php

namespace App\Services;

use App\Models\User;

class SearchServices{
    public function search(array $data): array
    {
        $query = trim($data['query']);

        if (strlen($query) === 0) {
            return [
                'data' => [],
                'status' =>  400,
                'message' =>'Search query is empty'
            ];
        }

        $userData = User::where(function ($q) use ($query) {
            $q->where('name', 'like', "%{$query}%")
                ->orWhere('surname', 'like', "%{$query}%");
        })->get();

        if(empty($userData)){
            return [
                'data' => [],
                'status' => 200,
                'message' => 'Empty user data'
            ];
        }

        return [
            'data' => $userData,
            'status' => 200,
            'message' => 'Success'
        ];
    }
}
