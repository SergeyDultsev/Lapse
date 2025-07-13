<?php

namespace App\Http\Controllers;

abstract class Controller
{
    /**
     * Формирует JSON-ответ.
     *
     * @param array|object|null $data Данные для ответа.
     * @param int $status HTTP-статус ответа.
     * @param string $message Описание результата.
     * @return JsonResponse JSON-ответ.
     */
    protected function jsonResponse($data, int $status, string $message): object
    {
        return response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data,
        ], $status);
    }
}
