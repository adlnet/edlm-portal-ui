import { axiosInstance } from '@/config/axiosConfig.js';
import { platform } from '@/config/xAPIConfig.js';
import { statementsUrl } from '@/config/endpoints.js';

// Send statement to the LRS Forwarding Endpoint
const forwardStatement = ({ statement }) => {
  return axiosInstance
    .post(statementsUrl, [statement])
    .catch((err) => console.error(err));
};

// Create a real, valid statement.
const prepareStatement = (partialStatement) => {
  return {
    actor: {
      // Send a dummy actor as this will be overwritten by the LRS
      account: {
        homePage: 'https://ecc.gov',
        name: 'ECC User',
      },
      objectType: 'Agent',
    },
    verb: partialStatement.verb,
    object: partialStatement.object,
    ...(partialStatement.result != null
      ? { result: partialStatement.result }
      : {}),
    context: {
      platform,
      ...partialStatement.context,
    },
    timestamp: new Date().toISOString(),
  };
};

export function xapiObject(id, atype, lang, name, description) {
  return {
    id,
    objectType: 'Activity',
    definition: {
      type: atype,
      name: { [lang]: name },
      ...(description != null ? { description: { [lang]: description } } : {}),
    },
  };
}

/**
 * Sends a statement to the LRS based on the context provided.
 * @param {{
 * verb:{id:string, display:string},
 * object:{id?:string, definitionName:string, description?:string},
 * resultExtName:string,
 * resultExtValue:string,
 * }} context
 * @returns {Promise}
 */

export function sendStatement(context) {
  // verify the required fields are present
  if (!context.verb) return console.error('no verb!');

  if (!context.object) return console.error('no object object');

  // get the window
  const windowLocation = window.location.href;

  // if the object has an id, use it otherwise populate it with the window location
  if (!context.object?.id) context.object.id = windowLocation;

  const statement = prepareStatement(context);

  return forwardStatement({ statement });
}