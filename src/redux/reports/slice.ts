import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ReportType = "image" | "user" | "comment"

export interface IReport {
    id: string,
    dateReported: string,
    reportReason: string,
    solved: boolean,
    type: ReportType,
    timesReported: number,
    accepted?: boolean,
    content: string
}

export interface IReportsSlice {
    reports: { [key: string]: IReport }
}

const initialState: IReportsSlice = {
    reports: {},
};

export const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        getReportsRequest: (state) => { },
        setReports: (state, action: PayloadAction<{ [key: string]: IReport }>) => {
            console.log("set reports", action.payload)
            state.reports = action.payload
        },
        solveReport: (state, action: PayloadAction<{ accepted: boolean, reportId: string, comment: string }>) => {
            const { accepted, reportId } = action.payload
            state.reports[reportId].solved = true
            state.reports[reportId].accepted = accepted
        }
    },
});

export const { actions: reportsActions, reducer: reportsReducer } =
    reportsSlice;
