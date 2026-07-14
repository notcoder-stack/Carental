<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class LessorProfileController extends Controller
{
    public function show($id)
    {
        $lessor = User::where('role', 'lessor')->with('cars')->findOrFail($id);

        return Inertia::render('lessor/profile', [
            'lessor' => $lessor,
        ]);
    }
}
