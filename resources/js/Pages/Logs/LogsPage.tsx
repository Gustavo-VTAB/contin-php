import { useState } from 'react';
import AppLayout from '@/Layout/AppLayout';
import { Search, Filter } from 'lucide-react';

interface Log {
  id: number;
  user_id: number;
  user_name: string;
  table_name: string;
  record_id: number;
  action: string;
  created_at: string;
  description: string;
}

export default function LogsPage() {
  const [logs] = useState<Log[]>([
    { id: 1, user_id: 1, user_name: 'Admin User', table_name: 'cards', record_id: 1, action: 'create', created_at: '2025-11-11 10:30:00', description: 'Cartão Principal criado' },
    { id: 2, user_id: 1, user_name: 'Admin User', table_name: 'phones', record_id: 1, action: 'update', created_at: '2025-11-11 10:25:00', description: 'Telefone atualizado' },
    { id: 3, user_id: 1, user_name: 'Admin User', table_name: 'fb_profiles', record_id: 1, action: 'create', created_at: '2025-11-11 10:20:00', description: 'Perfil João Silva criado' },
    { id: 4, user_id: 1, user_name: 'Admin User', table_name: 'fb_bms', record_id: 1, action: 'update', created_at: '2025-11-11 10:15:00', description: 'BM Principal atualizado' },
    { id: 5, user_id: 1, user_name: 'Admin User', table_name: 'fb_pages', record_id: 2, action: 'delete', created_at: '2025-11-11 10:10:00', description: 'Página excluída' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterTable, setFilterTable] = useState('all');

  const getActionBadge = (action: string) => {
    const colors = {
      create: 'bg-green-900 text-green-300',
      update: 'bg-blue-900 text-blue-300',
      delete: 'bg-red-900 text-red-300',
    };
    return colors[action as keyof typeof colors] || 'bg-gray-900 text-gray-300';
  };

  const getActionLabel = (action: string) => {
    const labels = {
      create: 'Criação',
      update: 'Atualização',
      delete: 'Exclusão',
    };
    return labels[action as keyof typeof labels] || action;
  };

  const getTableLabel = (table: string) => {
    const labels = {
      cards: 'Cartões',
      phones: 'Telefones',
      fb_profiles: 'Perfis',
      fb_bms: 'Business Managers',
      fb_pages: 'Páginas',
    };
    return labels[table as keyof typeof labels] || table;
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesTable = filterTable === 'all' || log.table_name === filterTable;
    return matchesSearch && matchesAction && matchesTable;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Logs do Sistema</h1>
          <p className="text-gray-400 mt-1">Visualize todas as atividades do sistema</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar logs..."
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none"
            >
              <option value="all">Todas as Ações</option>
              <option value="create">Criação</option>
              <option value="update">Atualização</option>
              <option value="delete">Exclusão</option>
            </select>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <select
              value={filterTable}
              onChange={(e) => setFilterTable(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none"
            >
              <option value="all">Todas as Tabelas</option>
              <option value="cards">Cartões</option>
              <option value="phones">Telefones</option>
              <option value="fb_profiles">Perfis</option>
              <option value="fb_bms">Business Managers</option>
              <option value="fb_pages">Páginas</option>
            </select>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Data/Hora</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Usuário</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tabela</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ação</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Descrição</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{log.created_at}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{log.user_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{getTableLabel(log.table_name)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionBadge(log.action)}`}>
                        {getActionLabel(log.action)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{log.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Info */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Mostrando {filteredLogs.length} de {logs.length} registros</span>
        </div>
      </div>
    </AppLayout>
  );
}