<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ServiceController extends Controller
{
    public function createService(Request $request) {
        $service = Service::where('service_name', $request['service_name'])->first();

        if (! is_null($service))
            return redirect('/Dashboard#Services-Manager')->with([
                'errors' => [
                    'A Service named ' . $service['service_name'] . ' already exists'
                ],
            ]);

        $received = $request->validate([
            'service_name' => [ 'required', 'min:1', 'max:64', Rule::unique('services', 'service_name') ],
            'service_short' => [ 'required', 'min:1', 'max:510' ],
            'service_long' => [ 'required', 'min:1', 'max:4096' ],
            'service_image' => ['required', 'min:1', 'max:255' ]
        ]);

        Service::create($received);

        return redirect('/Dashboard#Services-Manager')->with([
            'ServiceManagerSuccess' => 'Created new Service ' . $request['service_name'] . '.',
        ]);
    }

    public function deleteService(Service $service) {
        $serviceName = $service->service_name;

        $service->delete();

        return redirect('/Dashboard#Services-Manager')->with([
            'ServiceManagerSuccess' => 'Deleted Service ' . $serviceName . ' successfully'
        ]);
    }

    public function updateService(Request $request, $service) {
        $serviceName = $request['service_name'];

        //dd($service);
        Service::where('id', $service)->update([
            'service_name' => $request['service_name'],
            'service_short' => $request['service_short'],
            'service_long' => $request['service_long'],
            'service_image' => $request['service_image']
        ]);
        //$service->update();

        return redirect('/Dashboard#Services-Manager')->with([
            'ServiceManagerSuccess' => 'Updated Service ' . $serviceName . ' successfully'
        ]);
    }
}
