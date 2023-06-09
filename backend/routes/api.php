<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerifyEmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
});

/*Email Verification */
Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [UserController::class, 'show']);
    Route::put('/password', [UserController::class, 'updatePassword']);
    Route::get('/email/sendlink', [UserController::class, 'emailSendVerifyLink']);
    Route::put('/user/update', [UserController::class, 'update']);
    Route::delete('/user/avatar', [UserController::class, 'removeAvatar']);
    Route::put('user/feed', [UserController::class, 'updateFeed']);
    Route::get('/articles/feed', [ArticleController::class, 'getArticles'])->name('feed');
});

Route::get('/articles', [ArticleController::class, 'getArticles'])->name('articles');
