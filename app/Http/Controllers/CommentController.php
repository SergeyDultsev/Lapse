<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentCreateRequest;
use App\Http\Resources\CommentResource;
use Illuminate\Http\Request;
use App\Services\CommentServices;

class CommentController extends Controller
{
    // Сервис для работы с комментариями
    protected $commentService;

    
    /**
     * Внедрение зависимости CommentServices через конструктор
     *
     * @param CommentServices $commentService
     */
    public function __construct(CommentServices $commentService)
    {
        $this->commentService = $commentService;
    }

    /**
     * Создание нового комментария
     *
     * @param CommentRequest $request
     * @return object JSON-ответ с результатом создания
     */
    public function store(CommentCreateRequest $request, string $post_id): object
    {
        $data = $this->commentService->createComment($request->all(), $post_id);
        return $this->jsonResponse(new CommentResource((object) $data['data']), $data['status'], $data['message']);
    }

    /**
     * Получение комментариев поста
     *
     * @param string $post_id
     * @return object JSON-ответ с результатом создания
     */
    public function index(string $post_id): object
    {
        $data = $this->commentService->indexComment($post_id);
        return $this->jsonResponse(CommentResource::collection(collect($data['data'])), $data['status'], $data['message']);
    }
}
