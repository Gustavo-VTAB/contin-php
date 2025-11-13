<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Http\Requests\Panel\LogRequest;
use App\Service\LogService;
use Illuminate\Http\Request;

class LogController extends Controller
{
    protected $logService;

    public function __construct(LogService $logService)
    {
        $this->logService = $logService;
    }

     public function getAllLogs(LogRequest $request)
    {
        $filters = $request->only(['user_id', 'table_name', 'action', 'date_start', 'date_end']);
        $logs = $this->logService->getLogs($filters);

        return response()->json($logs);
    }

    public function show($id)
    {
        $log = $this->logService->getLogById($id);
        return response()->json($log);
    }

}
