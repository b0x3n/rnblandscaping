<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    public function createProject(Request $request) {
        $project = Project::where('project_name', $request['project_name'])->first();

        if (! is_null($project))
            return redirect('/Dashboard#Projects-Manager')->with([
                'errors' => [
                    'A Project named ' . $project['project_name'] . ' already exists'
                ],
            ]);

        $request['project_name'] = str_replace(' ', '_', $request['project_name']);

        $received = $request->validate([
            'project_name' => [ 'required', 'min:1', 'max:64', Rule::unique('projects', 'project_name') ],
            'project_short' => [ 'required', 'min:1', 'max:510' ],
            'project_images' => [ 'required', 'min:1', 'max:4096' ],
            'project_image_info' => ['required', 'min:1', 'max:4096' ],
            'project_services' => [ 'required', 'min:1', 'max:4096']
        ]);

        Project::create($received);

        return redirect('/Dashboard#Projects-Manager')->with([
            'ProjectManagerSuccess' => 'Created new Project ' . $request['project_name'] . '.',
        ]);
    }

    public function deleteProject(Project $project) {
        $projectName = $project->project_name;

        $project->delete();

        return redirect('/Dashboard#Projects-Manager')->with([
            'ProjectManagerSuccess' => 'Deleted Project ' . $projectName . ' successfully'
        ]);
    }

    public function updateProject(Request $request, $project) {
        $projectName = $request['project_name'];

        //dd($service);
        Project::where('id', $project)->update([
            'project_name' => $request['project_name'],
            'project_short' => $request['project_short'],
            'project_images' => $request['project_images'],
            'project_image_info' => $request['project_image_info'],
            'project_services' => $request['project_services']
        ]);
        //$service->update();

        return redirect('/Dashboard#Projects-Manager')->with([
            'ProjectManagerSuccess' => 'Updated Project ' . $projectName . ' successfully'
        ]);
    }
}
