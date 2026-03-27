import React from 'react';
import useTenantStore from '../store/useTenantStore';
import { Activity, Clock, Users, Zap } from 'lucide-react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { tenant, environment } = useTenantStore();

  const stats = [
    { label: 'Total Briefs', value: '1,284', icon: <Activity size={24} />, color: '#6366f1' },
    { label: 'Active Users', value: '842', icon: <Users size={24} />, color: '#10b981' },
    { label: 'Avg. Read Time', value: '3.2m', icon: <Clock size={24} />, color: '#f59e0b' },
    { label: 'Engagement Rate', value: '68%', icon: <Zap size={24} />, color: '#ef4444' },
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">
          {tenant.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())} Dashboard
        </h1>
        <p className="dashboard-subtitle">
          Managing <span className="env-pill">{environment.toUpperCase()}</span> environment
        </p>
      </header>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card glass">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="grid-item glass large">
          <h3 className="grid-title">Recent Activity</h3>
          <div className="placeholder-content">
            Activity stream for {tenant}...
          </div>
        </div>
        <div className="grid-item glass small">
          <h3 className="grid-title">Quick Actions</h3>
          <div className="action-list">
            <button className="action-btn">Create New Brief</button>
            <button className="action-btn secondary">View Analytics</button>
            <button className="action-btn secondary">Manage Users</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
