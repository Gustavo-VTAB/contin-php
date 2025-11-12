import { useState } from 'react';
import AppLayout from '@/Layout/AppLayout';
import Modal from '@/components/Modal';
import StatusBadge from '@/components/StatusBadge';
import { Plus, Edit, Eye, Trash2, Search } from 'lucide-react';

interface Page {
  id: number;
  name: string;
  ig_login: string;
  ig_email: string;
  ig_password: string;
  status: string;
  obs: string;
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([
    { id: 1, name: 'Página Loja Online', ig_login: '@lojavirtual', ig_email: 'loja@example.com', ig_password: '********', status: 'active', obs: 'Página integrada com Instagram' },
    { id: 2, name: 'Página de Teste', ig_login: '@testepage', ig_email: 'teste@example.com', ig_password: '********', status: 'inactive', obs: 'Página em modo de teste' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    ig_login: '',
    ig_email: '',
    ig_password: '',
    status: 'active',
    obs: '',
  });

  const handleOpenModal = (mode: 'create' | 'edit' | 'view', page?: Page) => {
    setModalMode(mode);
    if (page) {
      setSelectedPage(page);
      setFormData({
        name: page.name,
        ig_login: page.ig_login,
        ig_email: page.ig_email,
        ig_password: page.ig_password,
        status: page.status,
        obs: page.obs,
      });
    } else {
      setFormData({ name: '', ig_login: '', ig_email: '', ig_password: '', status: 'active', obs: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'create') {
      const newPage: Page = {
        id: pages.length + 1,
        ...formData,
      };
      setPages([...pages, newPage]);
    } else if (modalMode === 'edit' && selectedPage) {
      setPages(pages.map(p => p.id === selectedPage.id ? { ...p, ...formData } : p));
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta página?')) {
      setPages(pages.filter(p => p.id !== id));
    }
  };

  const filteredPages = pages.filter(page =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.ig_login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Páginas do Facebook</h1>
            <p className="text-gray-400 mt-1">Gerencie as páginas cadastradas</p>
          </div>
          <button
            onClick={() => handleOpenModal('create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            Nova Página
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar páginas..."
            className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Instagram Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{page.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{page.ig_login}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{page.ig_email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={page.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleOpenModal('view', page)} className="text-blue-500 hover:text-blue-400">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => handleOpenModal('edit', page)} className="text-green-500 hover:text-green-400">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(page.id)} className="text-red-500 hover:text-red-400">
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

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={modalMode === 'create' ? 'Nova Página' : modalMode === 'edit' ? 'Editar Página' : 'Visualizar Página'}
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nome da Página</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Instagram Login</label>
                <input
                  type="text"
                  value={formData.ig_login}
                  onChange={(e) => setFormData({ ...formData, ig_login: e.target.value })}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
                  placeholder="@usuario"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Instagram Email</label>
                <input
                  type="email"
                  value={formData.ig_email}
                  onChange={(e) => setFormData({ ...formData, ig_email: e.target.value })}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Instagram Senha</label>
                <input
                  type="password"
                  value={formData.ig_password}
                  onChange={(e) => setFormData({ ...formData, ig_password: e.target.value })}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Observações</label>
              <textarea
                value={formData.obs}
                onChange={(e) => setFormData({ ...formData, obs: e.target.value })}
                disabled={modalMode === 'view'}
                rows={3}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
              />
            </div>
            {modalMode !== 'view' && (
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {modalMode === 'create' ? 'Criar' : 'Salvar'}
                </button>
              </div>
            )}
          </form>
        </Modal>
      </div>
    </AppLayout>
  );
}