import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import reposReducer from "./Containers/dashboard/reposState"

import repoSaga from './Containers/dashboard/reposSaga';

const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    repos:reposReducer
  },
  middleware:[saga]
});

saga.run(repoSaga);
