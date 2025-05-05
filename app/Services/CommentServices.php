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

        $post->increment('comment_count');
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
        $post->comments->load("kids");

        if($comments->isEmpty()) {
            return [
                'data' => [],
                'status' => 404,
                'message' => 'Comment Not Fount', 
            ];
        }
        
        return [
            'data' => $comments,
            'status' => 200,
            'message' => 'Comment successfully received',
        ];
    }

    /**
     * Удаление комментария
     * 
     * @param string $comment_id идентификатор комментария.
     * @return array созданный комментарий.
     */
    public function deleteComment(string $comment_id): array
    {
        $comment = Comment::find($comment_id);

        if (!$comment) {
            return [
                'data' => [],
                'status' => 404,
                'message' => 'Comment not found',
            ];
        }

        $user = Auth::user();
        $post = Post::where('post_id', $comment->post_id)->where('user_id', $user->user_id);

        if (!$post) {
            return [
                'data' => [],
                'status' => 403,
                'message' => 'Access denied to this post',
            ];
        }    

        $comment->delete();
        $post->decrement('comment_count');

        return [
            'data' => $comment,
            'status' => 200,
            'message' => 'Comment successfully deleted',
        ];
    }
}