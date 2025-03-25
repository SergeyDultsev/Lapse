<?php

namespace Database\Seeders;

use App\Models\Role;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
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
