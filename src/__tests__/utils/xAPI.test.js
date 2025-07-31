import { axiosInstance } from '@/config/axiosConfig';
import { sendStatement, xapiObject } from '@/utils/xapi';
import { statementsUrl } from '@/config/endpoints.js';

jest.mock('@/config/axiosConfig', () => ({
  axiosInstance: {
    post: jest.fn(() => Promise.resolve({ data: 'mocked response' })),
  },
}));

describe('xapiObject', () => {
  const id = 'http://example.com/activity';
  const atype = 'http://example.com/activityType';
  const lang = 'en';
  const name = 'Test Activity';

  test('includes description when provided', () => {
    const description = 'This is a test activity';
    const result = xapiObject(id, atype, lang, name, description);

    expect(result).toEqual({
      id,
      objectType: 'Activity',
      definition: {
        type: atype,
        name: { [lang]: name },
        description: { [lang]: description },
      },
    });
  });

  test('omits description when null', () => {
    const description = null;
    const result = xapiObject(id, atype, lang, name, description);

    expect(result).toEqual({
      id,
      objectType: 'Activity',
      definition: {
        type: atype,
        name: { [lang]: name },
      },
    });
  });

  test('omits description when undefined', () => {
    const description = undefined;
    const result = xapiObject(id, atype, lang, name, description);

    expect(result).toEqual({
      id,
      objectType: 'Activity',
      definition: {
        type: atype,
        name: { [lang]: name },
      },
    });
  });
});

describe('sendStatement', () => {
  const originalWindowLocation = window.location;

  beforeAll(() => {
    // Mock window.location
    delete window.location;
    window.location = { href: 'https://example.com' };
  });

  afterAll(() => {
    // Restore window.location
    window.location = originalWindowLocation;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call console.error if verb is missing', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    await sendStatement({});
    expect(consoleSpy).toHaveBeenCalledWith('no verb!');
  });

  it('should call console.error if object is missing', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    await sendStatement({
      verb: 'explored',
    });
    expect(consoleSpy).toHaveBeenCalledWith('no object object');
  });

  it('should default object.id to window.location.href if none is provided', async () => {
    await sendStatement({
      verb: 'explored',
      object: { definitionName: 'Test Content' },
      resultExtName: 'score',
      resultExtValue: '100',
    });

    expect(axiosInstance.post).toHaveBeenCalledTimes(1);

    const [[url, payload]] = axiosInstance.post.mock.calls;
    expect(url).toBe(statementsUrl);
    expect(payload).toHaveLength(1);

    const statement = payload[0];
    expect(statement.object.id).toBe('https://example.com');
  });

  it('should create and forward a statement with the correct structure', async () => {
    await sendStatement({
      verb: {
        id: 'https://w3id.org/xapi/tla/verbs/explored',
        display: {
          en: 'Explored',
        },
      },
      object: {
        id: 'https://mysite.com/content/123',
        definition: {
          name: {
            en: 'My Content',
          },
          description: {
            en: 'This is a test content',
          },
        },
        objectType: 'Activity',
      },
      result: {
        extensions: {
          someKey: 'someValue',
        },
      },
    });

    expect(axiosInstance.post).toHaveBeenCalledTimes(1);

    const [[url, payload]] = axiosInstance.post.mock.calls;

    // Check URL
    expect(url).toBe(statementsUrl);

    // The payload to the LRS is an array with 1 statement
    expect(Array.isArray(payload)).toBe(true);
    expect(payload).toHaveLength(1);

    const statement = payload[0];

    // Basic statement structure checks
    expect(statement).toHaveProperty('actor');
    expect(statement).toHaveProperty('verb');
    expect(statement).toHaveProperty('object');
    expect(statement).toHaveProperty('context');
    expect(statement).toHaveProperty('timestamp');

    // Check actor structure
    expect(statement.actor.account.homePage).toBe('https://ecc.gov');
    expect(statement.actor.account.name).toBe('ECC User');
    expect(statement.actor.objectType).toBe('Agent');

    // Check verb structure
    expect(statement.verb.id).toBe('https://w3id.org/xapi/tla/verbs/explored');
    expect(statement.verb.display['en']).toBe('Explored');

    // Check object structure
    expect(statement.object.id).toBe('https://mysite.com/content/123');
    expect(statement.object.definition.name['en']).toBe('My Content');
    expect(statement.object.definition.description['en']).toBe(
      'This is a test content'
    );
    expect(statement.object.objectType).toBe('Activity');

    // Check result
    expect(statement.result.extensions.someKey).toBe('someValue');
  });
});
