import { render } from '@testing-library/react';
import priorityIcon from '@/utils/priorityIcon'; 

describe('priorityIcon', () => {
  it('returns ChevronDoubleDownIcon for Lowest', () => {
    const { container } = render(priorityIcon('Lowest'));
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('.text-green-500')).toBeInTheDocument();
  });

  it('returns ChevronDownIcon for Low', () => {
    const { container } = render(priorityIcon('Low'));
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('.text-green-500')).toBeInTheDocument();
  });

  it('returns Bars3Icon for Medium', () => {
    const { container } = render(priorityIcon('Medium'));
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('.text-yellow-800')).toBeInTheDocument();
  });

  it('returns ChevronUpIcon for High', () => {
    const { container } = render(priorityIcon('High'));
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('.text-green-500')).toBeInTheDocument();
  });

  it('returns ChevronDoubleUpIcon for Highest', () => {
    const { container } = render(priorityIcon('Highest'));
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('.text-red-500')).toBeInTheDocument();
  });

  it('returns null for unknown input', () => {
    const { container } = render(priorityIcon('other'));
    expect(container.firstChild).toBeNull();
  });

  it('returns null for null/undefined input', () => {
    const { container } = render(priorityIcon(undefined));
    expect(container.firstChild).toBeNull();
    const { container: c2 } = render(priorityIcon(null));
    expect(c2.firstChild).toBeNull();
  });
});