import { axiosInstance } from '@/config/axiosConfig';
import { backendConfigUrl } from '@/config/endpoints';
import { twentyFourHours } from '@/config/timeConstants';
import { useQuery } from 'react-query';


/**
 * @description Reaches out to the backend and gets the backend configuration data for the application. Valid for 24hrs
 */

export function useBackendConfig() {
  return useQuery(
    'backend-config',
    () => axiosInstance.get(backendConfigUrl).then((res) => res.data),
    {
      staleTime: twentyFourHours,
      cacheTime: twentyFourHours,
    }
  );
}
