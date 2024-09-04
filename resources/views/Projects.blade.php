@extends('layouts.default')

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
@endphp

@section('content')
    <div id="ProjectsInner" class="ContentInner">
        <div id="ProjectBrowser" class="ProjectSlider">

            @php
                $projectIndex = 0;
            @endphp
            
            @foreach($projects as $project)
                @php
                    $projectServices = array_values(__getProjectServices($project));
                    // $projectServicesShort = array_values(__getProjectServicesShort($projectServices));
                    $projectImages = __getProjectImages($project);
                    $projectInfo = array_values(__getProjectInfo($project));

                    $projectServicesShort = [];
                @endphp

                {{-- @foreach($services as $service)
                    @php
                        foreach ($projectServices as $s)
                        {
                            if ($services->service_name == $s)
                            {
                                $projectServicesShort.push($services->service_short);
                                break;
                            }
                        }
                    @endphp
                @endforeach --}}

                <div id="ProjectSlides-{{$project->project_name}}" class="ProjectSlides">
                    @php $imageIndex = 65535; @endphp

                    @foreach($projectImages as $image)
                        @php $imageName = explode('.', $image)[0]; @endphp
                        @if($imageIndex >= 65535)
                            <div id="ProjectSlideImage-{{$imageIndex}}-{{$project->project_name}}" class="ProjectSlideImage" style="background-image: url(images/AltLogo.png);">
                                <div id="ProjectSlideImageOverlay-{{$imageIndex}}-{{$project->project_name}}" class="ProjectSlideImageOverlay">&nbsp;</div>
                                <div  id="ProjectSlideInfo-{{$imageIndex}}-{{$project->project_name}}" class="ProjectSlideInfo">
                                    <span  id="ProjectSlideTitle-{{$imageIndex}}-{{$project->project_name}}" class="ProjectSlideTitle">{{str_replace('_', ' ', $project->project_name)}}</span>
                                    <p class="ProjectSlideShort">{{$project->project_short}}</p>
                                </div>                            
                                @php
                                    $projectIndex = 0;
                                    $serviceIndex = 0;
                                @endphp
                                <div id="ProjectServices-65535-{{$project->project_name}}" class="ProjectSlideServices">
                                    {{-- <div class="ProjectSlideServicesColumn"> --}}
                                    @foreach($projectServices as $projectService)
                                        <div title="Click here to view {{str_replace('_', ' ', $projectService)}} on the Services page" id="ProjectService-65535-{{$serviceIndex}}-{{$project->project_name}}" class="ProjectSlideService">{{str_replace('_', ' ', $projectService)}}</div>
                                        @php
                                            $serviceIndex++;
                                        @endphp
                                        {{-- @if(! ($serviceIndex % 2))
                                            </div><div class="ProjectSlideServicesColumn">
                                        @endif --}}
                                    @endforeach
                                    {{-- </div> --}}
                                </div>
                            </div>
                            @php $imageIndex = 0; @endphp
                        @endif
                            <div id="ProjectSlideImage-{{$imageIndex}}-{{$project->project_name}}" class="ProjectSlideImage" style="background-image: url(images/{{$image}});">
                            @php
                                // ? $prjInfo = '||';
                                if ($projectInfo != null && count($projectInfo) > $imageIndex)
                                    $prjInfo = $projectInfo[$imageIndex];
                            @endphp
                            <div id="ProjectSlideInfo-{{$imageIndex}}-{{$project->project_name}}" class="ProjectSlideTextWrapper">
                                <p id="ProjectSlideText-{{$imageIndex}}-{{$project->project_name}}" class="ProjectSlideText">
                                {{$prjInfo}}
                                </p>
                            </div>
                        </div>
                        @php 
                            $imageIndex++;
                        @endphp
                    @endforeach
                </div>
            @endforeach

            <div class="ProjectSlideThumbs" style="background-image: none;">
                @foreach($projects as $project)
                    @php
                        $lastImage = __lastProjectImage($project);
                    @endphp

                    <a title="{{$project->project_short}}" id="ProjectThumb-{{$project->project_name}}" class="ProjectSlideThumb">
                        <div id="ProjectThumbImage-{{$project->project_name}}" class="ProjectSlideThumbImage" style="background-image: url(images/{{$lastImage}});">
                            &nbsp;
                        </div>
                        <div id="ProjectThumbTitle-{{$project->project_name}}" class="ProjectSlideThumbTitle">
                            {{str_replace('_', ' ', $project->project_name);}}
                        </div>
                    </a>

                    @php
                        $projectIndex++;
                    @endphp
                @endforeach
            </div>
            
        </div>
    </div>
@stop
