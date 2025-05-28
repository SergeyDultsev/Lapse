<?php

namespace App\Services;

use App\Models\PurchasedTier;
use App\Models\Tier;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Ramsey\Uuid\Uuid;

class PurchasedTierServices{
    public function createPurchasedTier(array $data, string $tier_id): array
    {
        $shopId = env('YOOKASSA_SHOP_ID');
        $secretKey = env('YOOKASSA_SECRET_KEY');

        $description = $data['description'];
        $return_url = $data['return_url'];

        $isMyTier = Tier::where('tier_id', $tier_id)->where('user_id', Auth::id())->exists();

        if($isMyTier) return ['data' => [], 'status' => 403, 'message' => 'You buy your own tier'];

        $tier = Tier::where('tier_id', $tier_id)->first();

        if (!$tier) return $this->jsonResponse([], 404, 'Tier not found');

        $purchasedTierId = Uuid::uuid4()->toString();

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
                'metadata' => [
                    'purchased_tier_id' => $purchasedTierId,
                    'user_id' => Auth::id(),
                    'tier_id' => $tier_id,
                ],
            ]);

        if($response->successful()){
            $purchasedTier = new PurchasedTier();
            $purchasedTier->purchased_tier_id = $purchasedTierId;
            $purchasedTier->yookassa_id = $response->json()['id'];
            $purchasedTier->tier_id = $tier_id;
            $purchasedTier->user_id = Auth::id();
            $purchasedTier->save();

            return [
                'data' => $response['confirmation']['confirmation_url'],
                'status' => 201,
                'message' => 'PurchasedTier successfully created'
            ];
        } else {
            return [
                'data' => $response->body(),
                'status' => 400,
                'message' => 'PurchasedTier failed created'
            ];
        }
    }

    public function confirmPurchasedTier(array $data): array
    {
        $event = $data['event'];
        $object = $data['object'];

        if ($event === 'payment.succeeded') {
            $metadata = $object['metadata'];
            $purchasedTierId = $metadata['purchased_tier_id'];

            $purchasedTier = PurchasedTier::find($purchasedTierId);
            if ($purchasedTier) {
                $purchasedTier->status = true;
                $purchasedTier->save();
            }
        }

        return [
            'data' => [],
            'status' => 200,
            'message' => 'PurchasedTier status successfully changed'
        ];
    }
}
