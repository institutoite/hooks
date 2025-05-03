<?php

use App\Http\Controllers\HookController;
use App\Models\Hook;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    $hooks = Hook::paginate(10); 
    return view('welcome', compact('hooks'));
});


Route::post('/hooks/{hook}/increment-clicks', [HookController::class, 'incrementClicks']);
