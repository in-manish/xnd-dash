import React, { useState, useEffect } from 'react';
import { X, Loader2, Save, Globe, Image as ImageIcon, Shield, Upload } from 'lucide-react';

const inputBase =
  'w-full px-4 py-3 bg-[hsl(var(--background)/0.72)] border border-[color:var(--glass-border)] rounded-xl focus:bg-[hsl(var(--background)/0.95)] focus:ring-4 focus:ring-[hsl(var(--primary)/0.18)] focus:border-primary outline-none text-[hsl(var(--foreground))] font-semibold transition-all text-sm shadow-sm placeholder:text-[hsl(var(--foreground)/0.35)]';

const labelBase =
  'text-[11px] font-bold text-[hsl(var(--foreground)/0.5)] uppercase tracking-[0.12em] px-0.5';

const HostConfigModal = ({ host, onClose, onSave, loading }) => {
  const [formData, setFormData] = useState({
    brand_name: '',
    host_name: '',
    logo_link: '',
    is_whitelist: true,
  });

  const [logoFile, setLogoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (host) {
      setFormData({
        brand_name: host.brand_name || '',
        host_name: host.host_name || '',
        logo_link: host.logo_link || '',
        is_whitelist: host.is_whitelist ?? true,
      });
      setPreviewUrl(host.logo_link);
    }
  }, [host]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, logo_link: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (logoFile) {
      const data = new FormData();
      data.append('brand_name', formData.brand_name);
      data.append('host_name', formData.host_name);
      data.append('is_whitelist', formData.is_whitelist);
      data.append('logo_link', logoFile);
      if (host?.id) data.append('host_id', host.id);
      onSave(data);
    } else {
      const payload = { ...formData };
      if (host?.id) payload.host_id = host.id;
      onSave(payload);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 animate-fadeIn text-left">
      <div
        className="absolute inset-0 bg-[hsl(var(--background)/0.55)] backdrop-blur-xl"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl max-h-[88vh] flex flex-col overflow-hidden rounded-3xl border border-[color:var(--glass-border)] bg-[hsl(var(--background)/0.9)] backdrop-blur-2xl shadow-[0_24px_60px_hsl(var(--foreground)/0.22)] animate-slideUp">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_70%)]" />

        <header className="relative shrink-0 px-7 md:px-8 py-5 flex items-start justify-between gap-4 border-b border-[hsl(var(--foreground)/0.1)]">
          <div className="min-w-0">
            <h2 className="text-[19px] font-bold text-[hsl(var(--foreground))] font-heading tracking-tight truncate">
              {host ? 'Edit Host' : 'Add New Host'}
            </h2>
            <p className="text-[12.5px] font-medium text-[hsl(var(--foreground)/0.55)] mt-1">
              Configure publisher endpoint and brand assets.
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            aria-label="Close"
            className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-[hsl(var(--foreground)/0.55)] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--background)/0.75)] border border-transparent hover:border-[color:var(--glass-border)] transition-all active:scale-90"
          >
            <X size={18} />
          </button>
        </header>

        <div className="relative flex-1 min-h-0 overflow-hidden">
          <form
            id="host-config-form"
            onSubmit={handleSubmit}
            className="h-full overflow-y-auto px-7 md:px-8 pt-6 pb-8 space-y-5 [scrollbar-width:thin] [scrollbar-color:hsl(var(--foreground)/0.15)_transparent]"
          >
            <div className="space-y-1.5">
              <label className={labelBase}>Brand Name</label>
              <input
                type="text"
                name="brand_name"
                value={formData.brand_name}
                onChange={handleChange}
                placeholder="e.g. The Economic Times"
                className={inputBase}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className={labelBase}>Hostname</label>
              <div className="relative">
                <Globe
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--foreground)/0.4)]"
                  size={16}
                />
                <input
                  type="text"
                  name="host_name"
                  value={formData.host_name}
                  onChange={handleChange}
                  placeholder="https://economictimes.indiatimes.com"
                  className={`${inputBase} pl-10 font-mono truncate`}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={labelBase}>Logo Asset</label>
              <div className="grid grid-cols-[1fr_auto] gap-4 items-stretch">
                <div className="flex flex-col gap-3 min-w-0">
                  <div className="relative">
                    <ImageIcon
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--foreground)/0.4)]"
                      size={16}
                    />
                    <input
                      type="text"
                      name="logo_link"
                      value={formData.logo_link}
                      onChange={handleChange}
                      disabled={!!logoFile}
                      placeholder="Logo URL"
                      className={`${inputBase} pl-10 truncate disabled:opacity-50 disabled:bg-[hsl(var(--background)/0.5)]`}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-[hsl(var(--foreground)/0.12)]" />
                    <span className="text-[10px] font-bold text-[hsl(var(--foreground)/0.45)] uppercase tracking-[0.18em]">
                      or
                    </span>
                    <span className="h-px flex-1 bg-[hsl(var(--foreground)/0.12)]" />
                  </div>

                  <label className="relative flex items-center justify-center gap-2.5 py-3 border border-dashed border-[hsl(var(--foreground)/0.22)] bg-[hsl(var(--background)/0.4)] rounded-xl hover:border-[hsl(var(--primary)/0.55)] hover:bg-[hsl(var(--background)/0.75)] transition-all cursor-pointer group">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <Upload
                      size={16}
                      className="shrink-0 text-[hsl(var(--foreground)/0.5)] group-hover:text-primary transition-colors"
                    />
                    <span className="text-[13px] font-bold text-[hsl(var(--foreground)/0.7)] group-hover:text-[hsl(var(--foreground))] transition-colors truncate max-w-[200px]">
                      {logoFile ? logoFile.name : 'Upload Brand Logo'}
                    </span>
                  </label>
                </div>

                <div className="self-stretch aspect-square w-[7.5rem] rounded-2xl bg-[hsl(var(--background)/0.75)] border border-[color:var(--glass-border)] shadow-inner flex items-center justify-center overflow-hidden p-3 relative group shrink-0 ring-1 ring-[hsl(var(--foreground)/0.06)]">
                  {previewUrl ? (
                    <>
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                      {logoFile && (
                        <button
                          type="button"
                          onClick={() => {
                            setLogoFile(null);
                            setPreviewUrl(host?.logo_link || null);
                          }}
                          className="absolute inset-0 bg-[hsl(var(--foreground)/0.72)] text-[hsl(var(--primary-foreground))] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm"
                          aria-label="Remove logo"
                        >
                          <X size={22} />
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center text-[hsl(var(--foreground)/0.3)]">
                      <ImageIcon size={28} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 p-4 pr-5 bg-[hsl(var(--background)/0.6)] rounded-xl border border-[color:var(--glass-border)] shadow-sm">
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center shadow-sm transition-colors ${
                    formData.is_whitelist
                      ? 'bg-[hsl(var(--primary)/0.14)] text-primary border border-[hsl(var(--primary)/0.28)]'
                      : 'bg-[hsl(var(--foreground)/0.06)] text-[hsl(var(--foreground)/0.7)] border border-[hsl(var(--foreground)/0.14)]'
                  }`}
                >
                  <Shield size={18} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-[hsl(var(--foreground))] text-[14px] leading-tight truncate">
                    Whitelist Status
                  </h4>
                  <p className="text-[12px] font-semibold text-[hsl(var(--foreground)/0.55)] mt-0.5 truncate">
                    Approve this host for traffic routing
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  name="is_whitelist"
                  checked={formData.is_whitelist}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[hsl(var(--foreground)/0.18)] rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-[hsl(var(--primary-foreground))] after:rounded-full after:h-[18px] after:w-[18px] after:shadow after:transition-all peer-checked:bg-primary shadow-inner" />
              </label>
            </div>
          </form>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-[hsl(var(--background)/0.9)] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[hsl(var(--background)/0.9)] to-transparent" />
        </div>

        <footer className="relative shrink-0 flex flex-wrap justify-end items-center gap-3 px-7 md:px-8 py-4 border-t border-[hsl(var(--foreground)/0.14)] bg-[hsl(var(--background)/0.85)] backdrop-blur-xl">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold text-[13px] text-[hsl(var(--foreground)/0.65)] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--background))] border border-transparent hover:border-[color:var(--glass-border)] transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="host-config-form"
            disabled={loading}
            className="px-5 py-2.5 bg-primary text-[hsl(var(--primary-foreground))] rounded-xl font-bold text-[13px] shadow-[0_10px_24px_hsl(var(--primary)/0.35)] hover:shadow-[0_14px_28px_hsl(var(--primary)/0.45)] hover:-translate-y-0.5 transition-all active:scale-95 inline-flex items-center gap-2 disabled:opacity-70 disabled:pointer-events-none disabled:translate-y-0 whitespace-nowrap"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>{loading ? 'Saving...' : 'Save Host'}</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default HostConfigModal;
