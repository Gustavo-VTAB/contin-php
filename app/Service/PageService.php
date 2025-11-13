<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;

class PageService
{
    public function getAllPages()
    {
        return DB::table('fb_pages')
            ->where('deleted', false)
            ->get();
    }

    public function createPage($data)
    {
        DB::statement('CALL sp_insert_fb_page(?, ?, ?, ?, ?, ?, ?)', [
            $data['name'],
            $data['status'] ?? 'active',
            $data['ig_login'] ?? null,
            $data['ig_email'] ?? null,
            $data['ig_password'] ?? null,
            $data['obs'] ?? '',
            auth()->id() ?? 0
        ]);

        return ['message' => 'Página criada com sucesso!'];
    }

    public function updatePage($id, $data)
    {
        DB::statement('CALL sp_update_fb_page(?, ?, ?, ?, ?, ?, ?, ?)', [
            $id,
            $data['name'],
            $data['status'] ?? 'active',
            $data['ig_login'] ?? null,
            $data['ig_email'] ?? null,
            $data['ig_password'] ?? null,
            $data['obs'] ?? '',
            auth()->id() ?? 0
        ]);

        return ['message' => 'Página atualizada com sucesso!'];
    }

    public function destroy($id)
    {
        DB::statement('CALL sp_excluir_fb_page(?, ?)', [
            $id,
            auth()->id() ?? 0
        ]);

        return ['message' => 'Página excluída (soft delete) com sucesso!'];
    }
}
