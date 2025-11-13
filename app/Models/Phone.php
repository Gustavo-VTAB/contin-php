<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    protected $table = 'phones';

    protected $fillable = [
        'card_id',
        'name',
        'status',
        'number',
        'operator',
        'easy_at',
        'obs',
    ];
}
