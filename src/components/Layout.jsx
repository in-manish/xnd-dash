import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import useUIStore from '../store/useUIStore';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  const { isSidebarCollapsed } = useUIStore();

  return (
    <div className="layout-container">
      <Sidebar />
      <main 
        className="main-content transition-all duration-300 ease-in-out"
        style={{ marginLeft: isSidebarCollapsed ? '88px' : '280px' }}
      >
        <Navbar />
        <div className="content-area">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
