<?php

namespace App\Http\Controllers\Tier;

use App\Http\Controllers\Controller;
use App\Http\Requests\TierRequests;
use App\Http\Resources\TierResource;
use App\Services\TierServices;

class TierController extends Controller
{
    protected $tierService;

    public function __construct(TierServices $tierService)
    {
        $this->tierService = $tierService;
    }

    public function store(TierRequests $requests): object
    {
        $data = $this->tierService->createTier($requests->all());
        return $this->jsonResponse($data['data'], $data['status'], $data['message']);
    }

    public function index(string $user_id): object
    {
        $data = $this->tierService->getTiers($user_id);
        return $this->jsonResponse(
            TierResource::collection($data['data']),
            $data['status'],
            $data['message']);
    }

    public function show(string $tier_id): object
    {
        $data = $this->tierService->showTier($tier_id);
        return $this->jsonResponse(new TierResource((object) $data['data']), $data['status'], $data['message']);
    }

    public function update(TierRequests $requests, string $tier_id)
    {
        $data = $this->tierService->updateTier($requests->all(), $tier_id);
        return $this->jsonResponse(new TierResource((object) $data['data']), $data['status'], $data['message']);
    }

    public function destroy(string $tier_id)
    {
        $data = $this->tierService->deleteTier($tier_id);
        return $this->jsonResponse(new TierResource((object) $data['data']), $data['status'], $data['message']);
    }
}
