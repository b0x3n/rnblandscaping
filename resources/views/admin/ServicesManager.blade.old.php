

        <button id="AddService" class="TabsOption" title="Add new service">Add Service</button>
        
        <h1>Manage Services</h1>

        <div id="ServicesBrowser" class="Services">
            <div id="ServiceHeaders" class="Service">
                <div class="ServiceName">Service</div>
                <div class="ServiceImage">Image</div>
                <div class="ServiceShort">Short description</div>
                <div class="ServiceLong">Long description</div>
            </div>
            @foreach($services as $service)
                <div id="Service-{{$service->service_name}}" class="Service" title="Edit or delete the {{$service->service_name}} service">
                    <pre id="ServiceName-{{$service->service_name}}" class="ServiceName">{{$service->service_name}}</pre>
                    <pre id="ServiceImage-{{$service->service_name}}" class="ServiceImage">{{$service->service_image}}</pre>
                    <pre id="ServiceShort-{{$service->service_name}}" class="ServiceShort">{{$service->service_short}}</pre>
                    <pre id="ServiceLong-{{$service->service_name}}" class="ServiceLong">{{$service->service_long}}</pre>
                    <div id="ServiceId-{{$service->service_name}}" class="ServiceId">{{$service->id}}</div>
                </div>
            @endforeach
        </div>

        <form id="DeleteServiceImage"method="POST" enctype="multipart/form-data" style="margin-top: -100%; margin-left: -100%;">
            @csrf
            @method('DELETE')
        </form>

        <form id="UploadNewImage" action='/image/store' method="POST" enctype="multipart/form-data" style="margin-top: -100%; margin-left: -100%;">
            @csrf
            <input id="StoreNewImage" type="file" name="image" />
            <button>Upload</button>
            @if(session()->has('image'))
                @method('DELETE')
            @endif
        </form>

        <form id="ServiceEditor" class="ServiceEditor" method="POST">

            @if(! empty($errors))
                @foreach($errors as $error)
                    <p class="ErrorMessage">{{$error}}</p>
                @endforeach
            @endif
                @if(session()->has('success'))
                    <p class="SuccessMessage">{{session()->get('success')}}</p>
                @endif
            @csrf

            <h1 id="ServiceEditorHeader"></h1>

            @if(! session()->has('image'))
                @php
                    $imagePath = "imageplaceholder.png";
                @endphp
                <img title="Click here to add an image" id="service-image" src={{URL::asset('/images/' . $imagePath)}} />
            @else  
                @php
                    $imagePath = session()->get('image');
                @endphp
                <img title="Click here to delete this image" id="service-image" src="{{URL::asset('/images/' . $imagePath)}}" />
            @endif

            <div>
                <input title="Service name, example - slabbing, or turfing" id="service_name" name="service_name" placeholder="Service Name" required />
                <input title="Short description of this service" id="service_short" name="service_short" placeholder="Short Description" required />
                <textarea title="A little more detail about this service" rows="5" id="service_long" name="service_long" placeholder="Long Description" required></textarea>

                <input id="service_image" class="serviceimage" name="service_image" placeholder="No image selected" required  value="{{$imagePath}}" />
        
                <button id="ServiceEditorcontinue">Save service</button>
            </div>
        </form>
