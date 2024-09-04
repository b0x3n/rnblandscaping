@extends('layouts.default')

@if (Auth::guest())
    <script>window.location.href = "/";</script>
@endif

@section('content')

    <div id="DashboardInner" class="ContentInner">

        <div id="Dashboard" class="Tabs">
            <div id="TabsHeader" class="TabsHeader">
                <div id="Tab0" name="File-Manager" class="Tab" title="Manage your images">
                    
                </div>
                <div id="Tab1" name="Services-Manager" class="Tab" title="Manage your services page">
                    
                </div>
                <div id="Tab2" name="Projects-Manager" class="Tab" title="Manage your projects page">
                    
                </div>
                <div id="Tab3" name="Account-Manager" class="Tab" title="Manage your user account">
                
                </div>
                <div id="Tab4" name="Media-Manager" class="Tab" title="Manage your social media links">

                </div>
                <div id="Tab5" name="Contact-Manager" class="Tab" title="Manage your contact information">

                </div>
            </div>
            <div id="TabsContent" class="TabsContent">
                <div id="TabContentFile-Manager" class="TabContent">
                    @include('partials.FileManager')
                </div>
                <div id="TabContentServices-Manager" class="TabContent">
                    @include('admin.ServicesManager')
                </div>
                <div id="TabContentProjects-Manager" class="TabContent">
                    @include('admin.ProjectsManager')
                </div>
                <div id="TabContentAccount-Manager" class="TabContent">
                    @include('partials.AccountManager')
                </div>
                <div id="TabContentMedia-Manager" class="TabContent">
                    @include('partials.MediaManager')
                </div>
                <div id="TabContentContact-Manager" class="TabContent">
                    @include('partials.ContactManager')
                </div>
            </div>
        </div>

    </div>
    
@stop