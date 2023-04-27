import { put, takeEvery, ForkEffect, call } from 'redux-saga/effects';
import { IReport, reportsActions } from './slice';
import { AxiosResponse } from "axios";
import { callApi } from '../api';
import { PayloadAction } from '@reduxjs/toolkit';


function mapReports(report: any): { [key: string]: IReport } {
  return Object.fromEntries(report.map((r: any) => {
    const Report: IReport = {
      id: r.id,
      dateReported: r.dateReported,
      reportReason: r.reason,
      solved: r.solved === 1,
      type: r.type,
      timesReported: r.totalReports,
      content: r.content
    }
    return [r.id, Report]
  }))
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

export function* watchSolveReport(
  action: PayloadAction<{ accepted: boolean, reportId: string }>
): Generator<any, void, never> {
  try {
    console.log("wsr")
    const { accepted, reportId } = action.payload

    yield call(callApi, 'POST', `/solveReport`,
      {
        "id": reportId,
        "comment": "perque se soluciona",
        "idMod": "1",
        "acceptReport": accepted
      })

  } catch (error) {
    console.error(error)
    // yield put(counterActions.incrementByAmountAsyncFailure());
  }
}

export function* watchReportSagas(): Generator<ForkEffect, void> {
  yield takeEvery(reportsActions.getReportsRequest, watchGetReports);
  yield takeEvery(reportsActions.solveReport, watchSolveReport);
}

const reportsSagas = watchReportSagas;

export default reportsSagas;
