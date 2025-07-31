import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { render } from '@testing-library/react';
import Button from '@/components/Button';

const renderer = () => {
    return render(
      <QueryClientWrapper>
        <Button onClick={null} id='id1'>Test</Button>
      </QueryClientWrapper>
    );
};

describe ('Button component test', () => {
    it ('show that a button can render', () =>{
        const screen = renderer();
        expect(screen.getByText('Test'))
    })  
})