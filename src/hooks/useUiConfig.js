import { axiosInstance } from '@/config/axiosConfig';
import { twentyFourHours } from '@/config/timeConstants';
import { uiConfigUrl } from '@/config/endpoints';
import { useQuery } from 'react-query';

/**
 * @description Reaches out to the backend and gets the UI configuration data for the application. Valid for 24hrs
 */

export function useUiConfig() {
  return useQuery(
    'ui-config',
    () => axiosInstance.get(uiConfigUrl).then((res) => res.data),
    {
      staleTime: twentyFourHours,
      cacheTime: twentyFourHours,
    }
  );
}
