'use strict';

import { createContext, useContext, useMemo } from 'react';
import { useLearningPlanCompetenciesOptions } from '@/hooks/learningPlan/useLearningPlanCompetenciesOptions';
import backupData from '@/public/backup_competencies.json';

// Returns all parent competencies from backup as a backup
function findParentsFromBackup(competencies) {
  return competencies.filter(comp => comp.parent && comp.parent.length === 0);
}

const CompetencyContext = createContext();

export function CompetencyProvider({ children }) {
  const { parentCompetencies, childCompetencies, isLoading, error } = useLearningPlanCompetenciesOptions();

  const competencyData = useMemo(() => {
    // Check which data to use
    const useApiData = parentCompetencies && parentCompetencies.length > 0 && !error;
    const parentComps = useApiData 
      ? parentCompetencies 
      : findParentsFromBackup(backupData);

    const childComps = useApiData ? childCompetencies : [];

    return {
      parentCompetencies: parentComps,
      childCompetencies: childComps,
      isLoading,
      error,
      useApiData,
      dataSource: useApiData ? 'API' : 'Backup',
      competencyCount: parentComps.length
    };
  }, [parentCompetencies, childCompetencies, isLoading, error]);

  return (
    <CompetencyContext.Provider value={competencyData}>
      {children}
    </CompetencyContext.Provider>
  );
}

export function useCompetencies() {
  const context = useContext(CompetencyContext);
  if (!context) {
    console.error('useCompetencies needs CompetencyProvider');
  }
  return context;
}
