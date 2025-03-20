// Helper function to get clean competency label
const getFirstCleanCompetencyLabel = label => {
  if (!label) return label;
  
  if (label.includes('Competency')) {
    const firstCompetency = label.split(/,\s*Competency #/)[0];
    return firstCompetency;
  }
  
  return label;
};

export const getUniqueCleanCompetencies = options => {
  if (!options?.buckets) return [];
  
  const uniqueLabels = new Set();
  const cleanCompetencies = [];
  
  // Iterate through the options and get the first clean competency label
  for (const group of options.buckets) {
    const cleanedLabel = getFirstCleanCompetencyLabel(group.key);
    // Add label to the set and the clean competencies array
    if (!uniqueLabels.has(cleanedLabel)) {
      uniqueLabels.add(cleanedLabel);
      cleanCompetencies.push({
        ...group,
        // Add a clean key
        cleanedKey: cleanedLabel
      });
    }
  }
  
  return cleanCompetencies.sort((a, b) => a.cleanedKey.localeCompare(b.cleanedKey));
};