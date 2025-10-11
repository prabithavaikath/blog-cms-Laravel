<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   use App\Models\User;
use App\Models\Post;
use Illuminate\Support\Facades\Hash;

public function run(): void
{
    $admin = User::updateOrCreate(
        ['email' => 'admin@example.com'],
        ['name' => 'Admin', 'password' => Hash::make('password'), 'role' => 'admin']
    );

    // Minimal sample post
    Post::updateOrCreate(
        ['slug' => 'hello-world'],
        [
          'user_id' => $admin->id,
          'title' => 'Hello World',
          'excerpt' => 'First post',
          'content' => '<p>Welcome!</p>',
          'status' => 'published',
          'published_at' => now(),
        ]
    );
}

}
