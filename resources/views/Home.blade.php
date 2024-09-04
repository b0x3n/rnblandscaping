@extends('layouts.default')

@section('content')

    <div id="ContentInnerHome" style="background-image: url(images/AltLogo.png);">
        <div id="ContentHome">
            <div id="ContentHomeText">
                <h1>{{$pages[0]->page_title}}</h1>

                <p>{!! html_entity_decode($pages[0]->page_content) !!}</p>
                
                <div id="ContentHomeProjects" style="margin: 3vh 0 0 0;">
                    @include('partials.LatestProjects')
                </div>
            </div>

            <div id="ContentHomeServices">
                <h1>Services</h1>
                @php $serviceCounter = 0; @endphp
                @foreach($services as $service)
                    @if($serviceCounter >= 3)
                        @break
                    @endif
                    <div title="{{$service->service_short}}" id="ContactPreview-{{$service->service_name}}" class="ContactHomeService">
                        <div id="ServicePreviewThumb-{{$service->service_name}}" class="ContentHomeServiceThumb" style="background-image: url(images/{{$service->service_image}});">
                            &nbsp;
                        </div>
                        <h2 id="ServicePreviewTitle-{{$service->service_name}}" class="ContentHomeServiceTitle">
                            {{str_replace('_', ' ', $service->service_name)}}
                        </h2>
                    </div>
                    @php $serviceCounter++; @endphp
                @endforeach
                <a title="Go to the Services page" style="margin-top: 2.5vh; position: relative; float: right;" href="/Services">View all</a>
            </div>

        </div>
    </div>
@stop