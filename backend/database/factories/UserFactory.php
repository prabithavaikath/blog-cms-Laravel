<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        $firstName = fake()->firstName();
        $lastName = fake()->lastName();

        return [
            'uuid' => Str::uuid(),
            'first_name' => $firstName,
            'last_name' => $lastName,
            'username' => Str::slug($firstName . $lastName . fake()->unique()->numberBetween(1, 1000)),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'avatar_url' => fake()->imageUrl(100, 100, 'people'),
            'is_active' => true,
            'timezone' => 'UTC',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}