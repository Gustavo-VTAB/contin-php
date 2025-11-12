<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;

class ProfileService
{
    public function getAllProfiles()
    {
        return DB::table('fb_profiles')->get();
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
        $oldData = DB::table('fb_profiles')->where('id', $id)->first();

        DB::table('fb_profiles')->where('id', $id)->delete();

        DB::table('logs')->insert([
            'user_id' => auth()->id() ?? 0,
            'table_name' => 'fb_profiles',
            'record_id' => $id,
            'action' => 'DELETE',
            'old_data' => json_encode($oldData),
            'created_at' => now(),
        ]);

        return ['message' => 'Perfil deletado com sucesso!'];
    }
}
