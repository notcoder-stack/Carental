<?php

namespace App\Http\Controllers;

use App\Models\RentRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessorClientController extends Controller
{
    public function index(Request $request)
    {
        // Get all rent requests for cars owned by the authenticated lessor
        $rentRequests = RentRequest::whereHas('car', function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })
        ->with(['client', 'car'])
        ->latest()
        ->get();

        // Group or just return as a list. Returning as a list allows seeing which car they requested.
        return Inertia::render('lessor/clients', [
            'rentRequests' => $rentRequests,
        ]);
    }
}
