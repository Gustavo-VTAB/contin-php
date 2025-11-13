<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bm extends Model
{
    protected $table = 'fb_bms';

    protected $fillable = [
        'name',
        'status',
        'obs',
    ];
}
