
    <form id="FileManagerUploadFile" action="/image-store" method="POST" enctype="multipart/form-data" style="margin-top: -300%; margin-left: -300%;">
        @csrf
        <input id="StoreNewImage" type="file" name="image" />
        <button>Upload</button>
    </form>
    
    <form id="FileManagerDeleteFile" method="POST" enctype="multipart/form-data" style="margin-top: -300%; margin-left: -300%;">
        @csrf
        @method('DELETE')
        <input id="StoreNewImage" type="file" name="image" />
        <button>Upload</button>
    </form>

    @if(! empty($errors))
        @foreach($errors as $error)
            <p class="ErrorMessage" style="margin-top: 6vh;">{{$error}}</p>
        @endforeach
        @php session()->forget('errors');; @endphp
    @endif

    @if(session()->has('FileManagerSuccess'))
        <p class="SuccessMessage" style="margin-top: 6vh;">{{session()->get('FileManagerSuccess')}}</p>
        @php session()->forget('FileManagerSuccess'); @endphp
    @endif

    <button id="btnUploadFile" class="TabsOption">Upload File</button>
    
    <div id="FileManager">
        @foreach($images as $image)
            <div
                id="File-{{$image->id}}"
                class="FileManagerThumb"
                style="background-image: url(images/{{$image->path}});"
                title="Image {{$image->name}} (path {{$image->path}})"
            >
                <div class="FileManagerThumbDelete" id="btnDeleteImage-{{$image->path}}" title="Delete image {{$image->path}}">X</div>
            </div>
        @endforeach
    </div>
