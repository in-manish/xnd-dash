import React, { useState } from 'react';
import { AppConfigService } from '../../api/services';
import { Loader2, AlertCircle, Plus, Settings, RefreshCw } from 'lucide-react';
import ConfigTable from './components/ConfigTable';
import ConfigDetailModal from './components/ConfigDetailModal';
import CreateConfigModal from './components/CreateConfigModal';
import { useAppConfigs } from './hooks/useAppConfigs';

const AppConfig = () => {
  const { configs, totalCount, loading, error, fetchConfigs } = useAppConfigs();
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const handleRowClick = (config) => {
    setSelectedConfig(config);
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
          className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all"
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
          <div className="flex items-center gap-3 pt-3 text-sm font-bold text-foreground/45">
            <span className="rounded-full border border-glass-border bg-background/40 px-4 py-2">
              {configs.length} loaded{totalCount ? ` of ${totalCount}` : ''}
            </span>
            <button
              type="button"
              onClick={fetchConfigs}
              className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-background/40 px-4 py-2 text-primary transition-all hover:bg-primary/10"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>
        </div>
        
        <button 
          onClick={() => setShowCreateModal(true)}
          className="group px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-2xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center gap-3"
        >
          <Plus size={22} strokeWidth={3} className="transition-transform group-hover:rotate-90" />
          <span>Create New Build</span>
        </button>
      </header>

      <div className="relative">
        <ConfigTable configs={configs} onRowClick={handleRowClick} />
      </div>

      {selectedConfig && (
        <ConfigDetailModal config={selectedConfig} onClose={() => setSelectedConfig(null)} />
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
