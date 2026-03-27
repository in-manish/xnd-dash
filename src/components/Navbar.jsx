import React from 'react';
import { User, Sun, Moon, Bell } from 'lucide-react';
import useTenantStore from '../store/useTenantStore';
import '../styles/Navbar.css';

const Navbar = () => {
  const { tenant, environment, setEnvironment } = useTenantStore();

  return (
    <nav className="navbar glass">
      <div className="navbar-left">
        {tenant?.icon && (
          <div className="tenant-icon-container">
            <img src={tenant.icon} alt={tenant.appName} className="tenant-icon" />
          </div>
        )}
        <div className="tenant-info">
          <span className="tenant-name">{tenant?.appName || 'Loading...'}</span>
          <span className="tenant-id">{tenant?.tenantId}</span>
        </div>
        
        <div className="env-toggle">
          <button 
            className={`env-btn ${environment === 'staging' ? 'active' : ''}`}
            onClick={() => setEnvironment('staging')}
          >
            Stage
          </button>
          <button 
            className={`env-btn ${environment === 'prod' ? 'active' : ''}`}
            onClick={() => setEnvironment('prod')}
          >
            Prod
          </button>
        </div>
      </div>

      <div className="navbar-right">
        <button className="nav-icon-btn"><Bell size={20} /></button>
        <button className="nav-icon-btn"><Sun size={20} /></button>
        <div className="user-profile">
          <User size={20} />
          <span>Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
