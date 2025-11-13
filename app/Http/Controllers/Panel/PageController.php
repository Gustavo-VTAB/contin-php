<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Http\Requests\Panel\PageRequest;
use App\Service\pageService;

class PageController extends Controller
{
    public $pagesService;

    public function __construct()
    {
        $this->pageService = new pageService();
    }

    public function getAllPages()
    {
        $pages = $this->pageService->getAllPages();
        return response()->json($pages);
    }

    public function createPage(PageRequest $pageRequest)
    {
        $pageRequest->validated();
        $data = $pageRequest->only([
            'name',
            'ig_login',
            'ig_email',
            'ig_password',
            'obs',
            'status',
        ]);

        $page = $this->pageService->createPage($data);
        return response()->json($page);
    }

    public function updatePage(PageRequest $pageRequest, $id)
    {
        $pageRequest->validated();
        $data = $pageRequest->only([
            'name',
            'ig_login',
            'ig_email',
            'ig_password',
            'obs',
            'status',
        ]);
        
        $page = $this->pageService->updatePage($id, $data);
        return response()->json($page);
    }

    public function destroy($id)
    {
        $page = $this->pageService->destroy($id);
        return response()->json($page);
    }
}
