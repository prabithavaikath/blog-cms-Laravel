<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::orderBy('name')->get();
    }

    public function store(Request $r)
    {
        $data = $r->validate(['name'=>'required','slug'=>'required|unique:categories']);
        return Category::create($data);
    }

    public function update(Request $r, Category $category)
    {
        $data = $r->validate([
            'name'=>'required',
            'slug'=>'required|unique:categories,slug,'.$category->id
        ]);
        $category->update($data);
        return $category;
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->noContent();
    }
}
