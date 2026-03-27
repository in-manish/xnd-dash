import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import useAuthStore from './store/useAuthStore';
import { useTenant } from './hooks/useTenant';
import './styles/variables.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Layout>{children}</Layout>;
};

function App() {
  const { isAuthenticated } = useAuthStore();
  const tenant = useTenant();

  if (!tenant) return null; // Wait for tenant detection

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
        />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/briefs"
          element={
            <ProtectedRoute>
              <div className="glass text-red-500 font-bold" style={{ padding: '2rem' }}>Briefs List Placeholder (Tailwind Verified)</div>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <div className="glass" style={{ padding: '2rem' }}>Analytics Placeholder</div>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <div className="glass" style={{ padding: '2rem' }}>Settings Placeholder</div>
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
