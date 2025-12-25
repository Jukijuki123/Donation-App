<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
        {
            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    'message' => 'Invalid login credentials'
                ], 401);
            }

            return response()->json([
                'message' => 'Login successful',
                'data' => Auth::user()
            ]);
        }

}
