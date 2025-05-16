'use strict';

import { endpoint, key, secret } from '@/config/xAPIConfig';
import XAPI from "@xapi/xapi";

let xapiInstance = null;

// Checking if env set correctly
console.log('Endpoint:', process.env.NEXT_PUBLIC_XAPI_LRS_ENDPOINT);
console.log('KeyLog', !!process.env.NEXT_PUBLIC_XAPI_LRS_KEY);

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
