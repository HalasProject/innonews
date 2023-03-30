<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/reset-password/{token}', function (Request $request, $token) {
    return view('auth.reset-password', ['token' => $token, 'email' => $request->query('email')]);
})->middleware('guest')->name('password.reset');


Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.new');
