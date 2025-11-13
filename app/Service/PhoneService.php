<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;

class PhoneService
{
    public function getAllPhones()
    {
        return DB::table('phones')
            ->where('deleted', false)
            ->get();

    }

    public function createPhone($data)
    {
        DB::statement('CALL sp_insert_phone(?, ?, ?, ?, ?, ?, ?)', [
            $data['card_id'] ?? null,
            $data['name'],
            $data['status'] ?? 'active',
            $data['number'] ?? null,
            $data['operator'] ?? null,
            $data['easy_at'] ?? null,
            auth()->id() ?? 0
        ]);

        return ['message' => 'Telefone criado com sucesso!'];
    }

    public function updatePhone($id, $data)
    {
        DB::statement('CALL sp_update_phone(?, ?, ?, ?, ?, ?, ?, ?)', [
            $id,
            $data['card_id'] ?? null,
            $data['name'],
            $data['status'] ?? 'active',
            $data['number'] ?? null,
            $data['operator'] ?? null,
            $data['easy_at'] ?? null,
            auth()->id() ?? 0
        ]);

        return ['message' => 'Telefone atualizado com sucesso!'];
    }

    public function destroy($id)
    {
        DB::statement('CALL sp_excluir_phone(?, ?)', [
            $id,
            auth()->id() ?? 0
        ]);

        return ['message' => 'Telefone excluído (soft delete) com sucesso!'];
    }

}
