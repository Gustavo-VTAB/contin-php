<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = 'fb_profiles';

    protected $fillable = [
        'name',
        'phone_id',
        'status',
        'obs',
    ];
}
