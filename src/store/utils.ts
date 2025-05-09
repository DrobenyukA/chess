import { logError } from '@app/utils/logger';
import get from 'lodash/get';

import { SNAPSHOT } from './constants';

export const getInitialState = <T extends object>(name: string, fallback: T): T => {
  const snapshot = localStorage.getItem(SNAPSHOT);

  if (snapshot) {
    try {
      const state = JSON.parse(snapshot);

      return get(state, name, fallback);
    } catch (e) {
      logError(e);
    }
  }

  return fallback;
};
