<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tier>
 */
class TierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tier_id' => $this->faker->uuid(),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'preview_url' => $this->faker->url(),
            'price' => $this->faker->randomElement(range(100, 1000, 10)),
        ];
    }
}
