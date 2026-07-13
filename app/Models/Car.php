<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    /** @use HasFactory<\Database\Factories\CarFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'brand',
        'model',
        'year',
        'color',
        'rent_price',
        'image',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
