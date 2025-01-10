import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { WorkRoleTable } from '@/components/tables/WorkRoleTable';
import { render } from '@testing-library/react';

const renderer = () => {
  return render(
    <QueryClientWrapper>
      <WorkRoleTable />
    </QueryClientWrapper>
  );
};

describe('Work Role Table Tests', () => {
    it('Tests that the table renders', () => {
        const screen = renderer()
        expect(screen.findByText('Start Date'))
        expect(screen.findByText('Functional Community'))
        expect(screen.findByText('Cyber'))
    })
});