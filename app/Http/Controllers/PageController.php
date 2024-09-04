<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PageController extends Controller
{
    
    public static function getHomePage()
    {
        $page = Page::all();

        if (is_null($page))
            return null;

        return $page;
    }

    public static function getPage($pageName)
    {
        $page = Page::all()->where('page_name', $pageName);

        if (is_null($page))
            return null;

        return $page;
    }

}
