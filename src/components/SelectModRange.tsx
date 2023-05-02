import { useRef, useContext, createContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LicencePermision, lincencePermisions } from '../assets/global';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material';
import clsx from 'clsx';
import { Theme, SxProps } from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.action.active,

    '&.hover': {
        backgroundColor: theme.palette.action.selected,
    },
    '&.selected': {
        backgroundColor: theme.palette.action.focus,
    },
}));

const HoverContext = createContext<{ colHover: number, setColHover: any }>({
    colHover: 0,
    setColHover: (auth: boolean) => { }
});
const SelectedContext = createContext<{ colSelect: number, setColSelect: any }>({
    colSelect: 0,
    setColSelect: (auth: boolean) => { }
});

function Cell({ children, colIndex, sx }: {
    children?: React.ReactNode, colIndex?: number, sx?: SxProps<Theme> | undefined
}) {
    const hoverContext = useContext(HoverContext)
    const selectedContext = useContext(SelectedContext)

    return (
        <StyledTableCell
            sx={sx}
            className={clsx({ 'hover': hoverContext.colHover === colIndex, 'selected': selectedContext.colSelect === colIndex })}
            onPointerEnter={() => colIndex !== undefined && hoverContext.setColHover(colIndex)}
            onPointerLeave={() => colIndex !== undefined && hoverContext.setColHover(-1)}
            onPointerDown={() => colIndex !== undefined && selectedContext.setColSelect(colIndex)}
        >
            {children}
        </StyledTableCell>
    )
}

function ActiveCell({ avaliable, colIndex }: { avaliable?: boolean, colIndex: number }) {
    return (
        <Cell colIndex={colIndex}>
            {avaliable ?
                <CheckCircleIcon color="success" /> :
                <CancelIcon color="error" />
            }
        </Cell>
    )
}

function Row({ label, rowType }: { label: string, rowType: keyof LicencePermision }) {
    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { borderBottom: 0 } }}>
            <Cell sx={{ borderRight: "1px solid" }}>{label}</Cell>
            {lincencePermisions.map((row, i) =>
                <ActiveCell key={row.name} avaliable={!!row[rowType]} colIndex={i} />
            )}
        </TableRow>
    )
}

function Head() {
    return (
        <TableHead>
            <TableRow >
                <Cell sx={{ borderRight: "1px solid" }}></Cell>
                {lincencePermisions.map((row, i) =>
                    <Cell key={row.name} colIndex={i}>
                        {row.name}
                    </Cell>
                )}
            </TableRow>
        </TableHead>
    )
}

export default function SelectModRange({ selected, setSelected }: { selected: number, setSelected: React.Dispatch<React.SetStateAction<number>> }) {
    const [colHover, setColHover] = useState(0)

    return (
        <TableContainer sx={{ borderRadius: "20px" }} component={Paper}>
            <HoverContext.Provider value={{ colHover, setColHover }}>
                <SelectedContext.Provider value={{ colSelect: selected, setColSelect: setSelected }}>
                    <Table sx={{ minWidth: { "xs": "unset", "md": 600 } }} size="small" aria-label="a dense table">
                        <Head />
                        <TableBody >
                            <Row rowType='solveReports' label="Solve Reports" />
                            <Row rowType='createNewMod' label="Create New Mod" />
                            <Row rowType='geoAnalytics' label="Geo analytics" />
                            <Row rowType='logOverview' label="Log overview" />
                            <Row rowType='sendGlobalMessage' label="Global message" />
                        </TableBody>
                    </Table>
                </SelectedContext.Provider>
            </HoverContext.Provider>
        </TableContainer>
    );
}
