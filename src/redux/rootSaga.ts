import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';
import counterSagas from './counter/saga';
import reportsSagas from './reports/saga';

export default function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([
    fork(counterSagas),
    fork(reportsSagas)
  ]);
}
