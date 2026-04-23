import React, { useState } from 'react';
import { Smartphone, X, Plus, Trash2, Loader2, Save, Terminal, Globe, Layers } from 'lucide-react';

const CreateConfigModal = ({ onClose, onSave, loading }) => {
  const [formData, setFormData] = useState({
    app_version: '',
    pkg_name: 'in.ideastoday',
    os: 'android',
    config_datas: [{ name: '', value: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfigDataChange = (index, field, value) => {
    const updated = [...formData.config_datas];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, config_datas: updated }));
  };

  const addConfigData = () => {
    setFormData(prev => ({
      ...prev,
      config_datas: [...prev.config_datas, { name: '', value: '' }]
    }));
  };

  const removeConfigData = (index) => {
    setFormData(prev => ({
      ...prev,
      config_datas: prev.config_datas.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const transformedConfigDatas = formData.config_datas.flatMap(item => [
      { name: item.name },
      { value: item.value }
    ]);
    onSave({ ...formData, config_datas: transformedConfigDatas });
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 animate-fadeIn text-left">
      {/* Deep Backdrop Blur */}
      <div 
        className="absolute inset-0 bg-background/60 backdrop-blur-3xl transition-opacity animate-fadeIn" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col glass rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] border-glass-border overflow-hidden animate-slideUp">
        
        {/* Header */}
        <div className="p-10 pb-6 flex items-center justify-between border-b border-glass-border">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-3xl bg-accent/10 flex items-center justify-center text-accent ring-1 ring-accent/20">
              <Plus size={28} strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-foreground">Initialize Config</h2>
              <p className="text-[11px] font-black text-foreground/20 uppercase tracking-[0.2em]">New application build repository</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full flex items-center justify-center text-foreground/20 hover:text-foreground hover:bg-foreground/5 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-10 space-y-12 scrollbar-hide">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-foreground/30 ml-1">
                <Terminal size={14} strokeWidth={2.5}/> Build Version
              </label>
              <input 
                type="text" 
                name="app_version"
                value={formData.app_version}
                onChange={handleChange}
                placeholder="e.g. 1.9.0"
                className="w-full px-6 py-4 bg-white/5 border border-glass-border rounded-2xl focus:ring-4 focus:ring-accent/10 focus:border-accent outline-none text-foreground font-bold transition-all placeholder:opacity-20 text-base"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-foreground/30 ml-1">
                <Globe size={14} strokeWidth={2.5}/> System Namespace
              </label>
              <input 
                type="text" 
                name="pkg_name"
                value={formData.pkg_name}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-white/5 border border-glass-border rounded-2xl focus:ring-4 focus:ring-accent/10 focus:border-accent outline-none text-foreground font-bold transition-all text-base"
                required
              />
            </div>

            <div className="space-y-4 md:col-span-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-foreground/30 ml-1">
                <Smartphone size={14} strokeWidth={2.5}/> Host Architecture
              </label>
              <select 
                name="os"
                value={formData.os}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-white/5 border border-glass-border rounded-2xl focus:ring-4 focus:ring-accent/10 focus:border-accent outline-none text-foreground font-bold transition-all appearance-none cursor-pointer text-base"
              >
                <option value="android">Android Platform Core</option>
                <option value="ios">iOS Application Suite</option>
              </select>
            </div>
          </div>

          <div className="space-y-8 pt-10 border-t border-glass-border/40">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-accent/60 ml-1">
                <Layers size={16} strokeWidth={2.5} /> Dynamic Interceptors
              </label>
              <button 
                type="button" 
                onClick={addConfigData}
                className="px-5 py-2.5 bg-accent/10 text-accent hover:bg-accent/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                + Deploy Field
              </button>
            </div>

            <div className="space-y-5">
              {formData.config_datas.map((config, index) => (
                <div key={index} className="flex gap-4 items-center animate-fadeIn group/field">
                  <input 
                    type="text"
                    value={config.name}
                    onChange={(e) => handleConfigDataChange(index, 'name', e.target.value)}
                    placeholder="Parameter ID"
                    className="flex-[1.2] px-6 py-4 bg-white/5 border border-glass-border rounded-2xl focus:ring-4 focus:ring-accent/10 focus:border-accent outline-none text-foreground font-bold transition-all text-sm"
                    required
                  />
                  <input 
                    type="text"
                    value={config.value}
                    onChange={(e) => handleConfigDataChange(index, 'value', e.target.value)}
                    placeholder="Assigned Value"
                    className="flex-1 px-6 py-4 bg-white/5 border border-glass-border rounded-2xl focus:ring-4 focus:ring-accent/10 focus:border-accent outline-none text-foreground font-bold transition-all text-sm"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => removeConfigData(index)}
                    className="p-4 text-red-500/30 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                    disabled={formData.config_datas.length === 1}
                  >
                    <Trash2 size={24} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-6 mt-16 pt-10 border-t border-glass-border">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest text-foreground/30 hover:text-foreground hover:bg-foreground/5 transition-all"
            >
              Abort Initialize
            </button>
            <button 
              type="submit" 
              className="px-12 py-5 bg-accent text-white rounded-[24px] shadow-2xl shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-1 transition-all flex items-center gap-4 font-black text-xs uppercase tracking-[0.2em] transform-gpu"
              disabled={loading}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} strokeWidth={3} />}
              {loading ? 'Initializing Build...' : 'Initialize Registry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateConfigModal;
