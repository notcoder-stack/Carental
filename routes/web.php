<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = request()->user();
        $cars = [];
        if ($user && $user->role === 'lessor') {
            $cars = $user->cars()->latest()->get();
        }
        return \Inertia\Inertia::render('dashboard', [
            'cars' => $cars
        ]);
    })->name('dashboard');

    Route::post('cars', [\App\Http\Controllers\CarController::class, 'store'])->name('cars.store');
});

require __DIR__.'/settings.php';


Route::get('/', [CarController::class, 'index'])->name('home');

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisterController::class, 'create'])->name('register');
    Route::post('register', [RegisterController::class, 'store']);
    Route::get('login', [LoginController::class, 'create'])->name('login');
    Route::post('login', [LoginController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [LoginController::class, 'destroy'])->name('logout');
});