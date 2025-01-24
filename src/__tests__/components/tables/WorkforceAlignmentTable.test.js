import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { WorkforceAlignmentTable } from '@/components/tables/WorkforceAlignmentTable';
import { render } from '@testing-library/react';

const renderer = () => {
  return render(
    <QueryClientWrapper>
      <WorkforceAlignmentTable />
    </QueryClientWrapper>
  );
};

describe('Workforce Agent Alignment Table Tests', () => {
    it('Tests that the table renders', () => {
        const screen = renderer()
        expect(screen.findByText('Last Name'))
        expect(screen.findByText('IDP Alignment'))
        expect(screen.findByText('15 courses'))
    })
});