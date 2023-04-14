import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ReportType = "image" | "user" | "comment"

export interface IReport {
    id: string,
    dateReported: string,
    reportReason: string,
    solved: boolean,
    type: ReportType,
    timesReported: number
}

export interface IReportsSlice {
    reports: IReport[];
}

const initialState: IReportsSlice = {
    reports: [],
};

export const reportsSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        getReportsRequest: (state) => { },
        setReports: (state, action: PayloadAction<IReport[]>) => {
            console.log("set reports", action.payload)
            state.reports = action.payload
        }
    },
});

export const { actions: reportsActions, reducer: reportsReducer } =
    reportsSlice;
