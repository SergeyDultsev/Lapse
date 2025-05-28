<?php

namespace App\Http\Controllers\Tier;

use App\Http\Controllers\Controller;
use App\Services\PurchasedTierServices;
use Illuminate\Http\Request;

class PurchasedTierController extends Controller
{
    protected $purchasedTierServices;

    public function __construct(PurchasedTierServices $purchasedTierServices)
    {
        $this->purchasedTierServices = $purchasedTierServices;
    }

    public function store(Request $request, string $tier_id): object
    {
        $data = $this->purchasedTierServices->createPurchasedTier($request->all(), $tier_id);
        return $this->jsonResponse($data['data'], $data['status'], $data['message']);
    }

    public function update(Request $request): object
    {
        $data = $this->purchasedTierServices->confirmPurchasedTier($request->all());
        return $this->jsonResponse($data['data'], $data['status'], $data['message']);
    }
}
