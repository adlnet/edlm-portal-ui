'use strict';

import { useState } from 'react';

export default function useField(initialValue) {
  const [fields, setField] = useState(() => initialValue);

  function updateKeyValuePair(key, value) {
    setField((previous) => ({ ...previous, [key]: value }));
  }

  function resetKey(key) {
    const modified = { ...fields };
    modified[key] = '';
    setField(modified);
  }
  

  return { fields, updateKeyValuePair, resetKey };
}
