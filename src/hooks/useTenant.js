import { useEffect, useState } from 'react';
import { getCurrentTenant, getTenantColor } from '../api/config/tenantConfig';
import useTenantStore from '../store/useTenantStore';

export const useTenant = () => {
  const [tenant, setTenant] = useState(null);
  const setStoreTenant = useTenantStore((state) => state.setTenant);

  useEffect(() => {
    const currentTenant = getCurrentTenant();
    
    const tenantToSet = currentTenant || {
      tenantId: 'default',
      appName: 'X-Dashboard',
      domains: { production: '', staging: '' }
    };
    
    setTenant(currentTenant);
    setStoreTenant(currentTenant);

    // Dynamic color generation
    const hash = currentTenant.tenantId.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const h = Math.abs(hash) % 360;
    const s = 65;
    const l = 55;
    
    // Apply dynamic CSS variables to :root in HSL format (h s% l%)
    const root = document.documentElement;
    root.style.setProperty('--primary', `${h} ${s}% ${l}%`);
    root.setAttribute('data-tenant', currentTenant.tenantId);
    
    // Optional: Update document title
    document.title = currentTenant.appName;

  }, []);

  return tenant;
};
