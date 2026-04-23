import React from 'react';
import { LayoutDashboard, LogOut, Settings, Server, Menu } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import useUIStore from '../store/useUIStore';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { logout } = useAuthStore();
  const { isSidebarCollapsed, toggleSidebar } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: <LayoutDashboard />, label: 'Dashboard', path: '/' },
    { icon: <Settings />, label: 'App Config', path: '/app-config' },
    { icon: <Server />, label: 'Host Config', path: '/host-config' },
  ];

  return (
    <aside 
      className={`
        ${isSidebarCollapsed ? 'w-[88px]' : 'w-[280px]'} 
        h-screen bg-[hsl(var(--background)/0.86)] backdrop-blur-xl border-r border-[color:var(--glass-border)] fixed left-0 top-0 flex flex-col p-4 z-50 shadow-[4px_0_24px_hsl(var(--primary)/0.08)] transition-all duration-300 ease-in-out
      `}
    >
      <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} mb-8`}>
        {!isSidebarCollapsed && (
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/30 ring-1 ring-white/25">
              <div className="w-4.5 h-4.5 border-2.5 border-white rounded-[5px] relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-[1.5px]"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-[hsl(var(--foreground))] leading-tight tracking-tight font-heading">XND Dash</span>
              <span className="text-[10px] font-extrabold text-[hsl(var(--foreground)/0.45)] tracking-[0.15em] uppercase">Console</span>
            </div>
          </div>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-2.5 hover:bg-[hsl(var(--background)/0.8)] rounded-2xl transition-all text-[hsl(var(--foreground)/0.55)] hover:text-primary border border-transparent hover:border-[color:var(--glass-border)] shadow-sm active:scale-90"
        >
          <Menu size={22} strokeWidth={2.5} />
        </button>
      </div>
      
      <nav className="mt-14 flex flex-col gap-2 flex-1">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path || (item.path === '/host-config' && location.pathname.includes('/host-config'));
          return (
            <button
              type="button"
              key={index} 
              onClick={() => navigate(item.path)}
              className={`
                relative group flex items-center w-full ${isSidebarCollapsed ? 'justify-center px-2.5 py-3' : 'gap-3 px-3.5 py-3'} rounded-2xl transition-all duration-200
                ${isActive
                  ? 'text-primary'
                  : 'text-[hsl(var(--foreground)/0.62)] hover:bg-[hsl(var(--background)/0.72)] hover:text-[hsl(var(--foreground))]'}
              `}
              title={isSidebarCollapsed ? item.label : ''}
            >
              <div className={`
                shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
                ${isActive
                  ? 'bg-[hsl(var(--background)/0.9)] text-primary border border-[color:var(--glass-border)]'
                  : 'bg-[hsl(var(--background)/0.9)] text-[hsl(var(--foreground)/0.45)] group-hover:text-primary border border-[color:var(--glass-border)]'}
              `}>
                {React.cloneElement(item.icon, { size: 22, strokeWidth: isActive ? 2.5 : 2 })}
              </div>
              {!isSidebarCollapsed && (
                <>
                  <span className="font-bold text-[15px] tracking-tight">{item.label}</span>
                </>
              )}
            </button>
          );
        })}
      </nav>

      <div className={`mt-auto pt-6 ${isSidebarCollapsed ? 'px-0' : 'px-2'}`}>
        <button 
          className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} py-3 px-3.5 w-full text-rose-500 font-bold text-sm hover:bg-rose-50/60 hover:text-rose-600 rounded-2xl border border-transparent hover:border-rose-100 transition-all duration-200 group`}
          onClick={handleLogout}
          title={isSidebarCollapsed ? 'Logout' : ''}
        >
          <LogOut size={22} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
          {!isSidebarCollapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
