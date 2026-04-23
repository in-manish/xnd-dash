import React, { useState, useEffect } from 'react';
import { AppConfigService } from '../../api/services';
import { Loader2, AlertCircle, Plus, Settings } from 'lucide-react';
import ConfigTable from './components/ConfigTable';
import ConfigDetailModal from './components/ConfigDetailModal';
import CreateConfigModal from './components/CreateConfigModal';

const AppConfig = () => {
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [configDetailLoading, setConfigDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      setLoading(true);
      const data = await AppConfigService.getAppConfigs();
      const nextConfigs = Array.isArray(data) ? data : (data?.results || []);
      setConfigs(nextConfigs);
      setError(null);
    } catch (err) {
      setError('Failed to load application configurations. Please try again later.');
      console.error('Error fetching app configs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (id) => {
    try {
      setSelectedConfig({ id }); 
      setConfigDetailLoading(true);
      setDetailError(null);
      const data = await AppConfigService.getAppConfigById(id);
      setSelectedConfig(data);
    } catch (err) {
      setDetailError('Failed to fetch complete configuration details.');
      console.error('Error fetching config detail:', err);
    } finally {
      setConfigDetailLoading(false);
    }
  };

  const handleCreateConfig = async (payload) => {
    try {
      setCreateLoading(true);
      await AppConfigService.createAppConfig(payload);
      setShowCreateModal(false);
      fetchConfigs();
    } catch (err) {
      console.error('Error creating config:', err);
      alert('Failed to create configuration. Please check the console for details.');
    } finally {
      setCreateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="animate-spin text-accent" size={40} />
        <p className="text-foreground/60 font-medium">Loading configurations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center max-w-md mx-auto">
        <div className="p-4 bg-red-500/10 rounded-full">
          <AlertCircle className="text-red-500" size={40} />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Oops! Something went wrong</h3>
          <p className="text-foreground/60">{error}</p>
        </div>
        <button 
          onClick={fetchConfigs} 
          className="px-6 py-2 bg-accent text-white rounded-xl font-semibold hover:opacity-90 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-fadeIn">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-3 text-accent mb-1">
            <Settings size={20} className="opacity-80" />
            <span className="text-sm font-bold uppercase tracking-widest opacity-80">Administration</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            App Configurations
          </h1>
          <p className="text-lg text-foreground/50 max-w-2xl font-medium leading-relaxed">
            Manage application versioning, environment settings, and tenant-specific preferences through a centralized command center.
          </p>
        </div>
        
        <button 
          onClick={() => setShowCreateModal(true)}
          className="group px-8 py-4 bg-accent text-white rounded-2xl font-bold shadow-2xl shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-1 transition-all flex items-center gap-3"
        >
          <Plus size={22} strokeWidth={3} className="transition-transform group-hover:rotate-90" />
          <span>Create New Build</span>
        </button>
      </header>

      <div className="relative">
        <ConfigTable 
          configs={configs} 
          onRowClick={handleViewDetails} 
        />
      </div>

      {selectedConfig && (
        <ConfigDetailModal 
          config={selectedConfig}
          loading={configDetailLoading}
          error={detailError}
          onClose={() => setSelectedConfig(null)}
          onRetry={handleViewDetails}
        />
      )}

      {showCreateModal && (
        <CreateConfigModal 
          loading={createLoading}
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateConfig}
        />
      )}
    </div>
  );
};

export default AppConfig;
