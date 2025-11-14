<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;

class ProfileService
{
    public function getAllProfiles()
    {
        return DB::table('fb_profiles')
            ->leftJoin('phones', 'fb_profiles.phone_id', '=', 'phones.id')
            ->where('fb_profiles.deleted', false)
            ->select(
                'fb_profiles.*',

                // Dados do telefone
                'phones.number as phone_number',
                'phones.name as phone_name',
                'phones.status as phone_status',
                'phones.operator as phone_operator',
                'phones.easy_at as phone_easy_at',
                'phones.id as phone_id'
            )
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
