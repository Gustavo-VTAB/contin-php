<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;

class BmService
{
    public function getAllBms()
    {
        return DB::table('fb_bms')
            ->where('deleted', false)
            ->get();
    }

    public function createBm($data)
    {
        DB::statement('CALL sp_insert_fb_bm(?, ?, ?, ?)', [
            $data['name'],
            $data['status'] ?? 'active',
            $data['obs'] ?? '',
            auth()->id() ?? 0
        ]);

        return ['message' => 'Business Manager criado com sucesso!'];
    }

    public function updateBm($id, $data)
    {
        DB::statement('CALL sp_update_fb_bm(?, ?, ?, ?, ?)', [
            $id,
            $data['name'],
            $data['status'] ?? 'active',
            $data['obs'] ?? '',
            auth()->id() ?? 0
        ]);

        return ['message' => 'Business Manager atualizado com sucesso!'];
    }

    public function deleteBm($id)
    {
        DB::statement('CALL sp_excluir_fb_bm(?, ?)', [
            $id,
            auth()->id() ?? 0
        ]);

        return ['message' => 'Business Manager excluído (soft delete) com sucesso!'];
    }
}
