
<form id="DeleteService" method="POST" style="margin-top: -300%; margin-left: -300%;">
    @csrf
    @method('DELETE')
</form>

    <button id="btnAddService" class="TabsOption">Add Service</button>

    @if(! empty($errors))
        @foreach($errors as $error)
            <p class="ErrorMessage" style="margin-top: 6vh;">{{$error}}</p>
        @endforeach
        @php session()->forget('errors');; @endphp
    @endif

    @if(session()->has('ServiceManagerSuccess'))
        <p class="SuccessMessage" style="margin-top: 6vh;">{{session()->get('ServiceManagerSuccess')}}</p>
        @php session()->forget('ServiceManagerSuccess'); @endphp
    @endif

    <div id="ServicesManager">
        <div class="ServiceRowHeader">
            <div class="ServiceColumnName" style="border: none; cursor: default;">Service name</div>
            <div class="ServiceColumnImage" style="border: none; cursor: default;">Thumbnail</div>
            <div class="ServiceColumnShort" style="border: none; cursor: default;">Short description</div>
            <div class="ServiceColumnLong" style="border: none; cursor: default;">Long description</div>
        </div>

        @foreach($services as $service)
            <div id="ServiceRow-{{$service->service_name}}" class="ServiceRow" title="Click to edit or delete the {{$service->service_name}} Service">
                <div id="ServiceName-{{$service->service_name}}" class="ServiceColumnName">
                    {{str_replace('_', ' ', $service->service_name)}}
                </div>
                <div id="ServiceImage-{{$service->service_name}}" class="ServiceColumnImage">
                    <div id="ServiceImageInner-{{$service->service_name}}" class="ServiceImagePath">{{$service->service_image}}</div>
                    {{-- <div class="ServiceImageIcon" style="background-image: url('images/{{$service->service_image}}');">&nbsp;</div> --}}
                </div>
                <div id="ServiceShort-{{$service->service_name}}" class="ServiceColumnShort">
                    {{$service->service_short}}
                </div>
                <div id="ServiceLong-{{$service->service_name}}" class="ServiceColumnLong">
                    {{$service->service_long}}
                </div>
                <div id="ServiceId-{{$service->service_name}}" class="ServiceColumnId">
                    {{$service->id}}
                </div>
            </div>
        @endforeach
    </div>
