'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { oneHour } from '@/config/timeConstants';
import { useQuery } from 'react-query';

/**
 * Hook to get competency or KSA description from ECCR API
 * @param {string} eccrReference The ECCR reference for competency or KSA
 * @returns {Object}
 */

export function useCompOrKsaDesc(eccrReference) {
  return useQuery(
    ['comp-ksa-description', eccrReference],
    async () => {
      if (!eccrReference) return null;

      const response = await axiosInstance.get(`/edlm-portal/api/data/${eccrReference}/`);
      return {
        id: eccrReference,
        name: response.data.name?.['@value'] || '',
        description: response.data.description?.['@value'] || ''
      };
    },
    {
      enabled: !!eccrReference,
      staleTime: oneHour,
      cacheTime: oneHour,
    }
  );
}

/**
 * Hook to get multiple competency/KSA descriptions at once
 * @param {Array} eccrReferences - Array of ECCR references (competencies and KSAs)
 * @returns {Object}
 */

export function useMultipleCompAndKsaDesc(eccrReferences = []) {
  return useQuery(
    ['multiple-comp-ksa-descriptions', eccrReferences],
    async () => {
      if (!eccrReferences || eccrReferences.length === 0) return [];

      const promises = eccrReferences.map(async (eccrReference) => {
        try {
          const response = await axiosInstance.get(`/edlm-portal/api/data/${eccrReference}/`);
          return {
            id: eccrReference,
            name: response.data.name?.['@value'] || '',
            description: response.data.description?.['@value'] || ''
          };
        } catch (err) {
          console.error(`Failed to fetch description for ${eccrReference}:`, err);
          return {
            id: eccrReference,
            name: '',
            description: `Description not available`
          };
        }
      });
      
      return Promise.all(promises);
    },
    {
      enabled: eccrReferences && eccrReferences.length > 0,
      staleTime: oneHour,
      cacheTime: oneHour,
    }
  );
}
