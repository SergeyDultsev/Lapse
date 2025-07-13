<?php

namespace Database\Seeders;

use App\Models\Role;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::create([
            'role_id' => Uuid::uuid4()->toString(),
            'name' => 'admin',
        ]);

        Role::create([
            'role_id' => Uuid::uuid4()->toString(),
            'name' => 'user',
        ]);
    }
}
