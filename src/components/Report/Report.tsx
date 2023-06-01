import { useState, Fragment } from "react"
import { Box, Button, TextField, Typography, Collapse } from "@mui/material";
import { IReport, reportsActions } from "../../redux/reports/slice";
import { useAppDispatch } from "../../redux/hooks";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function StarRate({ onRate }: { onRate: (i: number) => void }) {
    const [stars, setStars] = useState(1)

    return (
        <Fragment>
            <Typography pr={1}>{stars}</Typography>
            {[1, 2, 3, 4, 5].map((i) =>
                <div key={i} onMouseEnter={() => setStars(i)} onClick={() => onRate(i)}>
                    {
                        i <= stars ? (
                            < StarIcon color="error" />
                        ) : (
                            < StarBorderIcon color="error" />
                        )
                    }
                </div>
            )}
        </Fragment>
    )
}

export function Report({ report }: { report: IReport }) {
    const dispatch = useAppDispatch()

    const [comment, setComment] = useState("")
    const [acceptConfirm, setAcceptConfirm] = useState(false)

    const handleSolve = (status: number) => dispatch(reportsActions.solveReport({ status, reportId: report.id, comment }))

    return (
        <Collapse in={!report.solved} timeout={1000}>
            <Box sx={{ m: 5, pb: 2, px: 2, border: '1px dashed grey', display: "flex", flexDirection: "column" }}>

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
                    <TextField id="outlined-basic" label="Comment" variant="outlined" fullWidth value={comment} onChange={e => setComment(e.target.value)} />
                </Box>
                <br />
                <Box sx={{ height: "30px", display: "flex", justifyContent: "space-between" }}>
                    <Button variant="contained" color="primary" onClick={() => handleSolve(0)}>Deny - all ok</Button>
                    {
                        acceptConfirm ? (
                            <Box display={"flex"} alignContent={"center"} justifyContent={"center"}>
                                <Typography pr={1}>Gravity: </Typography>
                                <StarRate onRate={(i) => handleSolve(i)} />
                            </Box>
                        ) : (
                            <Button variant="contained" color="error" onClick={() => setAcceptConfirm(true)}>Accept - Block {report.type}</Button>
                        )
                    }
                </Box>
            </Box >
        </Collapse>
    )
}