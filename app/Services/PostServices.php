<?php

namespace App\Services;

use App\Models\Post;
use App\Models\User;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Facades\Auth;

class PostServices
{
    /**
     * Создание поста
     * 
     * @param array $data данные поста.
     * @return array созданный пост.
     */
    public function createPost(array $data): array
    {
        $post = new Post;
        $post->post_id = Uuid::uuid4()->toString();
        $post->user_id = Auth::id();
        $post->tier_id = $data['tier_id'];
        $post->title = $data['title'];
        $post->content = $data['content'];
        $post->save();

        if(isset($data['preview_url']) && $data['preview_url']){
            $post->addMediaFromRequest('preview_url')->toMediaCollection('posts');
        }

        return [
            'data' => $post,
            'status' => 201,
            'message' => 'Post successfully created'
        ];
    }

    /**
     * Получение постов пользовотеля
     * 
     * @param string $user_id идентификатор пользователя.
     * @return array пост.
     */
    public function getPosts(string $user_id): array
    {
        $user = User::where('user_id', $user_id)->first();
        $postData = $user->posts;

        if($postData->isEmpty()){
            return [
                'data' => [], 
                'status' => 404,
                'message' => 'Posts Not Fount'
            ];
        }

        return [
            'data' => $postData, 
            'status' => 200,
            'message' => 'Posts successfully received'
        ];
    }

    /**
     * Получение ленты постов пользовотеля
     * 
     * @param string $user_id идентификатор пользователя.
     * @return array пост.
     */
    public function getFeed(string $user_id): array
    {
        // TODO: Написать логику
        return [
            'data' => [],
            'status' => 200,
            'message' => 'Posts successfully received'
        ];
    }

    /**
     * Получение поста
     * 
     * @param string $post_id идентификатор поста.
     * @return array пост.
     */
    public function showPost(string $post_id): array
    {
        $post = Post::find($post_id);

        if (!$post) {
            return [
                'data' => [],
                'status' => 404,
                'message' => 'Post Not Found',
            ];
        }

        return [
            'data' => $post,
            'status' => 200,
            'message' => 'Post successfully received'
        ];
    }
}