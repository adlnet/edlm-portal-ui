import { getUniqueCleanCompetencies } from '@/utils/getUniqueCleanCompetencies';

describe('getUniqueCleanCompetencies', () => {
  it('should return unique clean competencies', () => {
    const options = {
      buckets: [
        { key: 'Competency #1: Test Planning' },
        { key: 'Competency #2: Test Analysis' },
        { key: 'Competency #1: Test Planning, Competency #3: Reporting' }
      ]
    };
    
    const result = getUniqueCleanCompetencies(options);
    
    // Should have 2 unique competencies after cleaning
    expect(result).toHaveLength(2);
    
  });
});
