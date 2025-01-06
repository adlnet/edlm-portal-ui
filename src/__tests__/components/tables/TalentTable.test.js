import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { render } from '@testing-library/react';
import { TalentTable } from '@/components/tables/TalentTable';

const renderer = () => {
  return render(
    <QueryClientWrapper>
      <TalentTable />
    </QueryClientWrapper>
  );
};

describe('Talent Table Tests', () => {
    it('Tests that the table renders', () => {
        const screen = renderer()
        expect(screen.findByText('Last Name'))
        expect(screen.findByText('Current Position'))
        expect(screen.findByText('Marine'))
    })
});