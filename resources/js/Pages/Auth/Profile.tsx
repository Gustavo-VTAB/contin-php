import { useEffect, useState } from "react";
import AppLayout from "@/Layout/AppLayout";
import { Lock, Mail, User, Save, Edit3 } from "lucide-react";
import { loginService } from "./Service/loginService";
import { toast } from "sonner";


export default function ProfilePage() {
  const [user, setUser] = useState<any>({});
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false); // 🔹 controla edição
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect( () => {
    const fetchUser = async () => {
      try{
        const response = await loginService.getProfile();
        setUser(response);
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    };

    fetchUser();
  }, []);

  // 🔹 função para alterar senha sem form
  const handlePasswordChangeClick = async () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      setMessage("Preencha todos os campos!");
      return;
    }

    if (passwordData.new !== passwordData.confirm) {
      setMessage("As senhas novas não coincidem!");
      return;
    }

    try {
      const response  = await loginService.changePassword(user.email, passwordData.new);

      toast.success(response.message);
    } catch (error) {
      toast.error("Erro ao alterar senha!");
    }
    setPasswordData({ current: "", new: "", confirm: "" });
    setIsEditing(false);
  };


  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Cabeçalho */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">Meu Perfil</h1>
          <p className="text-gray-400 text-lg">Visualize e gerencie suas informações</p>
        </div>

        {/* Card principal */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto space-y-8">
          {/* Informações pessoais */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                <User size={24} className="text-blue-500" />
                Informações Pessoais
              </h2>

              {!isEditing ? (
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setMessage(""); // limpa mensagem
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                >
                  <Edit3 size={16} />
                  Editar
                </button>
              ) : (
                <button
                  onClick={handlePasswordChangeClick}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 hover:bg-green-700 rounded-lg text-white"
                >
                  <Save size={16} />
                  Salvar
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome
                </label>
                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="text"
                    value={user.name}
                    readOnly={!isEditing}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 ${
                      !isEditing ? "opacity-70 cursor-not-allowed " : ""
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="email"
                    value={user.email}
                    readOnly={!isEditing}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 ${
                      !isEditing ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Alterar senha */}
          {isEditing && (
            <>
              <hr className="border-gray-800" />

              <div>
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Lock size={24} className="text-blue-500" />
                  Alterar Senha
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Senha atual
                      </label>
                      <input
                        type="password"
                        value={passwordData.current}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, current: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nova senha
                      </label>
                      <input
                        type="password"
                        value={passwordData.new}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, new: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Confirmar nova senha
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirm}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, confirm: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {message && (
                    <p className="text-center text-sm text-blue-400">{message}</p>
                  )}

                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
