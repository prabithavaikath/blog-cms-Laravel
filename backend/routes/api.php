<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Post;
use App\Http\Controllers\AuthController;



Route::post('/auth/login', [AuthController::class, 'tokenLogin']);
Route::post('/auth/register', [AuthController::class, 'register']); // optional

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'tokenLogout']);
});



// 1️⃣ Auth routes (Sanctum SPA)
// Route::post('/auth/login', function (Request $r) {
//     $r->validate(['email' => 'required|email', 'password' => 'required']);
//     if (!auth()->attempt($r->only('email', 'password'))) {
//         return response()->json(['message' => 'Invalid credentials'], 422);
//     }
//     $r->session()->regenerate();
//     return response()->json(['message' => 'logged-in']);
// });

// Route::post('/auth/logout', function (Request $r) {
//     auth()->guard('web')->logout();
//     $r->session()->invalidate();
//     $r->session()->regenerateToken();
//     return response()->json(['message' => 'logged-out']);
// });

//Route::get('/auth/me', fn() => auth()->user())->middleware('auth:sanctum');

// 2️⃣ Public post routes
Route::get('/posts', function (Request $r) {
    $q = Post::query()->where('status', 'published');
    if ($s = $r->query('q')) {
        $q->where('title', 'like', "%$s%");
    }
    return $q->latest('published_at')->paginate(10, ['id','title','slug','excerpt','published_at']);
});

Route::get('/posts/{slug}', fn($slug) =>
    Post::where('slug', $slug)->where('status', 'published')->firstOrFail()
);

// 3️⃣ Authenticated create/publish routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/posts', function (Request $r) {
        $data = $r->validate([
            'title' => 'required',
            'slug' => 'required|unique:posts,slug',
            'excerpt' => 'nullable',
            'content' => 'nullable',
        ]);
        $data['user_id'] = auth()->id();
        return \App\Models\Post::create($data);
    });

    Route::post('/posts/{post}/publish', function (\App\Models\Post $post) {
        abort_unless($post->user_id === auth()->id() || auth()->user()->role === 'admin', 403);
        $post->update(['status' => 'published', 'published_at' => now()]);
        return ['message' => 'published'];
    });
});
