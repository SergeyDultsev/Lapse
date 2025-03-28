<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OtpRequest extends FormRequest
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
            'phone' => ['required', 'regex:/^\+?[0-9]{10,15}$/'],
            'otp_code' => "required|min:4"
        ];
    }

    public function messages(): array
    {
        return [
            'phone.required' => 'Phone number is required.',
            'phone.regex' => 'Enter a valid phone number.',
            'otp_code.required' => 'Otp_code is required.',
            'otp_code.min' => 'Otp_code must be at least 4 characters long.',
        ];
    }
}
