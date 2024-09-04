@extends('layouts.default')

@section('content')

    <div id="ServicesInner" class="ContentInner">
        <div id="ServicesSlider" class="Slider">

            @php $serviceCount = 0; @endphp

            @foreach($services as $service)
                {{-- @if($service->service_name == 'Slabbing') --}}
                    <div id="ServiceSlide-{{$service->service_name}}" class="Slide">
                        <img id="ServiceSlideImage-{{$service->service_name}}" class="SlideImage" src='images/{{$service->service_image}}' />
                        <div id="ServiceSlideText-{{$service->service_name}}" class="SlideText">
                            {{-- <h1 id="ServiceSlideTitle-{{$service->service_name}}" class="SlideTitle">
                                {{$service->service_name}}
                            </h1> --}}
                            <p id="ServiceSlideShort-{{$service->service_name}}" class="SlideShortText">
                                {{$service->service_short}}
                            </p>
                            <p id="ServiceSlideLong-{{$service->service_name}}" class="SlideLongText">
                                {{$service->service_long}}
                            </p>
                        </div>
                    </div>
                {{-- @endif --}}
                @php $serviceCount++; @endphp
            @endforeach

            @if($serviceCount > 0)
            <div id="SlideThumbs-{{$service->service_name}}" class="SlideThumbs">
                
                @foreach($services as $service)
                    <div id="SlideThumb-{{$service->service_name}}" class="SlideThumb" title="{{$service->service_short}}">
                        <div id="SlideThumbImage-{{$service->service_name}}" class="SlideThumbImage" style="background-image: url(images/{{$service->service_image}});">
                            &nbsp;
                        </div>
                        <div id="SlideTitle-{{$service->service_name}}" class="SlideThumbTitle">      
                            {{str_replace('_', ' ', $service->service_name)}}
                        </div>
                    </div>
                @endforeach
            </div>
            @else
                <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
                    <h1>
                        Under construction - check back soon!
                    </h1>
                </div>
            @endif
        </div>
    </div>

@stop