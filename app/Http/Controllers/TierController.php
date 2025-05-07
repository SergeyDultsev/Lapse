<?php

namespace App\Http\Controllers;

use App\Http\Requests\TierRequests;
use App\Http\Resources\TierResource;
use Illuminate\Http\Request;
use App\Services\TierServices;

class TierController extends Controller
{
    protected $tierService;

    /**
     * Конструктор контроллера уровней подписок.
     *
     * Внедряет зависимость TierServices.
     *
     * @param TierServices $userServices Экземпляр уровней подписок.
     */
    public function __construct(TierServices $tierService)
    {
        $this->tierService = $tierService;
    }

    /**
     * Создание уровня подписок
     *
     * @param TierRequests $requests
     * @return object JSON-ответ с данными поста
     */
    public function store(TierRequests $requests): object
    {
        $data = $this->tierService->createTier($requests->all());
        return $this->jsonResponse($data['data'], $data['status'], $data['message']);
    }

    /**
     * Получение уровней подписок пользователя подписки по его ID
     *
     * @param string $tier_id
     * @return object JSON-ответ с данными поста
     */
    public function index(string $user_id): object
    {
        $data = $this->tierService->getTiers($user_id);
        return $this->jsonResponse(
            TierResource::collection($data['data']),
            $data['status'],
            $data['message']);
    }

    /**
     * Получение уровня подписки по его ID
     *
     * @param string $tier_id
     * @return object JSON-ответ с данными поста
     */
    public function show(string $tier_id): object
    {
        $data = $this->tierService->showTier($tier_id);
        return $this->jsonResponse(new TierResource((object) $data['data']), $data['status'], $data['message']);
    }

    /**
     * Редактирование уровня подписки по его ID
     *
     * @param TierRequests $requests
     * @param string $tier_id
     * @return object JSON-ответ с данными поста
     */
    public function update(TierRequests $requests, string $tier_id)
    {
        $data = $this->tierService->updateTier($requests->all(), $tier_id);
        return $this->jsonResponse(new TierResource((object) $data['data']), $data['status'], $data['message']);
    }

    /**
     * Получение уровня подписки по его ID
     *
     * @param string $tier_id
     * @return object JSON-ответ с данными поста
     */
    public function destroy(string $tier_id)
    {
        $data = $this->tierService->deleteTier($tier_id);
        return $this->jsonResponse(new TierResource((object) $data['data']), $data['status'], $data['message']);
    }
}
