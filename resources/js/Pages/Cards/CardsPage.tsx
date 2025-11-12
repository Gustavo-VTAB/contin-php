import { useState } from 'react';
import AppLayout from '@/Layout/AppLayout';
import StatusBadge from '@/components/StatusBadge';
import { Plus, Edit, Eye, Trash2, Search } from 'lucide-react';

interface Card {
  id: number;
  name: string;
  number: string;
  validity: string;
  cvv: string;
  limit: string;
  status: string;
  obs: string;
}

export default function CardsPage() {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, name: 'Cartão Principal', number: '**** **** **** 1234', validity: '12/25', cvv: '***', limit: 'R$ 5.000,00', status: 'active', obs: 'Cartão principal da empresa' },
    { id: 2, name: 'Cartão Secundário', number: '**** **** **** 5678', validity: '06/26', cvv: '***', limit: 'R$ 3.000,00', status: 'active', obs: '' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

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
            onClick={() => alert('Abrir modal ou página de criação')}
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
                        <button onClick={() => alert(`Visualizar ${card.name}`)} className="text-blue-500 hover:text-blue-400">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => alert(`Editar ${card.name}`)} className="text-green-500 hover:text-green-400">
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
      </div>
    </AppLayout>
  );
}
