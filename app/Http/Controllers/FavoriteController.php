<?php

namespace App\Http\Controllers;

use App\Services\FavoriteServices;

class FavoriteController extends Controller
{
    // Сервис для работы с избранными постами
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
