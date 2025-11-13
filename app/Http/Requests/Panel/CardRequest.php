<?php

namespace App\Http\Requests\Panel;

use Illuminate\Foundation\Http\FormRequest;

class CardRequest extends FormRequest
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
            'number' => 'string|max:255',
            'validity' => 'string|max:255',
            'cvv' => 'string|max:10',
            'limit' => 'numeric',
            'obs' => 'string|max:1000|nullable',
        ];
    }

    public function messages()
    {
        return [
            'name.string' => 'O nome do cartão deve ser uma string.',
            'name.max' => 'O nome do cartão não pode exceder 255 caracteres.',
            'number.string' => 'O número do cartão deve ser uma string.',
            'number.max' => 'O número do cartão não pode exceder 255 caracteres.',
            'validity.string' => 'A validade do cartão deve ser uma string.',
            'validity.max' => 'A validade do cartão não pode exceder 255 caracteres.',
            'cvv.string' => 'O CVV do cartão deve ser uma string.',
            'cvv.max' => 'O CVV do cartão não pode exceder 10 caracteres.',
            'limit.numeric' => 'O limite do cartão deve ser um número.',
            'obs.string' => 'A observação deve ser uma string.',
            'obs.max' => 'A observação não pode exceder 1000 caracteres.',
        ];
    }
}
