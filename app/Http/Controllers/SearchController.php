<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = trim($request->query('query', ''));

        if (strlen($query) === 0) {
            return $this->jsonResponse([], 400, 'Search query is empty');
        }

        $userData = User::where(function ($q) use ($query) {
            $q->where('name', 'like', "%{$query}%")
                ->orWhere('surname', 'like', "%{$query}%");
        })->get();

        if(empty($userData)){
            return $this->jsonResponse(
                [],
                200,
                'Success');
        }

        return $this->jsonResponse(
            UserResource::collection($userData),
            200,
            'Succes');
    }
}
