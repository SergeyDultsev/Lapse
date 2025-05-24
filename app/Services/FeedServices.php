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

        // Рекомендации
        $recommendations = auth()->user()->recommendations();

        // Получаем пользователей, на кого подписан пользователь
        $subscribedUsers = User::whereIn('user_id', $subscriptions->pluck('target_id'))->get();

        return [
            'subscriptions' => $subscribedUsers,
            'recommendations' => $recommendations,
            'posts' => $posts,
        ];
    }
}
