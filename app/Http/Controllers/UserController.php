<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request) {
        $received = $request->validate([
            'name' => [ 'required', 'min:3', 'max:30', Rule::unique('users', 'name') ],
            'email' => [ 'required', 'email', Rule::unique('users', 'email') ],
            'password' => [ 'required', 'min:3', 'max:200' ]
        ]);

        $name = $request->name;
        $email = $request->email;
        $password = $request->password;
        $confirm = $request->confirm;

        if ($confirm != $password)
            return redirect('/register')->with([
                 'errors' => [ 'Password and confirm password do not match' ]
            ]);

        $received['password'] = bcrypt($received['password']);
        
        $user = User::create($received);
        auth()->login($user);

        return redirect('/');
    }

    public function login(Request $request) {
        $received = $request->validate([
            'loginname' => [ 'required' ],
            'loginpassword' => [ 'required' ]
        ]);

        if (auth()->attempt([
            'name' => $received['loginname'],
            'password' => $received['loginpassword']
        ])) {
            $request->session()->regenerate();
        }
        else
            return redirect('/Login')->with([ 
                'errors' => [ 'Login failed' ]
            ]);

        return redirect('/Dashboard');
    }

    public function logout() {
        auth()->logout();
        return redirect('/');
    }

    public function updateUser(Request $request, $id) {
    
        if (Auth::guest())
            return view('/Home');

        $currentPassword = $request['password'];
        $newPassword = $request['newpassword'];
        $confirmPassword = $request['confirmpassword'];

        if (
            ($currentPassword === null || $currentPassword === '') ||
            ($newPassword === null || $newPassword === '') ||
            ($confirmPassword === null || $confirmPassword === '')
        )
            return redirect('/Dashboard#Account-Manager')->with([
                'errors' => [
                    'All fields are required!'
                ]
            ]);

        $user = User::find($id);

        if ($confirmPassword !== $newPassword)
            return redirect('/Dashboard#Account-Manager')->with([
                'errors' => [
                    'New and confirmed passwords do not match!'
                ]
            ]);

        //$currentPassword = bcrypt($currentPassword);
        $newPassword = bcrypt($confirmPassword);

        if (! Hash::check($currentPassword, $user->password)) {
            return redirect('/Dashboard#Account-Manager')->with([
                'errors' => [
                    'Incorrect user password!'
                ]
            ]);
        }

        // if ($user->password !== $currentPassword) {
        //     return redirect('/dashboard#AccountManager')->with([
        //         'errors' => [
        //             'Incorrect user password!'
        //         ]
        //     ]);
        // }

        User::where('id', $id)->update([
            'password' => $newPassword
        ]);

        return redirect('/Dashboard#Account-Manager')->with([
            'success' => 'Password changed successfully!'
        ]);
    }
}
