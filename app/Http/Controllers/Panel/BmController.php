<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Http\Requests\Panel\BmRequest;
use App\Service\BmService;

class BmController extends Controller
{
    protected $bmService;

    public function __construct(BmService $bmService)
    {
        $this->bmService = $bmService;
    }
    
    public function index()
    {
        $bms = $this->bmService->getAllBms();

       return response()->json($bms);

    }

    public function store(BmRequest $request)
    {
        $request->validated();
        $data = $request->only([
            'name',
            'status',
            'obs',
        ]);
        $bm = $this->bmService->createBm($data);
        return response()->json($bm);
    }

    public function update(BmRequest $request, $id)
    {
        $request->validated();
        $data = $request->only([
            'name',
            'status',
            'obs',
        ]);
        $bm = $this->bmService->updateBm($id, $data );

        return response()->json($bm);
    }

    public function destroy($id)
    {
        $bm = $this->bmService->deleteBm($id);

        return response()->json($bm);
    }
}
