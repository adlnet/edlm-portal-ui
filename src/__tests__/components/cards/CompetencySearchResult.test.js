import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { render } from '@testing-library/react';
import CompetencySearchResult from '@/components/cards/CompetencySearchResults';
import comp from '@/__mocks__/data/compResult.data';

const renderer = (props) => {
  return render(
    <QueryClientWrapper>
      <CompetencySearchResult key={comp.id} result={comp} />
    </QueryClientWrapper>
  );
};

describe('CompetencySearchResult', () => {
    
    it ('renders the competency data', () => {
        const screen = renderer();
        expect(screen.getByText('Competency #1: Operating Environment and System Design'))
    })
})
