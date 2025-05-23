<?php

namespace App\Services;

use App\Models\PurchasedTier;
use App\Models\Tier;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class PurchasedTierServices{
    public function createPurchasedTier(array $data, string $tier_id): array
    {
        $shopId = env('YOOKASSA_SHOP_ID');
        $secretKey = env('YOOKASSA_SECRET_KEY');

        $description = $data['description'];
        $return_url = $data['return_url'];

        $isMyTier = Tier::where('tier_id', $tier_id)->where('user_id', Auth::id())->exists();

        if($isMyTier) {
            return [
                [],
                403,
                'You buy your own subscription'
            ];
        }

        $tier = Tier::where('tier_id', $tier_id)->first();

        if (!$tier) return $this->jsonResponse([], 404, 'Tier not found');

        $response = Http::withBasicAuth($shopId, $secretKey)
            ->withHeaders([
                'Idempotence-Key' => uniqid('', true),
                'Content-Type' => 'application/json',
                'accept' => 'application/json',
            ])
            ->post('https://api.yookassa.ru/v3/payments', [
                'amount' => [
                    'value' => number_format((float)$tier->price, 2, '.', ''),
                    'currency' => 'RUB',
                ],
                'confirmation' => [
                    'type' => 'redirect',
                    'return_url' => $return_url,
                ],
                'description' => $description,
            ]);

        if($response->successful()){
            $purchasedTier = new PurchasedTier();
            $purchasedTier->purchased_tier_id = $response->json()['id'];
            $purchasedTier->tier_id = $tier_id;
            $purchasedTier->user_id = Auth::id();
            $purchasedTier->save();

            return [
                $response['confirmation']['confirmation_url'],
                201,
                'Success'
            ];
        } else {
            return [
                $response->body(),
                400,
                'Error'
            ];
        }
    }

    public function confirmPurchasedTier(array $data): array
    {
        // TODO
        return [];
    }
}
