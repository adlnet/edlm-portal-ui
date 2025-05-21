import * as xapiActions from '@/utils/xapi/events';
import { mockSendStatement } from '@/__mocks__/mockXapi';
import { sendStatement } from '@/utils/xapi';

beforeEach(() => {
  mockSendStatement();
});

describe('xAPI Actions', () => {
  // We’ll temporarily override window.location so we can check the expected origin
  const originalLocation = window.location;

  beforeAll(() => {
    delete window.location;
    window.location = { origin: 'https://fakeorigin.com' };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  it('searched()', () => {
    xapiActions.searched('someKeyword');

    expect(sendStatement).toHaveBeenCalledTimes(1);
    expect(sendStatement).toHaveBeenCalledWith({
      verb: {
        id: 'https://w3id.org/xapi/acrossx/verbs/searched',
        display: {
          en: 'Searched',
        },
      },
      object: {
        id: 'https://fakeorigin.com/search?keyword=someKeyword',
        definition: {
          type: 'https://w3id.org/xapi/acrossx/activities/webpage',
          name: {
            en: 'ECC Search: someKeyword',
          },
        },
        objectType: 'Activity',
      },
      context: {
        extensions: {
          'https://xapi.edlm/profiles/edlm-ecc/concepts/context-extensions/search-term':
            'someKeyword',
        },
      },
    });
  });

  it('curated()', () => {
    xapiActions.curated('list123', 'Test List', 'List Description');

    expect(sendStatement).toHaveBeenCalledTimes(1);
    expect(sendStatement).toHaveBeenCalledWith({
      verb: {
        id: 'https://xapi.edlm/profiles/edlm-ecc/concepts/verbs/curated',
        display: {
          en: 'Curated',
        },
      },
      object: {
        id: 'https://fakeorigin.com/lists/list123',
        definition: {
          type: 'http://id.tincanapi.com/activitytype/playlist',
          name: {
            en: 'Test List',
          },
          description: {
            en: 'List Description',
          },
        },
        objectType: 'Activity',
      },
      context: {
        extensions: {
          'https://xapi.edlm/profiles/edlm-ecc/concepts/context-extensions/curated-list-id':
            'list123',
        },
      },
    });
  });

  it('shared()', () => {
    xapiActions.shared(
      'courseABC',
      'https://example.com/course',
      'Cool Course',
      'Awesome description'
    );

    expect(sendStatement).toHaveBeenCalledTimes(1);
    expect(sendStatement).toHaveBeenCalledWith({
      verb: {
        id: 'http://adlnet.gov/expapi/verbs/shared',
        display: {
          en: 'Shared',
        },
      },
      object: {
        id: 'https://example.com/course',
        definition: {
          type: 'https://w3id.org/xapi/cmi5/activitytype/course',
          name: {
            en: 'Cool Course',
          },
          description: {
            en: 'Awesome description',
          },
          extensions: {
            'https://xapi.edlm/profiles/edlm-ecc/concepts/activity-extensions/course-id':
              'courseABC',
          },
        },
        objectType: 'Activity',
      },
    });
  });

  it('saved()', () => {
    xapiActions.saved('someSavedSearchName', 'keyword123');

    expect(sendStatement).toHaveBeenCalledTimes(1);
    expect(sendStatement).toHaveBeenCalledWith({
      verb: {
        id: 'http://activitystrea.ms/save',
        display: {
          en: 'Saved',
        },
      },
      object: {
        id: 'https://fakeorigin.com/search?keyword=keyword123',
        definition: {
          type: 'https://w3id.org/xapi/acrossx/activities/webpage',
          name: {
            en: 'ECC Search: keyword123',
          },
        },
        objectType: 'Activity',
      },
      context: {
        extensions: {
          'https://xapi.edlm/profiles/edlm-ecc/concepts/context-extensions/saved-search-name':
            'someSavedSearchName',
          'https://xapi.edlm/profiles/edlm-ecc/concepts/context-extensions/search-term':
            'keyword123',
        },
      },
    });
  });

  it('explored()', () => {
    xapiActions.explored(
      'courseXYZ',
      'https://fakeorigin.com/course/courseXYZ',
      'Exploring Course',
      'Course Description'
    );

    expect(sendStatement).toHaveBeenCalledTimes(1);
    expect(sendStatement).toHaveBeenCalledWith({
      verb: {
        id: 'https://w3id.org/xapi/tla/verbs/explored',
        display: {
          en: 'Explored',
        },
      },
      object: {
        id: 'https://fakeorigin.com/course/courseXYZ',
        definition: {
          type: 'https://w3id.org/xapi/cmi5/activitytype/course',
          name: {
            en: 'Exploring Course',
          },
          description: {
            en: 'Course Description',
          },
          extensions: {
            'https://xapi.edlm/profiles/edlm-ecc/concepts/activity-extensions/course-id':
              'courseXYZ',
          },
        },
        objectType: 'Activity',
      },
    });
  });

  it('viewed()', () => {
    xapiActions.viewed(
      'course999',
      'https://fakeorigin.com/course/course999',
      'Viewed Course',
      'Viewed Course Description'
    );

    expect(sendStatement).toHaveBeenCalledTimes(1);
    expect(sendStatement).toHaveBeenCalledWith({
      verb: {
        id: 'http://id.tincanapi.com/verb/viewed',
        display: {
          en: 'Viewed',
        },
      },
      object: {
        id: 'https://fakeorigin.com/course/course999',
        definition: {
          type: 'https://w3id.org/xapi/cmi5/activitytype/course',
          name: {
            en: 'Viewed Course',
          },
          description: {
            en: 'Viewed Course Description',
          },
          extensions: {
            'https://xapi.edlm/profiles/edlm-ecc/concepts/activity-extensions/course-id':
              'course999',
          },
        },
        objectType: 'Activity',
      },
    });
  });
});