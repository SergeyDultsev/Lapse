<?php

namespace App\Services;

use App\Models\Tier;
use Illuminate\Support\Facades\Auth;
use Ramsey\Uuid\Uuid;

class TierServices{
    public function createTier(array $data): array
    {
        $userId = Auth::id();
        $priceCheck = Tier::where('user_id', $userId)
            ->where('price', $data['price']);

        if($priceCheck->exists()){
            return [
                'data' => [],
                'status' => 409,
                'message' => 'Tier already exists with this price'
            ];
        }

        $tier = new Tier();
        $tier->tier_id = Uuid::uuid4()->toString();
        $tier->user_id = $userId;
        $tier->title = $data['title'];
        $tier->description = $data['description'];
        $tier->price = $data['price'];
        $tier->save();

        if(isset($data['preview_url']) && !empty($data['preview_url'])) {
            $tier->addMediaFromRequest('preview_url')->toMediaCollection('tiers');
        }

        return [
            'data' => $tier,
            'status' => 200,
            'message' => 'Tier retrieved successfully'
        ];
    }

    public function getTiers(string $user_id): array
    {
        $tierData = Tier::where('user_id', $user_id)->get();
        return [
            'data' => $tierData,
            'status' => 200,
            'message' => 'Tier retrieved successfully'
        ];
    }

    public function showTier(string $tier_id): array
    {
        $tier = Tier::find($tier_id);

        if(!$tier){
            return [
                'data' => [],
                'status' => 404,
                'message' => 'Tier not fount'
            ];
        }

        return [
            'data' => $tier,
            'status' => 200,
            'message' => 'Tier show successfully'
        ];
    }

    public function updateTier(array $data, string $tier_id): array
    {
        $title = $data['title'];
        $description = $data['description'];
        $price = $data['price'];

        $userId = Auth::id();
        $tier = Tier::where('tier_id', $tier_id)->first();

        if(!$tier){
            return [
                'data' => [],
                'status' => 404,
                'message' => 'Tier not fount'
            ];
        }

        if($userId === $tier->user_id){}

        $tier->title = $title;
        $tier->description = $description;
        $tier->price = $price;
        $tier->save();

        if(isset($data['avatar_url']) && $data['avatar_url']){
            $tier->addMediaFromRequest('avatar_url')->toMediaCollection('users');
        }

        return [
            'data' => $tier,
            'status' => 200,
            'message' => 'Tier updated successfully'
        ];
    }

    public function deleteTier($tier_id): array
    {
        $tier = Tier::find($tier_id);

        if(!$tier)
        {
            return [
                'data' => [],
                'status' => 403,
                'message' => 'Forbidden'
            ];
        }

        $tier->delete();

        return [
            'data' => $tier,
            'status' => 200,
            'message' => 'Tier delete successfully'
        ];
    }
}
