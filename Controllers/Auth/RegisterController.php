<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    use RegistersUsers;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * The user has been registered.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\JsonResponse
     */
    protected function registered(Request $request, User $user)
    {
        if ($user instanceof MustVerifyEmail) {
            $user->sendEmailVerificationNotification();

            return response()->json(['status' => trans('verification.sent')]);
        }

        return response()->json($user);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255|unique:users',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {

        $mUser = User::create([
            'user_name'         => $data['name'],
            'user_athandle'     => $data['name'],
            'email'             => $data['email'],
            'email_verified_at' => null,
            'user_stunumber'    => '20171000',
            'user_date'         => date_format(date_create(date("m/d/Y")), "D, d M Y"),
            'user_password'     => bcrypt($data['password']),
            'user_repassword'   => bcrypt($data['password']),
            'remember_token'    => null,
            'user_id'           => null
        ]);

        return $mUser;
    }

    public function verifyUsername(Request $request, $handle){

        $request->Validate([
            'name' => 'required|max:255|unique:users'
        ]);

        if(empty($handle)) return $this->error('Incomplete Request');

        if(preg_match("/[0-9]/", $handle)) return $this->error('Your Username Cannot Be All Numbers');

        $mUser = User::all()
                         ->where('user_athandle', $handle);
        
        return response()->json([
            'error'         => false,
            'unique'        => $mUser->count() == 0,
            'message'       => $mUser->count() == 0 ? 'This Username Is Unique' : 'There is already an account using this Username'
        ]);

    }

    public function verifyEmail($email){

        $request->Validate([
            'email' => 'required|max:255|unique:users'
        ]);

        if(empty($email)) return $this->error('Incomplete Request');

        $mUser = User::all()
                        ->where('email', $email);

        return response()->json([
            'error'         => false,
            'unique'        => $mUser->count() == 0,
            'message'       => $mUser->count() == 0 ? 'This Email Is Unique' : 'There is already an account using this Email Address'
        ]);

    }

    private function error($e){

        return response()->json([

            'error'     => true,
            'message'   => $e

        ]);

    }
}
