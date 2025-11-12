import { useState } from 'react';
import AppLayout from '@/Layout/AppLayout';
import Modal from '../../components/Modal';
import StatusBadge from '../../components/StatusBadge';
import { Plus, Edit, Eye, Trash2, Search } from 'lucide-react';

interface Profile {
  id: number;
  name: string;
  manager_id: number | null;
  manager_name?: string;
  phone_id: number | null;
  phone_number?: string;
  status: string;
  obs: string;
}

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([
    { id: 1, name: 'João Silva', manager_id: 1, manager_name: 'Manager Principal', phone_id: 1, phone_number: '(11) 98765-4321', status: 'active', obs: 'Perfil principal' },
    { id: 2, name: 'Maria Santos', manager_id: null, phone_id: 2, phone_number: '(11) 91234-5678', status: 'active', obs: '' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const handleOpenModal = (mode: 'create' | 'edit' | 'view', profile?: Profile) => {
    setModalMode(mode);
    if (profile) setSelectedProfile(profile);
    else setSelectedProfile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProfile(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este perfil?')) {
      setProfiles(profiles.filter(p => p.id !== id));
    }
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Perfis do Facebook</h1>
            <p className="text-gray-400 mt-1">Gerencie os perfis cadastrados</p>
          </div>
          <button
            onClick={() => handleOpenModal('create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            Novo Perfil
          </button>
        </div>

        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar perfis..."
            className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Tabela */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Manager</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Telefone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredProfiles.map((profile) => (
                  <tr key={profile.id} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{profile.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{profile.manager_name || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{profile.phone_number || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={profile.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleOpenModal('view', profile)} className="text-blue-500 hover:text-blue-400">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => handleOpenModal('edit', profile)} className="text-green-500 hover:text-green-400">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(profile.id)} className="text-red-500 hover:text-red-400">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal sem form */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={
            modalMode === 'create'
              ? 'Novo Perfil'
              : modalMode === 'edit'
              ? 'Editar Perfil'
              : 'Detalhes do Perfil'
          }
        >
          {selectedProfile ? (
            <div className="space-y-3 text-gray-300">
              <p><strong>Nome:</strong> {selectedProfile.name}</p>
              <p><strong>Manager:</strong> {selectedProfile.manager_name || '-'}</p>
              <p><strong>Telefone:</strong> {selectedProfile.phone_number || '-'}</p>
              <p><strong>Status:</strong> <StatusBadge status={selectedProfile.status} /></p>
              <p><strong>Observações:</strong> {selectedProfile.obs || '-'}</p>
            </div>
          ) : (
            <div className="text-gray-400">
              {modalMode === 'create'
                ? 'Função de criação desativada (formulário removido).'
                : 'Nenhum perfil selecionado.'}
            </div>
          )}

          <div className="flex justify-end mt-6">
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Fechar
            </button>
          </div>
        </Modal>
      </div>
    </AppLayout>
  );
}
