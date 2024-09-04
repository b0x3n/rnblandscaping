<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>R&B Landscaping</title>
 
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap" rel="stylesheet">
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.1/jquery-ui.min.js"></script>

        @vite([ 'resources/css/app.scss', 'resources/js/app.js' ])
    </head>
    <body class="antialiased">

        <div id="Outer">
            <div id="Inner">
                
                <div id="EmptyHeader">&nbsp;</div>
                <div id="EmptyNavbar">&nbsp;</div>

                <div id="Content">
                    @yield('content')
                </div>

                <div id="EmptyFooter">&nbsp;</div>

            </div>
        </div>

        <header id="Header">
            <div id="HeaderTitle" class="NoSelect" title="Click here to return to our Home page">
                <div id="HeaderIcon">
                    <div id="HeaderIconOuter" class="RotateLogoOuter">&nbsp;</div>
                    <div id="HeaderIconMiddle" class="RotateLogoMiddle">&nbsp;</div>
                    <div id="HeaderIconInner" class="RotateLogoInner">&nbsp;</div>
                </div>
                <div id="HeaderText">
                    <div>R&B</div>
                    <div>Landscaping</div>
                </div>
            </div>

            <div id="TelLink" title="Give us a call!">
            </div>

            <div id="HeaderToggle" title="View navigation menu" class="NoSelect">
                <div id="HeaderToggleTop">&nbsp;</div>
                <div id="HeaderToggleMiddle">&nbsp;</div>
                <div id="HeaderToggleBottom">&nbsp;</div>
            </div>
        </header>

        <nav id="Navbar">
            <div id="NavbarInner">
                @foreach($pages as $page)
                    @if($page->page_name !== 'Login' && $page->page_name  !== 'Register' && $page->page_name !== "Dashboard")
                        <a id="NavbarLink-{{$page->page_name}}" class="NavbarLink" href="/{{$page->page_name}}#" title="Visit the {{$page->page_name}} page">{{$page->page_name}}</a>
                    @endif
                @endforeach

                @auth
                    <a id="NavbarLink-Dashboard" class="NavbarLink" href="/Dashboard" title="Go to your Dashboard">Dashboard</a>
                    <a id="NavbarLink-Logout" class="NavbarLink" href="/Logout" title="Logout">Logout</a>
                @endauth
            </div>
            <div id="NavbarBanner" title="Give us a call!">
                <a class="NavbarLink" href="tel:07592647273">0141 123 4567</a>
            </div>
        </nav>

        <nav id="Footer">
            <div id="SocialMediaLinks">
                <div id="FacebookLink" class="SocialMediaLink" title="Visit our Facebook page" onclick='window.location.href = "https://www.facebook.com/RBLandscapingGLA/"'>
                    &nbsp;
                </div>
                <div id="LinkedInLink" class="SocialMediaLink" title="Visit our LinkedIn page" onclick='window.location.href = "https://uk.linkedin.com/in/ryan-lamont-33a3b5225"'>
                    &nbsp;
                </div>
                <div id="InstagramLink" class="SocialMediaLink" title="Check us out on Instagram">
                    &nbsp;
                </div>
            </div>
        </nav>

        <div id="Menu">
            @foreach($pages as $page)
                @if($page->page_name !== 'Login' && $page->page_name  !== 'Register' && $page->page_name !== "Dashboard")
                    <a id="MenuLink-{{$page->page_name}}" class="NavbarLink" href="/{{$page->page_name}}" title="Visit the {{$page->page_name}} page">{{$page->page_name}}</a>
                @endif        
            @endforeach

            @auth
                <a id="MenuLink-Dashboard" class="NavbarLink" href="/Dashboard" title="Go to your Dashboard">Dashboard</a>
                <a id="MenuLink-Logout" class="NavbarLink" href="/Logout" title="Logout">Logout</a>
            @endauth
        </div>

        <div id="Modal" class="Modal">
            <form id="CreateNewService" method="POST" action="/service-create" style="display: none;">
                <h1>Create New Service</h1>
                @csrf
                <div id="ServiceEditorImage" class="ServiceEditorImage" title="Click here to select an image">&nbsp;</div>
                <input type="text" id="service_name" name="service_name" placeholder="Service Name" required />
                <input type="text" id="service_short" name="service_short" placeholder="Short Description" required />
                <input type="text" id="service_long" name="service_long" placeholder="Detailed Description" required />
                <input type="text" id="service_image" name="service_image" placeholder="Service Thumbnail" style="margin-top: -300%; margin-left: -300%;" required />
                <button style="clear: both;" id="CreateNewServicecontinue">Continue</button>
                <button title="Cancel - return to the Service Manager" id="CreateNewServicecancel">Cancel</button>
                <button title="Delete this Service - careful!" id="CreateNewServicedelete">Delete</button>
            </form>
        </div>

        <div id="CreateNewProjectModal" class="Modal">
            <form id="CreateNewProject" method="POST" action="/project-create" style="display: none;">
                <h1 id="CreateProjectHeader">Create New Project</h1>
                @csrf
                <input type="text" id="project_name" name="project_name" placeholder="Project Name" required />
                <input type="text" id="project_short" name="project_short" placeholder="Short Description" required /> 
                <input type="text" id="project_input_file" name="project_input_file" placeholder="input file" style="margin-top: -250%; margin-left: -300%;" />

                <input type="text" id="project_images" name="project_images" placeholder="images" style="margin-top: -400%; margin-left: -300%;" required />
                <input type="text" id="project_image_info" name="project_image_info" placeholder="image info" style="margin-top: -350%; margin-left: -300%;" />
                <input type="text" id="project_services" name="project_services" placeholder="services" style="margin-top: -300%; margin-left: -300%;" />
                
                <div id="ServicesCheckboxes">
                    <h2>Relevant services</h2>
                    @foreach($services as $service)
                        <input id="ProjectServiceBox-{{$service->service_name}}" class="cbxBox" type="checkbox" name="cbx_project_{{$service->service_name}}" title="Check this if this project involved {{str_replace('_', ' ', $service->service_name)}}" />
                        <label id="ProjectServiceLabel-{{$service->service_name}}" class="cbxLabel" for="cbx_project_{{$service->service_name}}" title="Check this if this project involved {{str_replace('_', ' ', $service->service_name)}}">{{str_replace('_', ' ', $service->service_name)}}</label>
                    @endforeach
                </div>

                <div id="ProjectImages">
                    <h2>Project Images</h2>

                    <div id="SelectedProjectImages">
                    </div>

                    <div title="Add a new image to this Project" id="AddProjectImage" class="ProjectImageThumb" style="background-image: url(images/imageplaceholder.png);">
                        &nbsp;
                    </div>
                </div>

                <button style="clear: both;" id="CreateNewProjectcontinue">Continue</button>
                <button title="Cancel - return to the Project Manager" id="CreateNewProjectcancel">Cancel</button>
                <button title="Delete this Project - careful!" id="CreateNewProjectdelete">Delete</button>
            </form>
        </div>

        <div id="FilePickerModal" class="Modal">
            <div id="FilePicker">
                
                @foreach($images as $image)
                    @php
                        $imagePath = pathinfo($image->path, PATHINFO_FILENAME);
                    @endphp

                    <div
                        id="FileImg-{{$imagePath}}"
                        class="FileManagerThumb"
                        style="background-image: url(images/{{$image->path}});"
                        title="Image {{$image->name}} (path {{$image->path}})"
                    >

                            {{$image->path}}

                    </div>
                @endforeach

            </div>

            <button id="btnFilePickerCancel" class="TabsOption">
                Cancel
            </button>
        </div>
    </body>
</html>
