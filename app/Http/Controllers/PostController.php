<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PostServices;
use App\Http\Requests\PostCreateRequest;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    // Сервис для работы с постами
    protected $postService;

    /**
     * Внедрение зависимости PostServices через конструктор
     *
     * @param PostServices $postService
     */
    public function __construct(PostServices $postService)
    {
        $this->postService = $postService;
    }

    /**
     * Создание нового поста
     *
     * @param PostCreateRequest $request
     * @return object JSON-ответ с результатом создания
     */
    public function store(PostCreateRequest $request): object
    {
        $data = $this->postService->createPost($request->all());
        return $this->jsonResponse(new PostResource((object) $data['data']), $data['status'], $data['message']);
    }

    /**
     * Получение всех постов пользователя
     *
     * @param string $user_id
     * @return object JSON-ответ со списком постов
     */
    public function index(string $user_id): object
    {
        $data = $this->postService->getPosts($user_id);
        return $this->jsonResponse(
            PostResource::collection(collect($data['data'])),
            $data['status'],
            $data['message']
        );
    }

    /**
     * Получение одного поста по его ID
     *
     * @param string $post_id
     * @return object JSON-ответ с данными поста
     */
    public function show(string $post_id): object
    {
        $data = $this->postService->showPost($post_id);
        return $this->jsonResponse(new PostResource((object) $data['data']), $data['status'], $data['message']);
    }

    /**
     * Удаление поста по его ID
     *
     * @param string $post_id
     * @return object JSON-ответ с данными поста
     */
    public function destroy(string $post_id): object
    {
        $data = $this->postService->deletePost($post_id);
        return $this->jsonResponse(new PostResource((object) $data['data']), $data['status'], $data['message']);
    }
}
