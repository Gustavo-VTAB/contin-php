import { useState } from 'react';
import AppLayout from '../../components/Layout/AppLayout';
import Modal from '../../components/Modal';
import StatusBadge from '../../components/StatusBadge';
import { Plus, Edit, Eye, Trash2, Search } from 'lucide-react';

interface Phone {
  id: number;
  name: string;
  number: string;
  operator: string;
  card_id: number | null;
  card_name?: string;
  status: string;
  easy_at: string;
}

export default function PhonesPage() {
  const [phones, setPhones] = useState<Phone[]>([
    { id: 1, name: 'Telefone Principal', number: '(11) 98765-4321', operator: 'Vivo', card_id: 1, card_name: 'Cartão Principal', status: 'active', easy_at: '2025-01-15' },
    { id: 2, name: 'Telefone Secundário', number: '(11) 91234-5678', operator: 'Claro', card_id: null, status: 'active', easy_at: '' },
  ]);

  const mockCards = [
    { id: 1, name: 'Cartão Principal' },
    { id: 2, name: 'Cartão Secundário' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    operator: '',
    card_id: '',
    status: 'active',
    easy_at: '',
  });

  const handleOpenModal = (mode: 'create' | 'edit' | 'view', phone?: Phone) => {
    setModalMode(mode);
    if (phone) {
      setSelectedPhone(phone);
      setFormData({
        name: phone.name,
        number: phone.number,
        operator: phone.operator,
        card_id: phone.card_id?.toString() || '',
        status: phone.status,
        easy_at: phone.easy_at,
      });
    } else {
      setFormData({ name: '', number: '', operator: '', card_id: '', status: 'active', easy_at: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhone(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cardId = formData.card_id ? parseInt(formData.card_id) : null;
    const cardName = cardId ? mockCards.find(c => c.id === cardId)?.name : undefined;

    if (modalMode === 'create') {
      const newPhone: Phone = {
        id: phones.length + 1,
        name: formData.name,
        number: formData.number,
        operator: formData.operator,
        card_id: cardId,
        card_name: cardName,
        status: formData.status,
        easy_at: formData.easy_at,
      };
      setPhones([...phones, newPhone]);
    } else if (modalMode === 'edit' && selectedPhone) {
      setPhones(phones.map(p => p.id === selectedPhone.id ? {
        ...p,
        name: formData.name,
        number: formData.number,
        operator: formData.operator,
        card_id: cardId,
        card_name: cardName,
        status: formData.status,
        easy_at: formData.easy_at,
      } : p));
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este telefone?')) {
      setPhones(phones.filter(p => p.id !== id));
    }
  };

  const filteredPhones = phones.filter(phone =>
    phone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    phone.number.includes(searchTerm) ||
    phone.operator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Telefones</h1>
            <p className="text-gray-400 mt-1">Gerencie os telefones cadastrados</p>
          </div>
          <button
            onClick={() => handleOpenModal('create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            Novo Telefone
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar telefones..."
            className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Número</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Operadora</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cartão</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredPhones.map((phone) => (
                  <tr key={phone.id} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{phone.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{phone.number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{phone.operator}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{phone.card_name || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={phone.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleOpenModal('view', phone)} className="text-blue-500 hover:text-blue-400">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => handleOpenModal('edit', phone)} className="text-green-500 hover:text-green-400">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(phone.id)} className="text-red-500 hover:text-red-400">
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
          title={modalMode === 'create' ? 'Novo Telefone' : modalMode === 'edit' ? 'Editar Telefone' : 'Visualizar Telefone'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Número</label>
                <input
                  type="text"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
                  placeholder="(11) 98765-4321"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Operadora</label>
                <select
                  value={formData.operator}
                  onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Vivo">Vivo</option>
                  <option value="Claro">Claro</option>
                  <option value="TIM">TIM</option>
                  <option value="Oi">Oi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Cartão Vinculado</label>
                <select
                  value={formData.card_id}
                  onChange={(e) => setFormData({ ...formData, card_id: e.target.value })}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
                >
                  <option value="">Nenhum</option>
                  {mockCards.map(card => (
                    <option key={card.id} value={card.id}>{card.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Data Easy</label>
                <input
                  type="date"
                  value={formData.easy_at}
                  onChange={(e) => setFormData({ ...formData, easy_at: e.target.value })}
                  disabled={modalMode === 'view'}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
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