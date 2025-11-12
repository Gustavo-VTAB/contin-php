<?php

namespace App\Http\Requests\Panel;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
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
            'phone_id' => 'integer|nullable',
            'status' => 'string|max:255',
            'obs' => 'string|max:255|nullable',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O campo nome é obrigatório.',
            'phone_id.required' => 'O campo telefone é obrigatório.',
            'status.required' => 'O campo status é obrigatório.',
            'obs.required' => 'O campo observação é obrigatório.',
        ];
    }
}
