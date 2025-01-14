import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { fireEvent, render } from '@testing-library/react';
import Card from '@/components/Card';

const renderer = () => {
    return render(
      <QueryClientWrapper>
        <Card 
            title='Card Title'
            description='Card Description'
            buttonLabel='Button Label'
            image='N/A'
            route='#'>
            Test
        </Card>
      </QueryClientWrapper>
    );
};

const rendererNoDesc = () => {
    return render(
      <QueryClientWrapper>
        <Card 
            title='Card Title'
            description={null}
            buttonLabel='Button Label'
            image='N/A'
            route='#'>Test</Card>
      </QueryClientWrapper>
    );
};

describe ('Card component test', () => {
    it ('show that a card can render', () =>{
        const screen = renderer();
        expect(screen.getByText('Card Title'))
        expect(screen.getByText('Card Description'))
        fireEvent.click(screen.getByText('Button Label'))
    })  
    it ('show that a card can render w/out description', () =>{
        const screen = rendererNoDesc();
        expect(screen.getByText('Card Title'))
        fireEvent.click(screen.getByText('Button Label'))
    })  
})