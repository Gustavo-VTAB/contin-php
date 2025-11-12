import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { router } from '@inertiajs/react';
import { loginService } from '@/Pages/Auth/Service/loginService';
export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [blocked, setBlocked] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await loginService.login(formData);
      console.log(response);

      if(response.message === 'Usuário bloqueado.'){
        setBlocked(true);
        return;
      }

      if(response.success === true){
        localStorage.setItem('user', response.user);
        router.visit('/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlocked = async () => {
    try {
      const response = await loginService.resetBlocked(formData.email);
      console.log(response);

      if(response.success === true){
        setBlocked(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-gray-900 to-blue-950 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">FB Manager</h1>
          <p className="text-gray-400">Sistema de Gerenciamento</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Entrar</h2>

          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-600 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-300">Lembrar-me</span>
              </label>
              <a href="#" className="text-sm text-blue-500 hover:text-blue-400">
                Esqueceu a senha?
              </a>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={blocked}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:text-gray-500 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Entrar
            </button>

            {blocked && (
              <button
                onClick={handleBlocked}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Desbloquear
              </button>
            )}
            
          </div>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Não tem uma conta?{' '}
            <a onClick={() => router.visit("/register")} className="text-blue-500 hover:text-blue-400 font-medium">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}