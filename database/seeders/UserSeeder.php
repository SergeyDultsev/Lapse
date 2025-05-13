<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRoleId = Role::where('name', 'admin')->first()->role_id;
        $userRoleId = Role::where('name', 'user')->first()->role_id;

        User::create([
            'user_id' => Uuid::uuid4()->toString(),
            'role_id' => $userRoleId,
            'name' => 'Иван',
            'surname' => 'Иванов',
            'email' => 'ivan1234@gmail.com',
            'password' => Hash::make('ivan1234')
        ]);

        User::create([
            'user_id' => Uuid::uuid4()->toString(),
            'role_id' => $userRoleId,
            'name' => 'Сергей',
            'surname' => 'Сергеев',
            'email' => 'sergey1234@gmail.com',
            'password' => Hash::make('sergey1234')
        ]);

        User::create([
            'user_id' => Uuid::uuid4()->toString(),
            'role_id' => $userRoleId,
            'name' => 'Петр',
            'surname' => 'Петров',
            'email' => 'peter1234@gmail.com',
            'password' => Hash::make('peter1234')
        ]);
    }
}
