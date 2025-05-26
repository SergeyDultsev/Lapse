<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Services\SubscriptionServices;

class SubscriptionController extends Controller
{
    protected $subscriptionServices;

    public function __construct(SubscriptionServices $subscriptionServices)
    {
        $this->subscriptionServices = $subscriptionServices;
    }

    public function storeOrDelete(string $user_id): object
    {
        $data = $this->subscriptionServices->toggleSubscription($user_id);
        return $this->jsonResponse(
            new UserResource($data['data']),
            $data['status'], 
            $data['message']
        );
    }
}
