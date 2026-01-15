'use strict'

import { createContext, useContext } from 'react';

const ApplicationContext = createContext({
  saveApplication: null,
  isSaving: false,
});

export const ApplicationProvider = ApplicationContext.Provider;

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplicationContext error');
  }
  return context;
};
