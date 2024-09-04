@extends('layouts.default')

@section('content')

    <form action="/register" method="POST" class="StandardForm">
        <h1>Register</h1>

        @if ($errors)
            @foreach($errors as $message)
                <div class="StandardFormMessage">
                    <div class="StandardFormMessageBody">{{$message}}</div>
                </div>
            @endforeach
        @endif

        @csrf

        <input type="text" name="name" id="name" placeholder="Username" required />
        <input type="email" name="email" id="email" placeholder="Email" required />
        <input type="password" name="password" id="password" placeholder="Password" required />
        <input type="password" name="confirm" id="confirm" placeholder="Confirm Password" required />
        
        <button>Submit</button>
    </form>

@stop
