<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    public function login(Request $request)
    {
       $email = addslashes($request->input('email'));
        $password = addslashes($request->input('password'));

        if($email === null || $password === null){
            return response()->json([
                'success' => false,
                'message' => 'Email e senha são obrigatórios'
            ]);
        }

        try {
            // cria tabela temporária de mensagem
            DB::statement("CREATE TEMP TABLE IF NOT EXISTS temp_msg (mensagem TEXT);");
            DB::statement("TRUNCATE temp_msg;");

            // monta o bloco DO $$ com as variáveis injetadas
            $sql = "
                DO $$
                DECLARE 
                    v_msg TEXT;
                BEGIN
                    CALL sp_valida_login('$email', '$password', v_msg);
                    INSERT INTO temp_msg VALUES (v_msg);
                END$$;
            ";

            DB::statement($sql);

            // lê a mensagem
            $msgResult = DB::selectOne("SELECT mensagem FROM temp_msg LIMIT 1");
            $mensagem = $msgResult->mensagem ?? 'Erro ao obter mensagem.';

            // se login válido, autentica o usuário
            if ($mensagem === 'Login válido.') {
                $user = DB::table('users')->where('email', $email)->first();
                if ($user) {
                    Auth::loginUsingId($user->id);
                    return response()->json([
                        'success' => true,
                        'message' => $mensagem,
                        'user' => $user
                    ]);
                }
            }

            return response()->json([
                'success' => false,
                'message' => $mensagem
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro no login: ' . $e->getMessage()
            ]);
        }
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['success' => true, 'message' => 'Logout realizado com sucesso.']);
    }

    public function resetBlocked(Request $request)
    {
        $email = addslashes($request->input('email'));
        
        if($email === null){
            return response()->json([
                'success' => false,
                'message' => 'Email é obrigatório'
            ]);
        }

        try {
            DB::statement("CREATE TEMP TABLE IF NOT EXISTS temp_msg (mensagem TEXT); ");
            DB::statement("TRUNCATE temp_msg; ");
            

            $sql = "
                DO $$
                DECLARE 
                    v_msg TEXT;
                BEGIN
                    CALL sp_desbloquear_usuario('$email', v_msg);
                    INSERT INTO temp_msg VALUES (v_msg);
                END$$;
            ";

            DB::statement($sql);

            $msgResult = DB::selectOne("SELECT mensagem FROM temp_msg LIMIT 1");
            $mensagem = $msgResult->mensagem ?? 'Erro ao obter mensagem.';
            
            if($mensagem){
                return response()->json([
                    'success' => true,
                    'message' => $mensagem ? $mensagem : 'operação concluida com sucesso.'
                ]);
            }

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao resetar bloqueio: ' . $e->getMessage()
            ]);
        }
    }

    public function getProfile()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Usuário não autenticado'], 401);
        }

        return response()->json($user);
    }

  public function changePassword(Request $request)
{
    $email = addslashes($request->input('email'));
    $password = addslashes($request->input('newPassword'));

    if ($email === null || $password === null) {
        return response()->json([
            'success' => false,
            'message' => 'Email e nova senha são obrigatórios.'
        ]);
    }

    try {
        // cria tabela temporária
        DB::statement("CREATE TEMP TABLE IF NOT EXISTS temp_msg (mensagem TEXT);");
        DB::statement("TRUNCATE temp_msg;");

        // executa procedure com variável de saída
        $sql = "
            DO $$
            DECLARE 
                v_msg TEXT;
            BEGIN
                CALL sp_trocar_senha('$email', '$password', v_msg);
                INSERT INTO temp_msg VALUES (v_msg);
            END$$;
        ";

        DB::statement($sql);

        // lê a mensagem
        $msgResult = DB::selectOne("SELECT mensagem FROM temp_msg LIMIT 1");
        $mensagem = $msgResult->mensagem ?? 'Erro ao obter mensagem.';

        return response()->json([
            'success' => true,
            'message' => $mensagem
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erro ao trocar senha: ' . $e->getMessage()
        ], 500);
    }
}


}