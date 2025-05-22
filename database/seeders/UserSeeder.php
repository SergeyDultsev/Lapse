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
            'role_id' => $adminRoleId,
            'name' => 'Сергей',
            'surname' => 'Дульцев',
            'email' => 'dultsev010904@gmail.com',
            'password' => Hash::make('Serejka1')
        ]);

        User::create([
            'user_id' => Uuid::uuid4()->toString(),
            'role_id' => $userRoleId,
            'name' => 'Какой-то мужик',
            'surname' => '1',
            'email' => 'man1@gmail.com',
            'password' => Hash::make('password1')
        ]);

        User::create([
            'user_id' => Uuid::uuid4()->toString(),
            'role_id' => $userRoleId,
            'name' => 'Какой-то мужик',
            'surname' => '2',
            'email' => 'man2@gmail.com',
            'password' => Hash::make('password2')
        ]);

        User::create([
            'user_id' => Uuid::uuid4()->toString(),
            'role_id' => $userRoleId,
            'name' => 'Какой-то мужик',
            'surname' => '3',
            'email' => 'man3@gmail.com',
            'password' => Hash::make('password3')
        ]);

        User::create([
            'user_id' => Uuid::uuid4()->toString(),
            'role_id' => $userRoleId,
            'name' => 'Какой-то мужик',
            'surname' => '4',
            'email' => 'man4@gmail.com',
            'password' => Hash::make('password4')
        ]);
    }
}
