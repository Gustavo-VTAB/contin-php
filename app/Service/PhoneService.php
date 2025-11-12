<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;

class PhoneService
{
    public function getAllPhones()
    {
        return DB::table('phones')->get();
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

    public function deletePhone($id)
    {
        $oldData = DB::table('phones')->where('id', $id)->first();

        DB::table('phones')->where('id', $id)->delete();

        DB::table('logs')->insert([
            'user_id' => auth()->id() ?? 0,
            'table_name' => 'phones',
            'record_id' => $id,
            'action' => 'DELETE',
            'old_data' => json_encode($oldData),
            'created_at' => now(),
        ]);

        return ['message' => 'Telefone deletado com sucesso!'];
    }
}
