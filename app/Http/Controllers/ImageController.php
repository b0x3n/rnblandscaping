<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

use File;

class ImageController extends Controller
{
    public function storeImage(Request $request) {
        $received = $request->validate([
            'image' => 'required|image|mimes:png,jpg,jpeg|max:2048'
        ]);

        $imageExtension = $request->image->extension();
        $imageName = time() . '.' . $imageExtension;
        $request->image->move(public_path('images'), $imageName);

        $received['name'] = $request->image->getClientOriginalName();
        //$received['name'] = $received['name'] . $imageExtension;
        $received['path'] = $imageName;
        $received['user_id'] = auth()->id();
        
        $images = Image::where('name', $received['name'])->first();

        if (! is_null($images))
            return redirect('/Dashboard#File-Manager')->with([
                'images'            => $images,
                'image'             => $imageName,
                'imagePath'         => $received['path'],
                'errors'            => [
                    'An image named ' . $images->name . ' already exists'
                ]
            ]);
        
        Image::create($received);

        return redirect('/Dashboard#File-Manager')->with([
            'images'                => $images,
            'image'                 => $imageName,
            'imagePath'             => $received['path'],
            'FileManagerSuccess'               => 
                'Image ' . $received['name'] . ' uploaded successfully'
            
        ]);
    }


    public function deleteImage($imagePath) {
        $images = Image::where('path', $imagePath)->first();

        if (! is_null($images))
        {
            if (auth()->user()->id === $images->user_id) {      
                $image_path = public_path('images/' . $images->path);
                if (File::exists($image_path))
                    File::Delete($image_path);
                $images->delete();
            }
        }
    
        return redirect('/Dashboard#File-Manager')->with([
            'FileManagerSuccess'               => 
                'Image ' . $imagePath . ' deleted successfully'
        ]);
    }
}
