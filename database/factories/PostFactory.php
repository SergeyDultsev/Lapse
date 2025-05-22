<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'post_id' => $this->faker->uuid(),
            'title' => $this->faker->sentence(),
            'content' => $this->faker->paragraph(),
            'preview_url' => $this->faker->url(),
            'save_count' => 0,
            'comment_count' => 0,
        ];
    }
}
