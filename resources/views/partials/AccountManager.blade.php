 


    <form id="PasswordManager"  action="/update-password/{{auth()->user()->id}}" method="POST" class="TabForm">

        <h1>Update Password</h1>

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

        <p class="DashboardText">
            Here you can change your password, just fill out the form then
            click <b>Continue</b> to save.
        </p>

        <input title="Type in your current user password" id="password" name="password" type="password" placeholder="Current Password" required />

        <br /><br />

        <input title="Type in your new user password" id="newpassword" name="newpassword" type="password" placeholder="New Password" required />
        <input title="Re-type to confirm your new user password" id="confirmpassword" name="confirmpassword" type="password" placeholder="Confirm new Password" required />
        
        <button id="PasswordManagercontinue">Continue</button>

    </form>
