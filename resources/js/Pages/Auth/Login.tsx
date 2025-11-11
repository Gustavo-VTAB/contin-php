import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
// import { api } from '../../Services/api';
import { toast } from 'sonner';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import api from '../../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // if (!email || !password) {
    //   toast.error('Preencha todos os campos');
    //   return;
    // }

    // try {
    //   setLoading(true);
    //     const res = await api.post('/api/login', { email, password });

    //   if (res.data.success) {
    //     toast.success('Login realizado!');
    //     Inertia.visit('/dashboard'); // navegação SPA-like
    //   } else {
    //     toast.error(res.data.message || 'Login inválido');
    //   }
    // } catch (err: any) {
    //   toast.error(err.message || 'Erro ao logar');
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">FB Manager</h1>
            <p className="text-gray-600">Faça login para continuar</p>
          </div>

          {/* Campos */}
          <div className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-3 pr-3 py-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
