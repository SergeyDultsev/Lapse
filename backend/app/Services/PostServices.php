<?php

namespace App\Services;

use App\Models\Post;
use App\Models\Subscription;
use App\Models\User;
use App\Models\Favorite;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Facades\Auth;

class PostServices
{
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

    public function getPosts(string $user_id): array
    {
        $user = User::find($user_id);
        $postData = $user->posts;

        if($postData->isEmpty()){
            return [
                'data' => [],
                'status' => 404,
                'message' => 'Posts Not Fount'
            ];
        }

        foreach ($postData as $post) {
            $post->is_favorite = Favorite::isFavorite($post->post_id, $user_id);
        }

        return [
            'data' => $postData,
            'status' => 200,
            'message' => 'Posts successfully received'
        ];
    }

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

    public function deletePost(string $post_id): array
    {
        $post = Post::find($post_id);

        if (!$post) {
            return [
                'data' => [],
                'status' => 404,
                'message' => 'Post Not Found',
            ];
        }

        $post->delete();

        return [
            'data' => $post,
            'status' => 200,
            'message' => 'Post successfully delete'
        ];
    }
}
