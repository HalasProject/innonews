<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $fields = $request->validate([
            "email" => 'required|email|string|unique:users,email',
            "password" => 'required|confirmed|string|min:8',
            "firstname" => 'required|string',
            "lastname" => 'required|string'
        ]);

        $user = User::create([
            'email' => $fields['email'],
            'password' =>  Hash::make($request->input('password')),
            'last_login' => Carbon::now(),
            'firstname' => $fields['firstname'],
            'lastname' => $fields['lastname'],
        ]);

        $token = $user->createToken($request->header('User-Agent'))->plainTextToken;

        return new JsonResponse(['success' => true, 'result' => [
            'user' => User::find($user->id),
            'token' => $token
        ]], Response::HTTP_CREATED);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            "email" => 'required|string',
            "password" => 'required|string',
        ]);

        $user = User::where('email', $fields['email'])->first();

        // Check Password
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => "Email ou mot de passe invalide",
                'success' => false
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user->last_login = Carbon::now();
        $user->save();

        $token = $user->createToken($request->header('User-Agent'))->plainTextToken;

        return new JsonResponse([
            'success' => true,
            'result' => ['user' => $user, 'token' => $token]
        ], Response::HTTP_OK);
    }


    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response(['success' => true, 'message' => __($status)])
            : response(['success' => false, 'email' => __($status)], 401);
    }


    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ]);

                $user->save();

                event(new PasswordReset($user));
            }
        );
        return redirect()->back()->with(
            'success',
            "Your password has been changed successfully, please log back into the app"
        );
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        $response = [
            'success' => true,
            'message' => 'Successfully logged out'
        ];

        return new JsonResponse($response, Response::HTTP_OK);
    }
}
