<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Services\FavoriteServices;
use App\Http\Resources\PostResource;

class FavoriteController extends Controller
{
    protected $favoriteService;

    public function __construct(FavoriteServices $favoriteService)
    {
        $this->favoriteService = $favoriteService;
    }

    public function index(): object
    {
        $data = $this->favoriteService->getFavorite();
        return $this->jsonResponse(
            PostResource::collection($data['data']), 
            $data['status'], 
            $data['message']);
    }

    public function storeOrDelete(string $post_id): object
    {
        $data = $this->favoriteService->toggleFavorite($post_id);
        return $this->jsonResponse(
            new PostResource((object) $data['data']), 
            $data['status'], 
            $data['message']);
    }
}
