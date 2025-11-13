import { useEffect, useState } from 'react';
import AppLayout from '@/Layout/AppLayout';
import Modal from '@/components/Modal';
import StatusBadge from '@/components/StatusBadge';
import { Plus, Edit, Eye, Trash2, Search } from 'lucide-react';
import type { Page } from '@/types';
import { pageService } from './Service/pageService';
import { toast } from 'sonner';

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  const [tempData, setTempData] = useState({
    name: '',
    ig_login: '',
    ig_email: '',
    ig_password: '',
    status: 'active',
    obs: '',
  });

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await pageService.getAllPages();
        setPages(response);
      } catch (error) {
        console.error('Erro ao buscar páginas:', error);
      }
    };
    fetchPages();
  }, []);

  const handleOpenModal = (mode: 'create' | 'edit' | 'view', page?: Page) => {
    setModalMode(mode);
    if (page) {
      setSelectedPage(page);
      setTempData({
        name: page.name,
        ig_login: page.ig_login,
        ig_email: page.ig_email,
        ig_password: page.ig_password,
        status: page.status,
        obs: page.obs,
      });
    } else {
      setSelectedPage(null);
      setTempData({
        name: '',
        ig_login: '',
        ig_email: '',
        ig_password: '',
        status: 'active',
        obs: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPage(null);
  };

  const handleSave = async () => {
    try {
      if (modalMode === 'create') {
        const response = await pageService.createPage(tempData);
        toast.success('Página criada com sucesso!');
        setPages([...pages, response]);
      } else if (modalMode === 'edit' && selectedPage) {
        const response = await pageService.updatePage(selectedPage.id, tempData);
        toast.success('Página atualizada com sucesso!');
        setPages(pages.map(p => (p.id === selectedPage.id ? response : p)));
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar página:', error);
      toast.error('Erro ao salvar página');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta página?')) {
      try {
        const response = await pageService.destroy(id);
        setPages(pages.filter(p => p.id !== id));
        toast.success(response.message);
      } catch (error) {
        console.error('Erro ao excluir página:', error);
        toast.error('Erro ao excluir página');
      }
    }
  };

  const filteredPages = (pages ? pages : [] ).filter(page =>
    page.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Cabeçalho */}
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

        {/* Campo de busca */}
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

        {/* Tabela */}
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

        {/* Modal (sem form) */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={
            modalMode === 'create'
              ? 'Nova Página'
              : modalMode === 'edit'
              ? 'Editar Página'
              : 'Detalhes da Página'
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nome da Página</label>
                <input
                  type="text"
                  value={tempData.name}
                  onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Instagram Login</label>
                <input
                  type="text"
                  value={tempData.ig_login}
                  onChange={(e) => setTempData({ ...tempData, ig_login: e.target.value })}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white disabled:opacity-50"
                  placeholder="@usuario"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Instagram Email</label>
                <input
                  type="email"
                  value={tempData.ig_email}
                  onChange={(e) => setTempData({ ...tempData, ig_email: e.target.value })}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white disabled:opacity-50"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Instagram Senha</label>
                <input
                  type="password"
                  value={tempData.ig_password}
                  onChange={(e) => setTempData({ ...tempData, ig_password: e.target.value })}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Observações</label>
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
