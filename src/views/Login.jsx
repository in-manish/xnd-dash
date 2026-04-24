import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, AlertCircle, Globe, Zap, ChevronDown, Check } from 'lucide-react';
import { AuthService } from '../api/services';
import useAuthStore from '../store/useAuthStore';
import useTenantStore from '../store/useTenantStore';
import {
  tenants,
  applyTenantTheme,
  getCurrentTenant,
} from '../api/config/tenantConfig';
import '../styles/Login.css';

const CustomSelect = ({ value, options, onChange, icon: Icon, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div
      className={`custom-select-container${isOpen ? ' is-open' : ''}`}
      ref={containerRef}
    >
      <label className="select-label">{label}</label>
      <div 
        className={`custom-select-trigger ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="trigger-content">
          <Icon className="trigger-icon" size={16} />
          <span>{selectedOption?.label}</span>
        </div>
        <ChevronDown className={`chevron ${isOpen ? 'rotate' : ''}`} size={16} />
      </div>
      
      {isOpen && (
        <div className="custom-options">
          {options.map((option) => (
            <div 
              key={option.value}
              className={`custom-option ${value === option.value ? 'selected' : ''}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <span>{option.label}</span>
              {value === option.value && <Check size={14} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [app, setApp] = useState(tenants[0]?.tenantId || 'default');
  const [env, setEnv] = useState('prod');
  const { setUser, isLoading, setLoading, error, setError } = useAuthStore();
  const { setTenant, setEnvironment } = useTenantStore();
  const navigate = useNavigate();

  useEffect(() => {
    const tenant = tenants.find((t) => t.tenantId === app) || tenants[0];
    if (tenant) {
      applyTenantTheme(tenant);
    }
    return () => {
      if (!useAuthStore.getState().isAuthenticated) {
        applyTenantTheme(getCurrentTenant());
      }
    };
  }, [app]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const selectedTenant = tenants.find(t => t.tenantId === app) || {
      tenantId: app,
      appName: app,
      domains: { production: '', staging: '' }
    };

    try {
      // Apply tenant/env before the request so axios interceptors use the same
      // host the user selected (store defaults to persisted staging otherwise).
      setTenant(selectedTenant);
      setEnvironment(env);
      applyTenantTheme(selectedTenant);

      const authData = await AuthService.login({ email, password });

      const token = authData?.token || authData?.access_token || authData?.access;
      if (!token) {
        throw new Error('Login succeeded but no auth token was returned.');
      }

      const fallbackName = email.split('@')[0] || 'Admin';
      const userProfile = authData?.user || authData?.staff || { name: fallbackName, email };

      setUser(userProfile, token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Verification failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const appOptions = tenants.map(t => ({
    value: t.tenantId,
    label: t.appName
  }));

  const envOptions = [
    { value: 'staging', label: 'Stage' },
    { value: 'prod', label: 'Prod' },
  ];

  return (
    <div className="login-container">
      <div className="login-card glass">
        <div className="login-header">
          <div className="logo-placeholder">XND</div>
          <h1>Dashboard Access</h1>
          <p>Sign in to manage your content</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="selection-row">
            <CustomSelect 
              label="Application"
              value={app}
              options={appOptions}
              onChange={setApp}
              icon={Globe}
            />
            <CustomSelect 
              label="Environment"
              value={env}
              options={envOptions}
              onChange={setEnv}
              icon={Zap}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className="premium-alert error">
              <div className="alert-content">
                <AlertCircle className="alert-icon" size={20} />
                <div className="alert-text">
                  <span className="alert-title">Authentication Error</span>
                  <span className="alert-desc">{error}</span>
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="spinner" size={18} />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Accessing the <strong>{appOptions.find(o => o.value === app)?.label}</strong> dashboard on <strong>{envOptions.find(o => o.value === env)?.label}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
