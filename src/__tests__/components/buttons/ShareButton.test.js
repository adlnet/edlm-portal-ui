import { act, fireEvent, render } from '@testing-library/react';
import { mockXapiEvents } from '@/__mocks__/mockXapi';
import { shared } from '@/utils/xapi/events';
import {
  useMockClipboard,
  useUnauthenticatedUser,
} from '@/__mocks__/predefinedMocks';
import ShareButton from '@/components/buttons/ShareBtn';

describe('ShareButton', () => {
  beforeEach(() => {
    mockXapiEvents();
    useUnauthenticatedUser();
    useMockClipboard();
  });
  it('should render correctly', () => {
    const screen = render(<ShareButton />);

    expect(screen.getByText('Share')).toBeEnabled();
  });

});
