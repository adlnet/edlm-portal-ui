import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { fireEvent, render } from '@testing-library/react';
import Accordion from '@/components/Accordion';

const renderer = () => {
    return render(
      <QueryClientWrapper>
        <Accordion acctitle='Accordion Title' accdescription='Accordion description' />
      </QueryClientWrapper>
    );
};

describe ('Accordion component test', () => {
    it ('show that an accordion can render', () =>{
        const screen = renderer();
        expect(screen.getByText('Accordion Title'))
        expect(screen.getByText('Accordion description'))
        fireEvent.click(screen.getByText('Accordion Title'))
        fireEvent.click(screen.getByText('Accordion Title'))
    })  
})