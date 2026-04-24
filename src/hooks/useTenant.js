import { useEffect, useState } from 'react';
import { applyTenantTheme, getCurrentTenant, tenants } from '../api/config/tenantConfig';
import useTenantStore from '../store/useTenantStore';

const resolveInitialTenant = () => {
  const persisted = useTenantStore.getState().tenant;
  const persistedOk =
    persisted &&
    tenants.some((t) => t.tenantId === persisted.tenantId);
  return persistedOk ? persisted : getCurrentTenant();
};

export const useTenant = () => {
  const [tenant, setTenant] = useState(null);
  const setStoreTenant = useTenantStore((state) => state.setTenant);

  useEffect(() => {
    const applyResolved = () => {
      const resolved = resolveInitialTenant();
      setTenant(resolved);
      setStoreTenant(resolved);
      applyTenantTheme(resolved);
    };

    if (useTenantStore.persist.hasHydrated()) {
      applyResolved();
      return undefined;
    }

    return useTenantStore.persist.onFinishHydration(() => {
      applyResolved();
    });
  }, []);

  return tenant;
};
