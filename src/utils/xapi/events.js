import { sendStatement, xapiObject } from '@/utils/xapi';

// helpers
function searchObject(keyword) {
  return xapiObject(
    `${window.location.origin}/search?keyword=${keyword}`,
    'https://w3id.org/xapi/acrossx/activities/webpage',
    'en',
    `ECC Search: ${keyword}`
  );
}

function courseObject(courseId, courseUrl, courseTitle, courseDescription) {
  const obj = xapiObject(
    courseUrl,
    'https://w3id.org/xapi/cmi5/activitytype/course', // TODO: this is probably too narrow, and risks conflict with id-type combinations with other systems.
    'en',
    courseTitle,
    courseDescription
  );
  obj.definition.extensions = {
    'https://xapi.edlm/profiles/edlm-ecc/concepts/activity-extensions/course-id':
      courseId,
  };
  return obj;
}

// when a search fires from the index or search page
export function searched(keyword) {
  sendStatement({
    verb: {
      id: 'https://w3id.org/xapi/acrossx/verbs/searched',
      display: {
        en: 'Searched',
      },
    },
    object: searchObject(keyword),
    context: {
      extensions: {
        'https://xapi.edlm/profiles/edlm-ecc/concepts/context-extensions/search-term':
          keyword,
      },
    },
  });
}

// when a user saves a search
export function saved(name, keyword) {
  sendStatement({
    verb: {
      id: 'https://activitystrea.ms/save',
      display: {
        en: 'Saved',
      },
    },
    object: searchObject(keyword),
    context: {
      extensions: {
        'https://xapi.edlm/profiles/edlm-ecc/concepts/context-extensions/saved-search-name':
          name,
        'https://xapi.edlm/profiles/edlm-ecc/concepts/context-extensions/search-term':
          keyword,
      },
    },
  });
}

// when a user saves a list of courses
export function curated(listId, listName, listDescription) {
  sendStatement({
    verb: {
      id: 'https://xapi.edlm/profiles/edlm-ecc/concepts/verbs/curated',
      display: {
        en: 'Curated',
      },
    },
    object: xapiObject(
      `${window.location.origin}/lists/${listId}`,
      'https://id.tincanapi.com/activitytype/playlist',
      'en',
      listName,
      listDescription
    ),
    context: {
      extensions: {
        'https://xapi.edlm/profiles/edlm-ecc/concepts/context-extensions/curated-list-id':
          listId,
      },
    },
  });
}

// when a user shares the ECC course page
export function shared(courseId, courseUrl, courseTitle, courseDescription) {
  sendStatement({
    verb: {
      id: 'https://adlnet.gov/expapi/verbs/shared',
      display: {
        en: 'Shared',
      },
    },
    object: courseObject(courseId, courseUrl, courseTitle, courseDescription),
  });
}

// when a user views a course on the ECC
// TODO: Every course NEEDS to have an IRI
export function explored(courseId, courseUrl, courseTitle, courseDescription) {
  sendStatement({
    verb: {
      id: 'https://w3id.org/xapi/tla/verbs/explored',
      display: {
        en: 'Explored',
      },
    },
    object: courseObject(courseId, courseUrl, courseTitle, courseDescription),
  });
}

// when a user follows the registration link for a course
export function viewed(courseId, courseUrl, courseTitle, courseDescription) {
  sendStatement({
    verb: {
      id: 'https://id.tincanapi.com/verb/viewed',
      display: {
        en: 'Viewed',
      },
    },
    object: courseObject(courseId, courseUrl, courseTitle, courseDescription),
  });
}