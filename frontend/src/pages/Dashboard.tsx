import AppLayout from '../components/Layout/AppLayout';
import { CreditCard, Phone, Users, Briefcase, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const stats = [
    { 
      icon: CreditCard, 
      label: 'Cartões', 
      value: '24', 
      color: 'from-blue-500 to-blue-600',
      link: '/cards'
    },
    { 
      icon: Phone, 
      label: 'Telefones', 
      value: '18', 
      color: 'from-green-500 to-green-600',
      link: '/phones'
    },
    { 
      icon: Users, 
      label: 'Perfis', 
      value: '32', 
      color: 'from-purple-500 to-purple-600',
      link: '/profiles'
    },
    { 
      icon: Briefcase, 
      label: 'Business Managers', 
      value: '12', 
      color: 'from-orange-500 to-orange-600',
      link: '/bms'
    },
    { 
      icon: FileText, 
      label: 'Páginas', 
      value: '28', 
      color: 'from-pink-500 to-pink-600',
      link: '/pages'
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">Bem-vindo ao FB Manager</h1>
          <p className="text-gray-400 text-lg">Gerencie tudo em um só lugar</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="group relative bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative space-y-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={28} className="text-white" />
                </div>
                
                <div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                </div>

                {/* Arrow Icon */}
                <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight size={20} className="text-gray-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-white mb-6">Acesso Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/cards"
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-600 hover:bg-gray-800 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Novo Cartão</h3>
                  <p className="text-gray-400 text-sm">Cadastre um novo cartão</p>
                </div>
                <CreditCard className="text-blue-500 group-hover:scale-110 transition-transform duration-300" size={32} />
              </div>
            </Link>

            <Link
              to="/phones"
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-green-600 hover:bg-gray-800 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Novo Telefone</h3>
                  <p className="text-gray-400 text-sm">Adicione um telefone</p>
                </div>
                <Phone className="text-green-500 group-hover:scale-110 transition-transform duration-300" size={32} />
              </div>
            </Link>

            <Link
              to="/profiles"
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-purple-600 hover:bg-gray-800 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Novo Perfil</h3>
                  <p className="text-gray-400 text-sm">Crie um perfil do Facebook</p>
                </div>
                <Users className="text-purple-500 group-hover:scale-110 transition-transform duration-300" size={32} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}