<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use App\Models\Post;
use App\Models\Subscription;

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

        $recommendations = UserResource::collection(auth()->user()->recommendations());

        return [
            'data' => [
                'subscriptions' => $subscriptions,
                'posts' => $posts,
                'recommendations' => $recommendations
            ],
            'status' => '200',
            'message' => 'Success',
        ];
    }
}
