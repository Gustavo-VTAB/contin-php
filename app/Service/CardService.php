<?php
namespace App\Service;

use Illuminate\Support\Facades\DB;

class CardService
{
    public function getAllCards()
    {
        return DB::table('cards')
            ->where('deleted', false)
            ->get();
    }

    public function createCard($data)
    {
        DB::statement('CALL sp_insert_card(?, ?, ?, ?, ?, ?, ?, ?)', [
            $data['status'] ?? 'active',
            $data['name'],
            $data['number'] ?? null,
            $data['validity'] ?? null,
            $data['cvv'] ?? null,
            $data['limit'] ?? null,
            $data['obs'] ?? '',
            auth()->id() ?? 0
        ]);

        return ['message' => 'Cartão criado com sucesso!'];
    }

    public function updateCard($id, $data)
    {
        DB::statement('CALL sp_update_card(?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            $id,
            $data['status'] ?? 'active',
            $data['name'],
            $data['number'] ?? null,
            $data['validity'] ?? null,
            $data['cvv'] ?? null,
            $data['limit'] ?? null,
            $data['obs'] ?? '',
            auth()->id() ?? 0
        ]);

        return ['message' => 'Cartão atualizado com sucesso!'];
    }

    public function deleteCard($id)
    {
         DB::statement('CALL sp_excluir_card(?, ?)', [
            $id,
            auth()->id() ?? 0
        ]);
        return ['message' => 'Cartão excluído (soft delete) com sucesso!'];


    }
}
