<?php

namespace App\Services;

use App\Models\User;
use App\Models\Subscription;
use Illuminate\Support\Facades\Auth;

class UserServices {
    /**
     * Вывод подписчиков пользователя.
     *
     * @param string $user_id идентификатор пользователя.
     * @return array Ответ с данными пользователей.
     */
    public function getSubscriptions(string $user_id): array
    {
        $user = User::where('user_id', $user_id)->firstOrFail();
        $subscriptions = $user->subscriptions()->with('target')->get()->pluck('target'); // т.е. на кого подписан

        return [
            'data' => $subscriptions,
            'status' => 200,
            'message' => 'Subscriptions retrieved successfully',
        ];
    }

    /**
     * Вывод подписок пользователя.
     *
     * @param string $user_id идентификатор пользователя.
     * @return array Ответ с данными пользователей.
     */
    public function getSubscribers(string $user_id): array
    {
        $user = User::where('user_id', $user_id)->firstOrFail();
        $subscribers = $user->subscribers()->with('subscriber')->get()->pluck('subscriber'); // кто подписан

        return [
            'data' => $subscribers,
            'status' => 200,
            'message' => 'Subscribers retrieved successfully',
        ];
    }

    /**
     * Вывод конкретного пользователя.
     *
     * @param string $user_id идентификатор пользователя.
     * @return array Ответ с данными пользователя.
     */
    public function showUser(string $user_id): array
    {
        $user = User::find($user_id);

        if(!$user){
            return [
                'data' => [],
                'status' => 404,
                'message' => 'User not fount'
            ];
        }

        return [
            'data' => $user,
            'status' => 200,
            'message' => 'User show successfully'
        ];
    }

     /**
     * Редактирование пользователя.
     *
     * @param string $data новые данные пользователя.
     * @return array Ответ с данными пользователя.
     */
    public function updateUser(array $data): array
    {
        $name = $data['name'];
        $surname = $data['surname'];
        $about = $data['about'];

        $user = Auth::user();

        if(!$user){
            return [
                'data' => [],
                'status' => 404,
                'message' => 'User not fount'
            ];
        }

        $user->name = $name;
        $user->surname = $surname;
        $user->about = $about;
        $user->save();

        if(isset($data['avatar_url']) && $data['avatar_url']){
            $user->clearMediaCollection('users');
            $user->save();
            $user->addMediaFromRequest('avatar_url')->toMediaCollection('users');
        }

        return [
            'data' => $user,
            'status' => 200,
            'message' => 'User updated successfully'
        ];
    }

    /**
     * Удаление пользователя.
     *
     * @return array Ответ.
     */
    public function deleteUser(): array
    {
        $user = auth::user();

        if(!$user)
        {
            return [
                'data' => [],
                'status' => 403,
                'message' => 'Forbidden'
            ];
        }

        $user->delete();

        return [
            'data' => [],
            'status' => 200,
            'message' => 'User delete successfully'
        ];
    }
}
