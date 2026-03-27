import React from 'react';
import { LayoutDashboard, Newspaper, Globe, Plane, Settings, LogOut } from 'lucide-react';
import useTenantStore from '../store/useTenantStore';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const { tenant } = useTenantStore();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Newspaper size={20} />, label: 'Briefs', path: '/briefs' },
    { icon: <Globe size={20} />, label: 'Analytics', path: '/analytics' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="sidebar glass">
      <div className="sidebar-logo">
        <div className="logo-icon">X</div>
        <span className="logo-text">XND Dash</span>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <a key={index} href={item.path} className="nav-item">
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
