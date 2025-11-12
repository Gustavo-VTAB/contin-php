<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Http\Requests\Panel\ProfileRequest;
use App\Service\ProfileService;

class ProfileController extends Controller
{
    protected $profileService;

    public function __construct(ProfileService $profileService)
    {
        $this->profileService = $profileService;
    }
    
    public function index()
    {
        $profiles = $this->profileService->getAllProfiles();

       return response()->json($profiles);

    }

    public function store(ProfileRequest $request)
    {
        $request->validated();
        $data = $request->only([
            'name',
            'phone_id',
            'status',
            'obs',
        ]);
        $profile = $this->profileService->createProfile($data);

        return response()->json($profile);
    }

    public function update(ProfileRequest $request, $id)
    {
        $request->validated();
        $data = $request->only([
            'name',
            'phone_id',
            'status',
            'obs',
        ]);
        $profile = $this->profileService->updateProfile($id, $data );

        return response()->json($profile);
    }

    public function destroy($id)
    {
        $profile = $this->profileService->deleteProfile($id);

        return response()->json($profile);
    }
}
