import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <div className="content-area">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
