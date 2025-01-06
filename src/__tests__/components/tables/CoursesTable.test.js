import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { render } from '@testing-library/react';
import { CoursesTable } from '@/components/tables/CoursesTable';

const renderer = () => {
  return render(
    <QueryClientWrapper>
      <CoursesTable />
    </QueryClientWrapper>
  );
};

describe('Courses Table Tests', () => {
    it('Tests that the table renders', () => {
        const screen = renderer()
        expect(screen.findByText('Course Name'))
        expect(screen.findByText('Location'))
        expect(screen.findByText('Penetration Testing'))
    })
});