<?php

namespace App\Service;

use App\Models\Log;
use Carbon\Carbon;

class LogService
{
    /**
     * Retorna todos os logs com filtros opcionais
     */
    public function getLogs($filters = [])
    {
        $query = Log::query();

        // 🔍 Filtrar por usuário
        if (!empty($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }

        // 🔍 Filtrar por tabela (ex: fb_profiles)
        if (!empty($filters['table_name'])) {
            $query->where('table_name', $filters['table_name']);
        }

        // 🔍 Filtrar por tipo de ação (INSERT, UPDATE, SOFT_DELETE_TRIGGER, etc.)
        if (!empty($filters['action'])) {
            $query->where('action', $filters['action']);
        }

        // 🔍 Filtrar por intervalo de datas
        if (!empty($filters['date_start'])) {
            $query->whereDate('created_at', '>=', Carbon::parse($filters['date_start']));
        }

        if (!empty($filters['date_end'])) {
            $query->whereDate('created_at', '<=', Carbon::parse($filters['date_end']));
        }

        // Ordenar por data mais recente
        return $query->orderBy('created_at', 'desc')->get();
    }

    /**
     * Retorna um log específico pelo ID
     */
    public function getLogById($id)
    {
        return Log::find($id);
    }
}
