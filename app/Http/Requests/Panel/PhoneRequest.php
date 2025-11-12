<?php

namespace App\Http\Requests\Panel;

use Illuminate\Foundation\Http\FormRequest;

class PhoneRequest extends FormRequest
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
            'card_id' => 'integer',
            'name' => 'string|max:255',
            'status' => 'string|max:255',
            'number' => 'string|max:255',
            'operator' => 'string|max:255',
            'easy_at' => 'string|max:255',
        ];
    }
}
