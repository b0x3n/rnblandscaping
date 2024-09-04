
<form id="DeleteProject" method="POST" style="margin-top: -300%; margin-left: -300%;">
    @csrf
    @method('DELETE')
</form>

        <button id="btnAddProject" class="TabsOption">Add Project</button>

        @if(! empty($errors))
            @foreach($errors as $error)
                <p class="ErrorMessage" style="margin-top: 6vh;">{{$error}}</p>
            @endforeach
            @php session()->forget('errors');; @endphp
        @endif

        @if(session()->has('ProjectManagerSuccess'))
            <p class="SuccessMessage" style="margin-top: 6vh;">{{session()->get('ProjectManagerSuccess')}}</p>
            @php session()->forget('ProjectManagerSuccess'); @endphp
        @endif

        <div id="ProjectsManager">
            <div class="ProjectRowHeader">  
                <div class="ProjectColumnName" style="border: none; cursor: default;">Project name</div>
                <div class="ProjectColumnShort" style="border: none; cursor: default;">Short description</div>
                <div class="ProjectColumnImages" style="border: none; cursor: default;">Images</div>
                <div class="ProjectColumnLong" style="border: none; cursor: default;">Long description</div>
            </div>

            @foreach($projects as $project)
                <div id="ProjectRow-{{$project->project_name}}" class="ProjectRow" title="Click to edit or delete the {{$project->project_name}} Project">
                    <div id="ProjectName-{{$project->project_name}}" class="ProjectColumnName">
                        {{str_replace('_', ' ', $project->project_name)}}
                    </div>
                    <div id="ProjectShort-{{$project->project_name}}" class="ProjectColumnShort">
                        {{$project->project_short}}
                    </div>
                    <div id="ProjectImages-{{$project->project_name}}" class="ProjectColumnImages">
                        <div id="ProjectImageInner-{{$project->project_name}}" class="ProjectImagePath">{{str_replace(';', ',', $project->project_images)}}</div>
                        {{-- <div class="ServiceImageIcon" style="background-image: url('images/{{$service->service_image}}');">&nbsp;</div> --}}
                    </div>
                    <div id="ProjectServices-{{$project->project_name}}" class="ProjectColumnLong">
                        {{str_replace(';', ',', str_replace('_', ' ', $project->project_services))}}
                    </div>
                    <div id="ProjectId-{{$project->project_name}}" class="ProjectColumnId">
                        {{$project->id}}
                    </div>
                    <div id="ProjectImageInfo-{{$project->project_name}}" style="visibility: hidden;">
                        {{$project->project_image_info}}
                    </div>
                </div>
            
            @endforeach
        </div>
