<?php

namespace App\Services;

use App\Models\Subscription;
use App\Models\Post;
use App\Models\Favorite;
use Illuminate\Support\Facades\Auth;

class FeedServices{
    public function getFeed(): array
    {
        $user = Auth::user();
        $subscriptions = Subscription::where('subscriber_id', auth()->id())->get();
        $postData = collect();

        foreach ($subscriptions as $subscription) {
            $postData = $postData->merge(
                Post::where('user_id', $subscription->target_id)->get()
            );
        }

        foreach ($postData as $post) {
            $post->is_favorite = Favorite::isFavorite($post->post_id, $user->user_id);
        }

        return [
            'posts' => $postData,
            'status' => 200,
            'message' => 'Feed successfully received',
        ];
    }
}
