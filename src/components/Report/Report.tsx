import { Box, Button } from "@mui/material";
import { IReport } from "../../redux/reports/slice";

export function Report({ report }: { report: IReport }) {

    return <Box sx={{ m: 5, pb: 2, px: 2, border: '1px dashed grey' }}>
        <h2>Report</h2>
        <p><b>date:</b> {report.dateReported}</p>
        <p><b>type:</b> {report.type}</p>
        {/* <p><b>id:</b> {report.id}</p> */}
        {/* <p><b>solved?:</b> {report.solved ? "true" : "false"}</p> */}
        <p><b>reason:</b> {report.reportReason}</p>
        <p><b>numero de veces reportado:</b> {report.timesReported}</p>
        <Box>
            <Button variant="outlined" color="primary">+ More info</Button><br />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary">Deny - all ok</Button>
            <Button variant="contained" color="error">Accept - Block {report.type}</Button>
        </Box>
    </Box>
}