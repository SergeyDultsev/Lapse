<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'nullable|string|min:2|max:100',
            'surname' => 'nullable|string|min:2|max:100',
            'phone' => ['required', 'regex:/^\+?[0-9]{10,15}$/'],
            'password' => [
                'required',
                'confirmed',
                'string',
                'min:8',
                'max:100',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Name is required.',
            'name.string' => 'Name must be a string.',
            'name.min' => 'Name must be at least 2 characters long.',
            'name.max' => 'Name cannot exceed 100 characters.',
            'surname.required' => 'Surname is required.',
            'surname.string' => 'Surname must be a string.',
            'surname.min' => 'Surname must be at least 2 characters long.',
            'surname.max' => 'Surname cannot exceed 100 characters.',
            'phone.required' => 'Phone number is required.',
            'phone.regex' => 'Enter a valid phone number (it may start with +).',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least 8 characters long.',
            'password.max' => 'Password cannot exceed 100 characters.',
            'password.confirmed' => 'Passwords do not match.',
        ];
    }
}
