import { put, takeEvery, ForkEffect, call } from 'redux-saga/effects';
import { IReport, reportsActions } from './slice';
import { AxiosResponse } from "axios";
import { callApi } from '../api';
import { PayloadAction } from '@reduxjs/toolkit';


function mapReports(report: any): { [key: string]: IReport } {
  // console.log(report)
  console.log(report)
  return Object.fromEntries(report.map((r: any) => {
    const Report: IReport = {
      id: r.Id,
      dateReported: r.DateReported,
      reportReason: r.Reason,
      solved: r.Solved === 1,
      type: r.Type,
      timesReported: r.totalReports,
      content: r.Content
    }
    return [r.Id, Report]
  }))
}

function* watchGetReports(): Generator<any, void, never> {
  try {
    const reports: AxiosResponse = yield call(callApi, 'GET', `/allReportsUnsolved`, { limit: 50 })

    yield put(reportsActions.setReports(mapReports(reports.data)));
  } catch (error) {
    console.error(error)
    // yield put(counterActions.incrementByAmountAsyncFailure());
  }
}

function* watchSolveReport(
  action: PayloadAction<{ status: number, reportId: string, comment: string }>
): Generator<any, void, never> {
  try {
    const { status, reportId, comment } = action.payload
    /* 
        yield call(callApi, 'POST', `/solveReport`,
          {
            "id": reportId,
            "comment": comment,
            "idMod": "1",
            "status": status
          }) */

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
