<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\FeedServices;

class FeedController extends Controller
{
    protected $feedService;

    public function __construct(FeedServices $feedService)
    {
        $this->feedService = $feedService;
    }

    public function index(): object
    {
        $data = $this->feedService->getFeed();

        return $this->jsonResponse(
            $data['data'],
            $data['status'],
            $data['message']
        );
    }
}
