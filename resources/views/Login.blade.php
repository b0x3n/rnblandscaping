@extends('layouts.default')

@section('content')

<div class="ContentInner">

    <form action="/login" method="POST" id="login">
        <h1>Login</h1>

        @if(! empty($errors))
        @foreach($errors as $error)
            <p class="ErrorMessage">{{$error}}</p>
        @endforeach
        @endif
            @if(session()->has('success'))
                <p class="SuccessMessage">{{session()->get('success')}}</p>
            @endif
        @csrf

        @csrf

        <input type="text" name="loginname" id="loginname" placeholder="Username" required />
        <input type="password" name="loginpassword" id="loginpassword" placeholder="Password" required />

        <button id="logincontinue">Continue</button>
    </form>

</div>

@stop

@auth
    <script type="text/javascript">window.location.href = '/Dashboard';</script>
@endauth
