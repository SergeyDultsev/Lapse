<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tier_id' => 'nullable|string',
            'title' => 'required|string',
            'content' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'tier_id.string' => 'tier_id must be a string.',
            'title.required' => 'Title is required.',
            'content.required' => 'Content is required.',
        ];
    }
}
