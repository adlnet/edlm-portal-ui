import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { render } from '@testing-library/react';
import FlowbiteAccordion from '@/components/fAccordion';

const renderer = () => {
    return render(
      <QueryClientWrapper>
        <FlowbiteAccordion acctitle='Accordion Title' accdescription='Accordion description here' />
      </QueryClientWrapper>
    );
};

describe ('Flowbite Accordion Test', () => {
    it ('show that accordion can render', () =>{
        const screen = renderer();
        expect(screen.getByText('Accordion Title'))
        expect(screen.getByText('Accordion description here'))
    })  
})


  