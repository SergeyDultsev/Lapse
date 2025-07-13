<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'target_comment_id' => 'nullable|string',
            'content' => 'required|string'
        ];
    }

    public function messages(): array
    {
        return [
            'target_comment_id.string' => 'target_comment_id must be a string.',
            'content.required' => 'Content is required.',
            'content.string' => 'Content is must be a string.',
        ];
    }
}
