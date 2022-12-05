import React, {useState} from "react";
import './CreateTable.css'
import {Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddRow from "../AddRow/AddRow";

const CreateTable = ({text, data, setData}) => {
    const [rows, addRows] = useState([0])

    const deleteRow = () => {
        let newArr = rows.slice(0, -1)
        if (newArr.length > 0) {
            addRows(newArr)
        }
    }

    const addRow = () => {
        addRows(oldArr => [...oldArr, rows.length])
    }

    return (
        <Box>
            <Typography className="title-table" component={'div'} mt={2} mb={2}>{text}</Typography>
            <Table className="table" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tablecell">
                            <IconButton className="btn-table" title="Add row" onClick={addRow}>
                                <AddIcon/>
                            </IconButton>
                            <IconButton className="btn-table" title="Remove row" onClick={deleteRow}>
                                <RemoveIcon/>
                            </IconButton>
                        </TableCell>
                        <TableCell className="tablecell">KEY</TableCell>
                        <TableCell className="tablecell">VALUE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <AddRow rowId={index}
                                key={index}
                                data={data}
                                setData={setData}/>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}

export default CreateTable;