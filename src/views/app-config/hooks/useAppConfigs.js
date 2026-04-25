import { useCallback, useEffect, useState } from 'react';
import { AppConfigService } from '../../../api/services';

export const useAppConfigs = () => {
  const [configs, setConfigs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConfigs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await AppConfigService.getAllAppConfigs();
      setConfigs(data.results);
      setTotalCount(data.count);
      setError(null);
    } catch (err) {
      setError('Failed to load application configurations. Please try again later.');
      console.error('Error fetching app configs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfigs();
  }, [fetchConfigs]);

  return {
    configs,
    totalCount,
    loading,
    error,
    fetchConfigs,
  };
};
