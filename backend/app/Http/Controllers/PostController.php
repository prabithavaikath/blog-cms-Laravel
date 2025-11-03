<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Post::with('category','author')->latest()->paginate(10);
    }

    public function store(Request $r)
    {
        $data = $r->validate([
            'title'=>'required',
            'slug'=>'required|unique:posts',
            'excerpt'=>'nullable',
            'content'=>'nullable',
            'status'=>'required|in:Draft,Published',
            'featured'=>'boolean',
            'category_id'=>'nullable|exists:categories,id'
        ]);
        $data['user_id'] = $r->user()->id;
        return Post::create($data);
    }

    public function show(Post $post)
    {
        return $post->load('category','author');
    }

    public function update(Request $r, Post $post)
    {
        $data = $r->validate([
            'title'=>'sometimes',
            'slug'=>'sometimes|unique:posts,slug,'.$post->id,
            'excerpt'=>'nullable',
            'content'=>'nullable',
            'status'=>'in:Draft,Published',
            'featured'=>'boolean',
            'category_id'=>'nullable|exists:categories,id'
        ]);
        $post->update($data);
        return $post;
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return response()->noContent();
    }

    public function publicIndex()
    {
        return Post::where('status','Published')
            ->with('category','author')->latest()->paginate(10);
    }

    public function showBySlug($slug)
    {
        return Post::where('slug',$slug)
            ->where('status','Published')
            ->with('category','author')
            ->firstOrFail();
    }
}
