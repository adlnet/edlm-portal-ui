'use strict';

import queryString from 'querystring';
import { searchUrl } from '../config/endpoints';
import { useState } from 'react';

function makePath(params) {
  return `${searchUrl}?${queryString.stringify(params)}`;
}

export function useSearchUrl(initialQuery) {
  const [url, setNewUrl] = useState(() => makePath(initialQuery));

  const setUrl = (params) => {
    setNewUrl(makePath(params));
  };
  return { url, setUrl };
}
