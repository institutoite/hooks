<?php

use App\Http\Controllers\HookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// routes/api.php
Route::get('/hooks', [HookController::class, 'index'])->name('api.hooks.index');

// Route::post('/hooks/{hook}/increment-clicks', [HookController::class, 'incrementClicks'])->name('api.hooks.increment-clicks');
Route::post('/hooks/{hook}/increment-clicks', [HookController::class, 'incrementClicks'])->name('hooks.increment-clicks');