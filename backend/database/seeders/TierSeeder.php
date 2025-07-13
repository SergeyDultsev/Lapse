<?php

namespace Database\Seeders;

use App\Models\Tier;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::all()->each(function ($user) {
            Tier::factory(10)->create([
                'user_id' => $user->user_id,
            ]);
        });
    }
}
