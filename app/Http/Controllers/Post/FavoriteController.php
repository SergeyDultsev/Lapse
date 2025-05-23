<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Services\FavoriteServices;

class FavoriteController extends Controller
{
    protected $favoriteService;

    public function __construct(FavoriteServices $favoriteService)
    {
        $this->favoriteService = $favoriteService;
    }

    public function storeOrDelete(string $post_id): object
    {
        $data = $this->favoriteService->toggleFavorite($post_id);
        return $this->jsonResponse($data['data'], $data['status'], $data['message']);
    }
}
