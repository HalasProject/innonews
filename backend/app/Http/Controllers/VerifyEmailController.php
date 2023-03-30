<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class VerifyEmailController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $user = User::find($request->route('id'));

        if ($user->hasVerifiedEmail()) {
            return new JsonResponse(['success' => true, 'message' => 'Your email has already been verified'], Response::HTTP_OK);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return new JsonResponse(['success' => true, 'message' => 'Your email was successfully verified'], Response::HTTP_OK);
    }
}
