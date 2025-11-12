import { useEffect, useState } from 'react';
import AppLayout from '@/Layout/AppLayout';
import Modal from '../../components/Modal';
import StatusBadge from '../../components/StatusBadge';
import { Plus, Edit, Eye, Trash2, Search } from 'lucide-react';
import { profileService } from './service/profileService';

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
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await profileService.getAllProfiles();
      setProfiles(response.data);
    };
    
    fetchProfiles();
  }, []);

  const mockPhones = [
    { id: 1, number: '(11) 98765-4321' },
    { id: 2, number: '(11) 91234-5678' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  // Dados temporários do modal
  const [tempData, setTempData] = useState({
    name: '',
    manager_id: '',
    phone_id: '',
    status: 'active',
    obs: '',
  });

  const handleOpenModal = (mode: 'create' | 'edit' | 'view', profile?: Profile) => {
    setModalMode(mode);
    if (profile) {
      setSelectedProfile(profile);
      setTempData({
        name: profile.name,
        manager_id: profile.manager_id?.toString() || '',
        phone_id: profile.phone_id?.toString() || '',
        status: profile.status,
        obs: profile.obs,
      });
    } else {
      setSelectedProfile(null);
      setTempData({ name: '', manager_id: '', phone_id: '', status: 'active', obs: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProfile(null);
  };

  const handleSave = () => {
    const managerId = tempData.manager_id ? parseInt(tempData.manager_id) : null;
    const phoneId = tempData.phone_id ? parseInt(tempData.phone_id) : null;
    const managerName = managerId ? mockManagers.find(m => m.id === managerId)?.name : undefined;
    const phoneNumber = phoneId ? mockPhones.find(p => p.id === phoneId)?.number : undefined;

    if (modalMode === 'create') {
      const newProfile: Profile = {
        id: profiles.length + 1,
        name: tempData.name,
        manager_id: managerId,
        manager_name: managerName,
        phone_id: phoneId,
        phone_number: phoneNumber,
        status: tempData.status,
        obs: tempData.obs,
      };
      setProfiles([...profiles, newProfile]);
    } else if (modalMode === 'edit' && selectedProfile) {
      setProfiles(
        profiles.map(p =>
          p.id === selectedProfile.id
            ? {
                ...p,
                name: tempData.name,
                manager_id: managerId,
                manager_name: managerName,
                phone_id: phoneId,
                phone_number: phoneNumber,
                status: tempData.status,
                obs: tempData.obs,
              }
            : p
        )
      );
    }
    handleCloseModal();
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

        {/* Modal com botões (sem <form>) */}
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
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Nome</label>
                <input
                  type="text"
                  value={tempData.name}
                  onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Manager</label>
                <select
                  value={tempData.manager_id}
                  onChange={(e) => setTempData({ ...tempData, manager_id: e.target.value })}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white disabled:opacity-50"
                >
                  <option value="">Nenhum</option>
                  {mockManagers.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Telefone</label>
                <select
                  value={tempData.phone_id}
                  onChange={(e) => setTempData({ ...tempData, phone_id: e.target.value })}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white disabled:opacity-50"
                >
                  <option value="">Nenhum</option>
                  {mockPhones.map((p) => (
                    <option key={p.id} value={p.id}>{p.number}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                <select
                  value={tempData.status}
                  onChange={(e) => setTempData({ ...tempData, status: e.target.value })}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white disabled:opacity-50"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Observações</label>
              <textarea
                value={tempData.obs}
                onChange={(e) => setTempData({ ...tempData, obs: e.target.value })}
                disabled={modalMode === 'view'}
                rows={3}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white disabled:opacity-50"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancelar
              </button>
              {modalMode !== 'view' && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {modalMode === 'create' ? 'Criar' : 'Salvar'}
                </button>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </AppLayout>
  );
}
