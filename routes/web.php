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

    Route::get('settings', [\App\Http\Controllers\SettingsController::class, 'index'])->name('settings.index');
    Route::post('settings', [\App\Http\Controllers\SettingsController::class, 'update'])->name('settings.update');
    Route::delete('settings', [\App\Http\Controllers\SettingsController::class, 'destroy'])->name('settings.destroy');

    Route::get('wishlist', [\App\Http\Controllers\WishlistController::class, 'index'])->name('wishlist.index');
    Route::post('wishlist/{car}', [\App\Http\Controllers\WishlistController::class, 'toggle'])->name('wishlist.toggle');

    Route::get('lessor/clients', [\App\Http\Controllers\LessorClientController::class, 'index'])->name('lessor.clients');
    
    Route::get('lessors/{id}', [\App\Http\Controllers\LessorProfileController::class, 'show'])->name('lessors.show');
});


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
    Route::post('cars/{car}/rent', [\App\Http\Controllers\RentRequestController::class, 'store'])->name('rent.store');
    Route::post('notifications/{id}/read', [\App\Http\Controllers\RentRequestController::class, 'markNotificationAsRead'])->name('notifications.read');
});