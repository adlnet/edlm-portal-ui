'use strict';

import { useCompetencySearch } from '@/hooks/useCompetencySearch';

/**
 * Hook to get competencies formatted for learning plan puposes
 * @returns {Object} Object containing parent competencies, child competencies/KSAs
 */

export function useLearningPlanCompetenciesOptions() {
  const { competencies } = useCompetencySearch();

  // Filter parent and child coms
  const parentCompetencies = competencies.filter(comp => !comp.parent || comp.parent === '');
  const childCompetencies = competencies.filter(comp => comp.parent && comp.parent !== '');

  // Get children for a specific parent
  const getChildrenForParent = parentName => {
    return childCompetencies.filter(child => child.parent === parentName);
  };

  const getCompetencyById = id => {
    return competencies.find(comp => comp.id === id);
  };

  const getCompetencyByName = name => {
    return competencies.find(comp => comp.name === name);
  };

  // Get KSA by ID (child competencies are basically KSAs)
  const getKSAById = (id) => {
    return childCompetencies.find(ksa => ksa.id === id);
  };

  const parentMap = {};
  parentCompetencies.forEach(parent => {
    parentMap[parent.name] = {
      id: parent.id,
      name: parent.name,
      description: parent.desc,
      children: getChildrenForParent(parent.name).map(child => ({
        id: child.id,
        name: child.name,
        description: child.desc
      }))
    };
  });

  return {
    parentCompetencies: parentCompetencies.map(comp => ({
      id: comp.id,
      name: comp.name,
      description: comp.desc
    })),
    childCompetencies: childCompetencies.map(comp => ({
      id: comp.id,
      name: comp.name,
      description: comp.desc,
      parent: comp.parent
    })),
    parentMap,
    getChildrenForParent,
    getCompetencyById,
    getCompetencyByName,
    getKSAById
  };
}
