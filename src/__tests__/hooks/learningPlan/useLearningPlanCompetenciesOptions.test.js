import { renderHook } from '@testing-library/react';
import { useCompetencySearch } from '@/hooks/useCompetencySearch';
import { useLearningPlanCompetenciesOptions } from '@/hooks/learningPlan/useLearningPlanCompetenciesOptions';


// Mock useCompetencySearch
jest.mock('@/hooks/useCompetencySearch');

const mockCompetencies = [
  { id: 'p1', name: 'Parent One', desc: 'Parent Desc 1', parent: '' },
  { id: 'p2', name: 'Parent Two', desc: 'Parent Desc 2' },
  { id: 'c1', name: 'Child One', desc: 'Child Desc 1', parent: 'Parent One' },
  { id: 'c2', name: 'Child Two', desc: 'Child Desc 2', parent: 'Parent Two' },
  { id: 'c3', name: 'Child Three', desc: 'Child Desc 3', parent: 'Parent Two' }
];

describe('useLearningPlanCompetenciesOptions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCompetencySearch.mockReturnValue({ competencies: mockCompetencies, isLoading: false });
  });

  it('splits competencies into parent and child correctly', () => {
    const { result } = renderHook(() => useLearningPlanCompetenciesOptions());

    expect(result.current.parentCompetencies).toEqual([
      { id: 'p1', name: 'Parent One', description: 'Parent Desc 1' },
      { id: 'p2', name: 'Parent Two', description: 'Parent Desc 2' }
    ]);
    expect(result.current.childCompetencies).toEqual([
      { id: 'c1', name: 'Child One', description: 'Child Desc 1', parent: 'Parent One' },
      { id: 'c2', name: 'Child Two', description: 'Child Desc 2', parent: 'Parent Two' },
      { id: 'c3', name: 'Child Three', description: 'Child Desc 3', parent: 'Parent Two' }
    ]);
  });

  it('generates correct parentMap structure', () => {
    const { result } = renderHook(() => useLearningPlanCompetenciesOptions());
    expect(result.current.parentMap['Parent One']).toEqual({
      id: 'p1',
      name: 'Parent One',
      description: 'Parent Desc 1',
      children: [
        { id: 'c1', name: 'Child One', description: 'Child Desc 1' }
      ]
    });
    expect(result.current.parentMap['Parent Two']).toEqual({
      id: 'p2',
      name: 'Parent Two',
      description: 'Parent Desc 2',
      children: [
        { id: 'c2', name: 'Child Two', description: 'Child Desc 2' },
        { id: 'c3', name: 'Child Three', description: 'Child Desc 3' }
      ]
    });
  });

  it('getChildrenForParent returns the correct children', () => {
    const { result } = renderHook(() => useLearningPlanCompetenciesOptions());

    expect(result.current.getChildrenForParent('Parent One')).toEqual([
      { id: 'c1', name: 'Child One', desc: 'Child Desc 1', parent: 'Parent One' }
    ]);
    expect(result.current.getChildrenForParent('Parent Two')).toEqual([
      { id: 'c2', name: 'Child Two', desc: 'Child Desc 2', parent: 'Parent Two' },
      { id: 'c3', name: 'Child Three', desc: 'Child Desc 3', parent: 'Parent Two' }
    ]);
    expect(result.current.getChildrenForParent('Nonexistent Parent')).toEqual([]);
  });

  it('getCompetencyById returns the correct competency', () => {
    const { result } = renderHook(() => useLearningPlanCompetenciesOptions());
    expect(result.current.getCompetencyById('p2')).toEqual({ id: 'p2', name: 'Parent Two', desc: 'Parent Desc 2' });
    expect(result.current.getCompetencyById('nonexistent')).toBeUndefined();
  });

  it('getCompetencyByName returns the correct competency', () => {
    const { result } = renderHook(() => useLearningPlanCompetenciesOptions());
    expect(result.current.getCompetencyByName('Child One')).toEqual({ id: 'c1', name: 'Child One', desc: 'Child Desc 1', parent: 'Parent One' });
    expect(result.current.getCompetencyByName('Does Not Exist')).toBeUndefined();
  });

  it('getKSAById returns the correct child competency', () => {
    const { result } = renderHook(() => useLearningPlanCompetenciesOptions());
    expect(result.current.getKSAById('c2')).toEqual({ id: 'c2', name: 'Child Two', desc: 'Child Desc 2', parent: 'Parent Two' });
    expect(result.current.getKSAById('p1')).toBeUndefined();
  });
});