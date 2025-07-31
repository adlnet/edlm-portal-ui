import { render, screen } from '@testing-library/react';
import CompetencyChart from '@/components/CompetencyChart';

let capProps = {};

jest.mock('next/dynamic', () => () => {
  const DynamicComponent = (props) => {
    capProps = props;
    return <div data-testid='mock-chart'>Chart Component</div>;
  };
  return DynamicComponent;
});

describe('CompetencyChart', () => {
  const mockData = [
    { name: 'test1', courses: 1 },
    { name: 'test2', courses: 2 },
    { name: 'test3', courses: 3 }
  ];

  const mockColors = {
    test1: 'red',
    test2: 'yellow',
    test3: 'blue'
  }

  beforeEach(() => {
    capProps = null;
  })

  it('should render the chart', () => {
    render(<CompetencyChart data={mockData} colors={mockColors} />);

    expect(screen.getByTestId('mock-chart')).toBeInTheDocument();
  });

});