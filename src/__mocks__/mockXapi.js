import * as Xapi from '@/utils/xapi';
import * as XapiEvents from '@/utils/xapi/events';

function keepFreshAndMock(nsObj, mockedFnName, mockImpl) {
  if (nsObj[mockedFnName].mockRestore) {
    nsObj[mockedFnName].mockRestore();
  }
  jest.spyOn(nsObj, mockedFnName).mockImplementation(mockImpl);
}

export function mockSendStatement() {
  keepFreshAndMock(Xapi, 'sendStatement', () => Promise.resolve({}));
}

export function mockXapiEvents() {
  ['searched', 'saved', 'curated', 'shared', 'explored', 'viewed'].forEach(
    (fnName) => keepFreshAndMock(XapiEvents, fnName, jest.fn())
  );
}