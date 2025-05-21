'use strict';

import { endpoint, key, secret } from '@/config/xAPIConfig';
import XAPI from "@xapi/xapi";

// jsut for debugging
console.log('Lrs key:', key ? 'Available' : 'MISSING');
console.log('Check lrskey:', !!process.env.NEXT_PUBLIC_XAPI_LRS_KEY);

let xapiInstance = null;

class XAPIMapper {

  constructor() {
    const auth = XAPI.toBasicAuth(key, secret);

    if (!xapiInstance) { xapiInstance = this; }
    if (endpoint) {
      this.xapiInstance = new XAPI({
        endpoint: endpoint,
        auth: auth
      });
    }

    return xapiInstance;
  }

  sendStatement = ({ statement }) => {
    return this.xapiInstance?.sendStatement({ statement }).catch((err) => console.error('Error sending statement', err));
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (new XAPIMapper);
