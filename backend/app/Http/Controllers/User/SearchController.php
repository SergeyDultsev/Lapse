<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Services\SearchServices;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    protected $searchServices;

    public function __construct(SearchServices $searchServices)
    {
        $this->searchServices = $searchServices;
    }

    public function index(Request $request): object
    {
        $data = $this->searchServices->search($request->all());

        return $this->jsonResponse(
            UserResource::collection($data['data']),
            $data['status'],
            $data['message']);
    }
}
