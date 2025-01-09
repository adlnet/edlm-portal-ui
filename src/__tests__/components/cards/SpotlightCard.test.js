import { render, screen } from '@testing-library/react';
import SpotlightCard from '@/components/cards/SpotlightCard';

describe('SpotlightCard test', () => {
    
    const course_1 = {
        name: 'Course Name',
        description: 'Test Description',
        lastViewed: 'Today',
    }
    
    const course_2 = {
        name: 'Course Name',
        description: 'Test Description',
    }
    
    it ('Should render the spotlight card:', () => {
        const screen = render(<SpotlightCard course={course_1} />);
        expect(screen.getByText('Course Name'))
    })

    it ('Should render the spotlight card w/out date', () => {
        const screen = render(<SpotlightCard course={course_2} />);
        expect(screen.getByText('Course Name'))
    })
})