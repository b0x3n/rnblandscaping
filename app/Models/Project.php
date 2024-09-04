<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        "project_name",
        "project_short",
        "project_images",
        "project_image_info",
        "project_services"
    ];
}
