import { isDev } from '@app/utils/app';
import { ActionCreatorsMapObject, bindActionCreators, configureStore } from '@reduxjs/toolkit';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { SNAPSHOT } from './constants';
import { session } from './session';

export const store = configureStore({
  reducer: {
    [session.name]: session.reducer,
  },

  devTools: isDev() ? { name: 'Chess3D', trace: true } : false,
});

export const useActions = <A, M extends ActionCreatorsMapObject<A>>(actions: M): M =>
  // Disabled to avoid unnecessary rerenders
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => bindActionCreators(actions, store.dispatch), []);

export const useStateMirroringEffect = () => {
  const state = useSelector((state) => state);

  useEffect(() => {
    localStorage.setItem(SNAPSHOT, JSON.stringify(state));
  }, [state]);
};

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
