import { useState } from 'react';
import AppLayout from '@/Layout/AppLayout';
import Modal from '@/components/Modal';
import StatusBadge from '@/components/StatusBadge';
import { Plus, Edit, Eye, Trash2, Search } from 'lucide-react';
import { Card } from '@/types';


export default function CardsPage() {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, name: 'Cartão Principal', number: '**** **** **** 1234', validity: '12/25', cvv: '***', limit: 'R$ 5.000,00', status: 'active', obs: 'Cartão principal da empresa' },
    { id: 2, name: 'Cartão Secundário', number: '**** **** **** 5678', validity: '06/26', cvv: '***', limit: 'R$ 3.000,00', status: 'active', obs: '' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    validity: '',
    cvv: '',
    limit: '',
    status: 'active',
    obs: '',
  });

  const handleOpenModal = (mode: 'create' | 'edit' | 'view', card?: Card) => {
    setModalMode(mode);
    if (card) {
      setSelectedCard(card);
      setFormData({
        name: card.name,
        number: card.number,
        validity: card.validity,
        cvv: card.cvv,
        limit: card.limit,
        status: card.status,
        obs: card.obs,
      });
    } else {
      setFormData({ name: '', number: '', validity: '', cvv: '', limit: '', status: 'active', obs: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      const newCard: Card = {
        id: cards.length + 1,
        ...formData,
      };
      setCards([...cards, newCard]);
    } else if (modalMode === 'edit' && selectedCard) {
      setCards(cards.map(c => c.id === selectedCard.id ? { ...c, ...formData } : c));
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este cartão?')) {
      setCards(cards.filter(c => c.id !== id));
    }
  };

  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.number.includes(searchTerm)
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Cartões</h1>
            <p className="text-gray-400 mt-1">Gerencie os cartões cadastrados</p>
          </div>
          <button
            onClick={() => handleOpenModal('create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            Novo Cartão
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar cartões..."
            className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Número</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Validade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Limite</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredCards.map((card) => (
                  <tr key={card.id} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{card.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{card.number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{card.validity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{card.limit}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={card.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleOpenModal('view', card)} className="text-blue-500 hover:text-blue-400">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => handleOpenModal('edit', card)} className="text-green-500 hover:text-green-400">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(card.id)} className="text-red-500 hover:text-red-400">
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

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={modalMode === 'create' ? 'Novo Cartão' : modalMode === 'edit' ? 'Editar Cartão' : 'Visualizar Cartão'}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Nome', key: 'name', placeholder: '' },
                { label: 'Número', key: 'number', placeholder: '**** **** **** ****' },
                { label: 'Validade', key: 'validity', placeholder: 'MM/AA' },
                { label: 'CVV', key: 'cvv', placeholder: '***' },
                { label: 'Limite', key: 'limit', placeholder: 'R$ 0,00' }
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
                  <input
                    type="text"
                    value={(formData as any)[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    disabled={modalMode === 'view'}
                    placeholder={placeholder}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
                  />
                </div>
              ))}

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
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {modalMode === 'create' ? 'Criar' : 'Salvar'}
                </button>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </AppLayout>
  );
}
