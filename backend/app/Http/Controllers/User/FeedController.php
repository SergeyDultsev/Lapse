<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\FeedServices;
use App\Http\Resources\UserResource;
use App\Http\Resources\PostResource;

class FeedController extends Controller
{
    protected $feedService;

    public function __construct(FeedServices $feedService)
    {
        $this->feedService = $feedService;
    }

    public function index(): object
    {
        $feed = $this->feedService->getFeed();

        return $this->jsonResponse(
            PostResource::collection($feed['posts']),
            $feed['status'],
            $feed['message']
        );
    }
}
