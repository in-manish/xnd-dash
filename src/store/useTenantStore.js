import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTenantStore = create(
  persist(
    (set, get) => ({
      tenant: null, // Current tenant object
      environment: 'staging', // Default environment
      
      setTenant: (tenant) => set({ tenant }),
      setEnvironment: (environment) => set({ environment }),
      
      // Helper to get API URL based on current tenant/env
      getApiUrl: () => {
        const { tenant, environment } = get();
        if (!tenant) return '';
        
        const domain = tenant.domains[environment === 'prod' ? 'production' : 'staging'];
        // Assuming API followed the pattern api.[domain]
        return `https://api.${domain}`;
      },
    }),
    {
      name: 'xnd-dash-tenant-storage',
    }
  )
);

export default useTenantStore;
