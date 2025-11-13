<?php

namespace App\Http\Requests\Panel;

use Illuminate\Foundation\Http\FormRequest;

class PageRequest extends FormRequest
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
            'name' => 'string|max:255',
            'ig_login' => 'string|max:255',
            'ig_email' => 'string|max:255',
            'ig_password' => 'string|max:255',
            'obs' => 'string|max:255|nullable',
            'status' => 'string|max:255',
        ];
    }
}
