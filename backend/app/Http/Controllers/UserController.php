<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\JsonResponse;

class UserController extends Controller
{
    /**
     * Get all informations of current connected user.
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function show(Request $request)
    {
        auth()->user()->feed;
        return new JsonResponse([
            'success' => true,
            'result' => auth()->user()
        ], Response::HTTP_OK);
    }

    /**
     * Update information of current connected user.
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function update(Request $request)
    {

        $validator = Validator::make($request->all(), [
            "firstname" => 'filled|string',
            "lastname" => 'filled|string',
            "email" => 'filled|email',
            "avatar" => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $fields = $request->all();

        $user = auth()->user();
        $sendEmailVerification = false;

        if (Arr::has($fields, 'email')) {
            if ($user->email !== $fields['email']) {
                $existUserWithEmail = User::where('email', $fields['email'])->first();
                if ($existUserWithEmail) {
                    return new JsonResponse([
                        "errors" => [
                            'email' => ["This email has already been taken."],
                        ]
                    ], Response::HTTP_UNPROCESSABLE_ENTITY);
                } else {
                    $fields['email_verified_at'] = null;
                    $sendEmailVerification = true;
                }
            }
        }

        if ($request->hasFile('avatar')) {
            $old_avatar = $user->avatar;
            if ($old_avatar != null) {
                Storage::delete(str_replace('storage/', 'public/', $old_avatar));
            }
            $file_path = $request->file('avatar')->store('/public/users/' . $user->id);
            $fields['avatar'] = str_replace('public/', 'storage/', $file_path);
        }

        $user->update($fields);
        $user->save();
        $user->feed;

        $response = ['success' => true, 'result' => $user];

        if ($sendEmailVerification) {
            $user->sendEmailVerificationNotification();
            $response['message'] = 'Email verification sent';
        }

        return new JsonResponse($response, Response::HTTP_OK);
    }

    public function updateFeed(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "cateogry" => ['filled', 'string', Rule::in(['*', 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'])],
            "sources" => 'required|array',
            "sources.*" => 'boolean',
            "date_from" => 'nullable',
            "date_to" => 'nullable'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = auth()->user(); // Get the current connected user
        $feed = $user->feed; // Get the user's feed

        // update the feed attributes based on the request body
        $feed->category = data_get(request(), 'category', $feed->category);
        $feed->newsapi = data_get(request('sources'), 'newsapi', $feed->newsapi);
        $feed->nyt = data_get(request('sources'), 'nyt', $feed->nyt);
        $feed->theguardian = data_get(request('sources'), 'theguardian', $feed->theguardian);
        $feed->date_from = data_get(request(), 'date_from', $feed->date_from);
        $feed->date_to = data_get(request(), 'date_to', $feed->date_to);

        // save the updated feed
        $feed->save();

        return new JsonResponse(['success' => true, 'result' => $feed], Response::HTTP_OK);
    }

    /**
     * removeAvatar
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function removeAvatar(Request $request)
    {
        $user = $request->user();
        if ($user->avatar != null) {
            Storage::delete(str_replace('storage/', 'public/', $user->avatar));
        }

        User::find($user->id)->update(["avatar" => null]);

        return new JsonResponse([
            'success' => true,
            'message' => 'Avatar deleted successfully'
        ], Response::HTTP_OK);
    }

    /**
     * Update password of current connected user.
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
            'new_password_confirmation' => 'required|min:6'
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return new JsonResponse([
                "errors" => [
                    'current_password' => ["Incorrect current password"],
                ]
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user->forceFill([
            'password' => Hash::make($request->new_password)
        ]);
        $user->save();

        return new JsonResponse([
            'success' => true,
            'message' => 'The password has been changed successfully'
        ], Response::HTTP_OK);
    }

    public function emailSendVerifyLink(Request $request)
    {

        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return new JsonResponse(['success' => true, 'message' => 'Email has already been verified'], Response::HTTP_OK);
        }

        $user->sendEmailVerificationNotification();

        return new JsonResponse([
            'success' => true,
            'message' => 'Email sent successfully'
        ], Response::HTTP_OK);
    }
}
