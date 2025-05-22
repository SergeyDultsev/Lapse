<?php

namespace App\Http\Controllers;

use App\Models\PurchasedTier;
use App\Models\Tier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class PurchasedTierController extends Controller
{
    public function store(Request $request, string $tier_id): object
    {
        $shopId = env('YOOKASSA_SHOP_ID');
        $secretKey = env('YOOKASSA_SECRET_KEY');

        $description = $request->input('description');
        $return_url = $request->input('return_url');

        $isMyTier = Tier::where('tier_id', $tier_id)->where('user_id', Auth::id())->exists();

        if($isMyTier) {
            return $this->jsonResponse(
                [],
                403,
                'You buy your own subscription');
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

            return $this->jsonResponse(
                $response['confirmation']['confirmation_url'],
                201,
                'Success');
        } else {
            return $this->jsonResponse(
                $response->body(),
                400,
                'Error');
        }
    }
}
