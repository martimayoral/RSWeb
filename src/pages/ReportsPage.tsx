import { useEffect } from "react"
import { Report } from "../components/Report/Report"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { reportsActions } from "../redux/reports/slice"

export function ReportsPage() {
    const reports = useAppSelector(state => state.reports.reports)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(reportsActions.getReportsRequest())
    }, [dispatch])

    return <div>
        {Object.values(reports).map((r, i) => <Report report={r} key={i} />)}
    </div>
}