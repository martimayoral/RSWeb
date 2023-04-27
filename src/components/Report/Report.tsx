import { Box, Button, TextField } from "@mui/material";
import { IReport, reportsActions } from "../../redux/reports/slice";
import { useAppDispatch } from "../../redux/hooks";

export function Report({ report }: { report: IReport }) {
    const dispatch = useAppDispatch()

    const handleDeny = () => dispatch(reportsActions.solveReport({ accepted: false, reportId: report.id }))
    const handleAccept = () => dispatch(reportsActions.solveReport({ accepted: true, reportId: report.id }))

    return <Box sx={{ m: 5, pb: 2, px: 2, border: '1px dashed grey', display: "flex", flexDirection: "column" }}>
        <h2>Report</h2>
        <Box display="flex" justifyContent="space-between">
            <Box maxHeight={200}>
                <img src={report.content} alt="Report content" style={{ width: "100%", height: "100%", objectFit: "contain" }} loading="lazy" />
            </Box>
            <Box>
                <p><b>id:</b> {report.id}</p>
                <p><b>date:</b> {report.dateReported}</p>
                <p><b>type:</b> {report.type}</p>
                <p><b>reason:</b> {report.reportReason}</p>
                <p><b>times reported:</b> {report.timesReported}</p>
            </Box>
        </Box>
        <Box>
            <Button variant="outlined" color="primary">+ More info</Button><br />
        </Box>
        <br />
        <Box>
            <TextField id="outlined-basic" label="Comment" variant="outlined" fullWidth />
        </Box>
        <br />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={handleDeny}>Deny - all ok</Button>
            <Button variant="contained" color="error" onClick={handleAccept}>Accept - Block {report.type}</Button>
        </Box>
    </Box>
}