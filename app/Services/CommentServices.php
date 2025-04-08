<?php

namespace App\Services;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Ramsey\Uuid\Uuid;

class CommentServices{
    /**
     * Создание комментария
     * 
     * @param array $data данные комментария.
     * @return array созданный комментарий.
     */
    public function createComment(array $data, string $post_id): array
    {
        $post = Post::find($post_id);
        $user_id = Auth::id();

        if(!$post) {
            return [
                'data' => [],
                'status' => 404,
                'message' => 'Post Not Fount', 
            ];
        }
        
        $comment = new Comment();
        $comment->comment_id = Uuid::uuid4()->toString();
        $comment->post_id = $post->post_id;
        $comment->user_id = $user_id;
        $comment->target_comment_id = $data['target_comment_id'];
        $comment->content = $data['content'];
        $comment->save();
        $comment->load('user');

        $post->comment_count += 1;
        $post->save();

        return [
            'data' => $comment,
            'status' => 201,
            'message' => 'Comment successfully created',
        ];
    }

    /**
     * Получение комментариев поста
     * 
     * @param string $post_id идентификатор поста.
     * @return array комментарий.
     */
    public function indexComment(string $post_id): array
    {
        $post = Post::find($post_id);
        $comments = $post->comments;
        $kids = $post->comments->load("kids");

        if($comments->isEmpty()) {
            return [
                'data' => [],
                'status' => 404,
                'message' => 'Comment Not Fount', 
            ];
        }
        
        return [
            'data' => $comments,
            'status' => 201,
            'message' => 'Comment successfully created',
        ];
    }
}