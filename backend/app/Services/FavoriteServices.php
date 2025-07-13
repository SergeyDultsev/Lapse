<?php

namespace App\Services;

use App\Models\Favorite;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Ramsey\Uuid\Uuid;

class FavoriteServices{
    public function getFavorite(): array
    {
        $user = Auth::user();
        $postData = $user->favoritePosts()->get();

        foreach ($postData as $post) {
            $post->is_favorite = Favorite::isFavorite($post->post_id, $user->user_id);
        }

        return [
            'data' => $postData,
            'status' => 200,
            'message' => 'Post successfully received',
        ];
    }

    public function toggleFavorite(string $post_id): array
    {
        $user = Auth::user();
        $post = Post::find($post_id);

        if (!$post) {
            return [
                'data' => [],
                'status' => 404,
                'message' => 'Post not found',
            ];
        }

        $isFavorite = Favorite::where([
            ['post_id', '=', $post_id],
            ['user_id', '=', $user->user_id]
        ])->first();

        if(!$isFavorite){
            $favorite = new Favorite();
            $favorite->favorite_id = Uuid::uuid4()->toString();
            $favorite->post_id = $post_id;
            $favorite->user_id = $user->user_id;
            $favorite->save();

            $post->increment('save_count');
            $post->save();
            $post->is_favorite = Favorite::isFavorite($post->post_id, $user->user_id);

            return [
                'data' => $post,
                'status' => 201,
                'message' => 'Post added to favorites',
            ];
        } else {
            $isFavorite->delete();

            $post->decrement('save_count');
            $post->save();
            $post->is_favorite = Favorite::isFavorite($post->post_id, $user->user_id);

            return [
                'data' => $post,
                'status' => 200,
                'message' => 'Post removed from favorites',
            ];
        }
    }
}
