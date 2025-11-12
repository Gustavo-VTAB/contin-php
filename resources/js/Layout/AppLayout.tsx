import { type ReactNode, useState } from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  Phone, 
  Users, 
  Briefcase, 
  FileText, 
  ScrollText,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { router } from '@inertiajs/react';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CreditCard, label: 'Cartões', path: '/cards' },
    { icon: Phone, label: 'Telefones', path: '/phones' },
    { icon: Users, label: 'Perfis', path: '/profiles' },
    { icon: Briefcase, label: 'Business Managers', path: '/bms' },
    { icon: FileText, label: 'Páginas', path: '/pages' },
    { icon: ScrollText, label: 'Logs', path: '/logs' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
            <h1 className="text-xl font-bold text-white">FB Manager</h1>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => (
                  setSidebarOpen(false),
                  router.visit(item.path)
                )}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={() => router.visit("/profile")}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <User size={20} />
              <span className="font-medium">Perfil</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
              <LogOut size={20} />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-4 ml-auto">
              <div className="text-right">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-gray-400">admin@example.com</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}