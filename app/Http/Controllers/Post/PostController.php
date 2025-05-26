<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostCreateRequest;
use App\Http\Resources\PostResource;
use App\Services\PostServices;
use Illuminate\Http\Request;

class PostController extends Controller
{
    protected $postService;

    public function __construct(PostServices $postService)
    {
        $this->postService = $postService;
    }

    public function store(PostCreateRequest $request): object
    {
        $data = $this->postService->createPost($request->all());
        return $this->jsonResponse(new PostResource((object) $data['data']), $data['status'], $data['message']);
    }

    public function index(string $user_id): object
    {
        $data = $this->postService->getPosts($user_id);
        return $this->jsonResponse(
            PostResource::collection(collect($data['data'])),
            $data['status'],
            $data['message']
        );
    }

    public function show(string $post_id): object
    {
        $data = $this->postService->showPost($post_id);
        return $this->jsonResponse(new PostResource((object) $data['data']), $data['status'], $data['message']);
    }

    public function destroy(string $post_id): object
    {
        $data = $this->postService->deletePost($post_id);
        return $this->jsonResponse(new PostResource((object) $data['data']), $data['status'], $data['message']);
    }
}
