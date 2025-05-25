<?php

namespace App\Services;

use App\Models\Subscription;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Ramsey\Uuid\Uuid;

class SubscriptionServices{
    public function toggleSubscription(string $user_id): array
    {
        $userAuth = Auth::user();

        if($user_id === $userAuth->user_id){
            return [
                'data' => [],
                'status' => 404,
                'message' => 'Cannot subscribe to yourself.',
            ];
        }

        $user = User::find($user_id);

        if (!$user) {
            return [
                'data' => [],
                'status' => 404,
                'message' => 'Post not found',
            ];
        }

        $isSubscribe = Subscription::where([
            ['target_id', '=', $user_id],
            ['subscriber_id', '=', $userAuth->user_id]
        ])->first();

        if(!$isSubscribe){
            $subscribe = new Subscription();
            $subscribe->subscription_id = Uuid::uuid4()->toString();
            $subscribe->subscriber_id = $userAuth->user_id;
            $subscribe->target_id = $user_id;
            $subscribe->save();

            $userAuth->increment('subscriber_count');
            $userAuth->save();

            $user->increment('subscriptions_count');
            $user->save();

            return [
                'user' => $user,
                'auth_user' => $userAuth,
                'status' => 201,
                'message' => 'Subscription removed',
            ];
        } else {
            $isSubscribe->delete();

            $userAuth->decrement('subscriber_count');
            $userAuth->save();

            $user->decrement('subscriptions_count');
            $user->save();

            return [
                'data' => $user,
                'status' => 200,
                'message' => 'Subscription removed',
            ];
        }
    }
}
