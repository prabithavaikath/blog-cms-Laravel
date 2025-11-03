<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function tokenLogin(Request $r)
    {
        $r->validate(['email'=>'required|email','password'=>'required']);
        if (!auth()->attempt($r->only('email','password'))) {
            return response()->json(['message'=>'Invalid'], 422);
        }
        $token = $r->user()->createToken('api')->plainTextToken;
        return ['token' => $token];
    }

    public function me(Request $r)
    {
        return $r->user();
    }

    public function tokenLogout(Request $r)
    {
        $r->user()->currentAccessToken()->delete();
        return ['ok' => true];
    }
}
