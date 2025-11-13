<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Http\Requests\Panel\PhoneRequest;
use App\Service\PhoneService;

class PhoneController extends Controller
{
    public $phoneService;

    public function __construct()
    {
        $this->phoneService = new PhoneService();
    }

    public function getAllPhones()
    {
        $phones = $this->phoneService->getAllPhones();
        return response()->json($phones);
    }

    public function createPhone(PhoneRequest $phoneRequest)
    {
        $phoneRequest->validated();
        $data = $phoneRequest->only([
            'card_id',
            'name',
            'status',
            'number',
            'operator',
            'easy_at',
        ]);

        $phone = $this->phoneService->createPhone($data);
        return response()->json($phone);
    }

    public function updatePhone(PhoneRequest $phoneRequest, $id)
    {
        $phoneRequest->validated();
        $data = $phoneRequest->only([
            'card_id',
            'name',
            'status',
            'number',
            'operator',
            'easy_at',
        ]);
        
        $phone = $this->phoneService->updatePhone($id, $data);
        return response()->json($phone);
    }

    public function destroy($id)
    {
        $phone = $this->phoneService->destroy($id);
        return response()->json($phone);
    }
}
