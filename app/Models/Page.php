<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $table = 'fb_pages';

    protected $fillable = [
        'name',
        'ig_login',
        'ig_email',
        'ig_password',
        'obs',
        'status',
    ];
}
