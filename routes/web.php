<?php

use App\Models\Page;
use App\Models\Image;
use App\Models\Contact;
use App\Models\Project;
use App\Models\Service;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ProjectController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/Logout', [ UserController::class, 'logout']);

///////////////////////////////////////////////////////////
//  Pages are created and stored in the pages table in
//  the database. The first page in the database is
//  always the Home page, although it might be named
//  something else.
//
//  Regardless, on / we redirect to "Home", the page
//  handler will know that Home refers to the first
//  page in the table.
//
    Route::get('/', function () {
        return redirect('Home');
    });


///////////////////////////////////////////////////////////
//  Page handler
//
//  We don't know the name of a page in advance, they
//  are stored in a database and can be altered.
//
//  A page is requested, example /Services, we then
//  lookup Services in the pages table to see if it
//  exists...if not, we return the 404 - NotFound view.
//
    Route::get('{page}', function($pageName) {

        if ($pageName == 'Dashboard')
        {
            if (Auth::guest())
                return redirect('/Home');
        }

        if  ($pageName == 'Home')
            $pageData = PageController::getHomePage();
        else
            $pageData = PageController::getPage($pageName);

        $pages = Page::all();
        $services = Service::all();
        $images = Image::all();
        $contacts = Contact::all();
        $projects = Project::all()->sortByDesc('id');

        if (is_null($pageData->first()))
            return response()->view('NotFound', [
                'pageName'          => $pageName,
                'pages'             => $pages,
                'services'          => $services,
                'images'            => $images,
                'contacts'          => $contacts,
                'projects'          => $projects
            ], 404);
        
        return view($pageData->first()->page_name, [
            'pageName'              => $pageName,
            'pages'                 => $pages,
            'services'              => $services,
            'images'                => $images,
            'contacts'              => $contacts,
            'projects'              => $projects
        ]);
    });


    Route::post('/register', [ UserController::class, 'register']);
    Route::post('/login', [ UserController::class, 'login']);
    Route::post('/logout', [ UserController::class, 'logout']);
    
    Route::post('/update-password/{id}', [ UserController::class, 'updateUser' ]);

    Route::post('/image-store', [ ImageController::class, 'storeImage' ]);
    Route::delete('/image-delete/{image}', [ ImageController::class, 'deleteImage' ]);

    Route::post('/service-create', [ ServiceController::class, 'createService' ]);
    Route::delete('/service-delete/{service}', [ ServiceController::class, 'deleteService' ]);
    Route::post('/service-update/{service}', [ ServiceController::class, 'updateService' ]);

    Route::post('/project-create', [ ProjectController::class, 'createProject' ]);
    Route::delete('/project-delete/{project}', [ ProjectController::class, 'deleteProject' ]);
    Route::post('/project-update/{project}', [ ProjectController::class, 'updateProject' ]);
