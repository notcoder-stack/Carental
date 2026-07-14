<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RentRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_id',
        'client_id',
        'status',
    ];

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
}
