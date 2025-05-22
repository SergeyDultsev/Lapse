<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Post;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Http\Request;

class FeedController extends Controller
{
    public function index(){
        $subscriptions = Subscription::where('subscriber_id', auth()->id())->get();
        $posts = collect();

        foreach ($subscriptions as $subscription) {
            $posts = $posts->merge(
                Post::where('user_id', $subscription->target_id)->get()
            );
        }

        $recommendations = UserResource::collection(auth()->user()->recommendations());


        return $this->jsonResponse(
            [
                'subscriptions' => $subscriptions,
                'posts' => $posts,
                'recommendations' => $recommendations
            ],
            200,
            'success');
    }
}
