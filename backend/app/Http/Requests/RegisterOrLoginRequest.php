<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterOrLoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'nullable|string|min:2|max:100',
            'surname' => 'nullable|string|min:2|max:100',
            'email' => 'nullable',
            'password' => 'nullable|string|min:8|max:100',
            'otp_code' => "required|min:4"
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
            'email.required' => 'Email is required',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'This email is already registered.',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least 8 characters long.',
            'password.max' => 'Password cannot exceed 100 characters.',
            'otp_code.required' => 'Otp_code is required.',
            'otp_code.min' => 'Otp_code must be at least 4 characters long.',
        ];
    }
}
