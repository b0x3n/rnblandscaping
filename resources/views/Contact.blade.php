@extends('layouts.default')

@section('content')

    <div id="ContentInnerHome" style="background-image: url(images/AltLogo.png);">
        <div id="ContentHome">
            <div id="ContentHomeText">
                <h1>Contact</h1>

                <p>
                    You might not see what you want listed in the <a href="/Services">
                    Services</a> page - that doesn&quot;t mean we can&quot;t help!

                    <br /><br />

                    If you are unsure or have any questions then feel free to get
                    in touch.
                </p>
            </div>
            <div id="ContentHomeServices">

                <h1>Get in touch</h1>

                    @foreach($contacts as $contact)
                        <div id="ContactPreview-{{$contact->contact_name}}" class="ContactHomeService">
                            <div id="ContactThumb-{{$contact->contact_name}}" class="ContentHomeServiceThumb" style="background-image: url(images/{{$contact->contact_image}});">
                                &nbsp;
                            </div>
                            <div class="ContactHomeServiceInfo">
                                <p id="ContactName-{{$contact->contact_name}}" class="Contact-Title" style="position: absolute;; width: 100%; text-align: right; padding-right: 1vw; font-size: 22px;">
                                    {{$contact->contact_name}}
                                </p>
                                {{-- <p id="ContactTelephone-{{$contact->contact_name}}" class="Contact-Tel" style="position: absolute; left: 1vh; bottom: 4vh; width: 100%; text-align: right;"> --}}
                                <a class="Contact-Tel" title="Contact {{$contact->contact_name}} by Telephone" id="ContactTelephoneLink-{{$contact->contact_name}}" href="tel:{{$contact->contact_telephone}}">{{$contact->contact_telephone}}</a>
                                {{-- </P>
                                <p id="ContactEmail-{{$contact->contact_name}}" class="Contact-Email" style="position: absolute; bottom: .5vh; left: 1vh; width: 100%; text-align: right;"> --}}
                                <a class="Contact-Email" title="Contact {{$contact->contact_name}} by Email" id="ContactEmailLink-{{$contact->contact_name}}" href="mailto:{{$contact->contact_email}}">{{$contact->contact_email}}</a>
                                {{-- </P> --}}
                            </div>
                        </div>
                    @endforeach
                
            </div>
        </div>
    </div>

@stop