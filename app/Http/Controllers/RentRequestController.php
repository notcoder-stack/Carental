<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\RentRequest;
use App\Notifications\RentRequestedNotification;
use Illuminate\Http\Request;

class RentRequestController extends Controller
{
    /**
     * Store a newly created rent request.
     */
    public function store(Request $request, Car $car)
    {
        // Prevent lessor from renting their own car
        if ($car->user_id === $request->user()->id) {
            return back()->with('error', 'You cannot rent your own car.');
        }

        // Check if there is already a pending request
        $existingRequest = RentRequest::where('car_id', $car->id)
            ->where('client_id', $request->user()->id)
            ->where('status', 'pending')
            ->first();

        if ($existingRequest) {
            return back()->with('error', 'You already have a pending request for this car.');
        }

        $rentRequest = RentRequest::create([
            'car_id' => $car->id,
            'client_id' => $request->user()->id,
            'status' => 'pending',
        ]);

        // Notify the lessor
        $car->user->notify(new RentRequestedNotification($rentRequest));

        return back()->with('success', 'Rent request sent successfully!');
    }

    /**
     * Mark a notification as read.
     */
    public function markNotificationAsRead(Request $request, $id)
    {
        $notification = $request->user()->notifications()->where('id', $id)->first();

        if ($notification) {
            $notification->markAsRead();
        }

        return back();
    }
}
