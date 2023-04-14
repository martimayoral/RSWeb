import { put, takeEvery, ForkEffect, call } from 'redux-saga/effects';
import { IReport, reportsActions } from './slice';
import { AxiosResponse } from "axios";
import { callApi } from '../api';


function mapReports(report: any): IReport[] {
  return report.map((r: any) => {
    const Report: IReport = {
      id: r.id,
      dateReported: r.dateReported,
      reportReason: r.reason,
      solved: r.solved === 1,
      type: r.type,
      timesReported: r.totalReports
    }
    console.log(Report)
    return Report
  })
}

export function* watchGetReports(): Generator<any, void, never> {
  try {
    const reports: AxiosResponse = yield call(callApi, 'GET', `/allReportsUnsolved`)

    yield put(reportsActions.setReports(mapReports(reports.data)));
  } catch (error) {
    console.error(error)
    // yield put(counterActions.incrementByAmountAsyncFailure());
  }
}

export function* watchCounterSagas(): Generator<ForkEffect, void> {
  yield takeEvery(reportsActions.getReportsRequest, watchGetReports);
}

const reportsSagas = watchCounterSagas;

export default reportsSagas;
