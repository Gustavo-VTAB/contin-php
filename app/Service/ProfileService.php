<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;

class ProfileService
{
    public function getAllProfiles()
    {
         return DB::table('fb_profiles')
            ->where('deleted', false)
            ->get();
    }

    public function createProfile($data)
    {
        DB::statement('CALL sp_insert_fb_profile(?, ?, ?, ?, ?)', [
            $data['name'],
            $data['phone_id'] ?? null,
            $data['status'] ?? 'active',
            $data['obs'] ?? '',
            auth()->id() ?? 0
        ]);

        return ['message' => 'Perfil criado com sucesso!'];
    }

    public function updateProfile($id, $data)
    {
        DB::statement('CALL sp_update_fb_profile(?, ?, ?, ?, ?, ?)', [
            $id,
            $data['name'],
            $data['phone_id'] ?? null,
            $data['status'] ?? 'active',
            $data['obs'] ?? '',
            auth()->id() ?? 0
        ]);

        return ['message' => 'Perfil atualizado com sucesso!'];
    }

     public function deleteProfile($id)
    {
        DB::statement('CALL sp_excluir_fb_profile(?, ?)', [
            $id,
            auth()->id() ?? 0
        ]);

        return ['message' => 'Perfil excluído (soft delete) com sucesso!'];
    }
}
