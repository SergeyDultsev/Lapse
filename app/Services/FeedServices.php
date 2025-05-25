<?php

namespace App\Services;

use App\Models\Subscription;
use App\Models\Post;
use App\Models\User;

class FeedServices{
    public function getFeed(): array
    {
        $subscriptions = Subscription::where('subscriber_id', auth()->id())->get();
        $posts = collect();

        foreach ($subscriptions as $subscription) {
            $posts = $posts->merge(
                Post::where('user_id', $subscription->target_id)->get()
            );
        }

        $recommendations = auth()->user()->recommendations();

        return [
            'recommendations' => $recommendations,
            'posts' => $posts,
        ];
    }
}
