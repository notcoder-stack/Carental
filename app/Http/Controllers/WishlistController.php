<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $wishlistedCars = $request->user()->wishlists()->with('car')->get()->pluck('car');

        return Inertia::render('wishlist', [
            'cars' => $wishlistedCars,
        ]);
    }

    public function toggle(Request $request, Car $car)
    {
        $user = $request->user();
        $wishlist = $user->wishlists()->where('car_id', $car->id)->first();

        if ($wishlist) {
            $wishlist->delete();
        } else {
            $user->wishlists()->create(['car_id' => $car->id]);
        }
    }
}
