
  @php

    $projectServices = Array();
    $projectServiceShort = Array();
    $projectImages = Array();
    $projectInfo = Array();

    $lastImage = '';

    if (! function_exists('__lastProjectImage'))
    {
        function __lastProjectImage($project)
        {
            $pi = explode(';', $project->project_images);
            
            $projectServices =array_filter(explode(';', $project->project_services));
            $projectImages = array_filter($pi);
            $projectInfo = array_filter(explode(';', $project->project_image_info));

            $lastImage = end($projectImages);

            return $lastImage;
        }
    }

    if (! function_exists('__getProjectImages'))
    {
        function __getProjectImages($project)
        {
            $newArray = explode(';', $project->project_images);

            return array_filter($newArray);
        }
    }

    if (! function_exists('__getProjectInfo'))
    {
        function __getProjectInfo($project)
        {
            $newArray = explode(';', $project->project_image_info);

            return array_filter($newArray, function($el)
            {
                if ($el != null && trim($el) != '')
                    return trim($el);
            });
        }
    }

    if (! function_exists('__getProjectServices'))
    {
        function __getProjectServices($project)
        {
            $newArray = explode(';', $project->project_services);

            return array_filter($newArray);
        }
    }

    // if (! function_exists('__getProjectServicesShort'))
    // {
    //     function __getProjectServicesShort($projectServices)
    //     {
    //         $newArray = [];

    //         foreach ($services as $service)
    //         {
    //             $s = 0;

    //             while ($s < count($projectServices))
    //             {
    //                 if ($service->service_name === $projectServices[$s])
    //                 {
    //                     $newArray.push($service->service_short);
    //                     break;
    //                 }
    //                 $s++;
    //             }
    //         }

    //         return array_filter($newArray);
    //     }
    // }

    $projectCounter = 0;
@endphp
    <br />
    <h1>
        @php
        if (count($projects) <= 1)
            echo "Latest project";
        else 
            echo "Latest projects";
        @endphp
    </h1>

    <div id="ProjectPreviewEmpty" class="ProjectPreviewEmpty">
    <div id="ProjectPreviews" class="ProjectPreviews">
        {{-- <h1>Latest Projects</h1> --}}
        @foreach($projects as $project)

            @if($projectCounter >= 3)
                @break
            @endif

            @php
                $projectImages = array_values(__getProjectImages($project));

                $first_image = '';
                $last_image = '';

                if (count($projectImages) >= 1)
                {
                    $first_image = $projectImages[0];
                    $last_image = $projectImages[count($projectImages) - 1];
                }

                $beforeQuotes = Array('It started like this...', 'See how we went from this...', 'We turned this...');
                $afterQuotes = Array('...and ended like this!', '...to this!', '...into this!');
                $ctaQuotes = Array('Click to see more!', 'Click for more info!', 'Click to view full project!');
            @endphp
        
            <div title="{{$project->project_short}} - click to view more" id="ProjectPreview-{{$projectCounter}}" class="ProjectPreview">
                {{-- <h2 class="ProjectPreviewTitle">{{str_replace('_', ' ', $project->project_name)}}</h2> --}}
                <div id="ProjectPreviewText-{{$projectCounter}}" class="ProjectPreviewText">
                    <div  id="ProjectPreviewTitle-{{$projectCounter}}" class="ProjectPreviewTitle">{{str_replace('_', ' ', $project->project_name)}}</div>

                    <p id="ProjectPreviewTextBefore-{{$projectCounter}}">
                        {{$beforeQuotes[$projectCounter]}}
                    </p>
                    <p  id="ProjectPreviewTextAfter-{{$projectCounter}}">
                        {{$afterQuotes[$projectCounter]}} {{$ctaQuotes[$projectCounter]}}
                    </p>
                </div>
                <div id="ProjectPreviewBefore-{{$projectCounter}}" class="ProjectPreviewImage" style="background-image: url(images/{{$first_image}});">
                    &nbsp;
                </div>
                <div id="ProjectPreviewAfter-{{$projectCounter}}" class="ProjectPreviewImage" style="background-image: url(images/{{$last_image}});">
                    &nbsp;
                </div>
            </div>

            @php
                $projectCounter++;
            @endphp

        @endforeach
    </div>
    </div>