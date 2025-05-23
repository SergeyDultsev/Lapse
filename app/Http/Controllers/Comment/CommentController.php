<?php

namespace App\Http\Controllers\Comment;

use App\Http\Controllers\CommentRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\CommentCreateRequest;
use App\Http\Resources\CommentResource;
use App\Services\CommentServices;

class CommentController extends Controller
{
    protected $commentService;


    public function __construct(CommentServices $commentService)
    {
        $this->commentService = $commentService;
    }

    public function store(CommentCreateRequest $request, string $post_id): object
    {
        $data = $this->commentService->createComment($request->all(), $post_id);
        return $this->jsonResponse(new CommentResource((object) $data['data']), $data['status'], $data['message']);
    }

    public function index(string $post_id): object
    {
        $data = $this->commentService->indexComment($post_id);
        return $this->jsonResponse(CommentResource::collection(collect($data['data'])), $data['status'], $data['message']);
    }

    public function destroy(string $comment_id): object
    {
        $data = $this->commentService->deleteComment($comment_id);
        return $this->jsonResponse(new CommentResource((object) $data['data']), $data['status'], $data['message']);
    }
}
