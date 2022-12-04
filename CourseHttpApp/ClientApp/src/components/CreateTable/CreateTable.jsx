import React, {useState} from "react";
import './CreateTable.css'
import {Box, Typography, Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import AddRow from "../AddRow/AddRow";

const CreateTable = ({text, data, setData}) => {
    const [rows, addRows] = useState([0])
    
    return (
        <Box>
            <Typography component={'span'} mt={2} mb={2}>{text}</Typography>
            <Table className="table" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tablecell"></TableCell>
                        <TableCell className="tablecell">KEY</TableCell>
                        <TableCell className="tablecell">VALUE</TableCell>
                        {/*<TableCell className="tablecell"></TableCell>
                        <TableCell className="tablecell"></TableCell>*/}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <AddRow rows={rows}
                                addRows={addRows}
                                rowId={index}
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