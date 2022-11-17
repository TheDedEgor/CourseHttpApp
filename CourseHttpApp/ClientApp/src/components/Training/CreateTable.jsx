import React,{useState} from "react";
import './CreateTable.css'
import {Box,Typography, Table,TableHead,TableRow,TableCell,TableBody} from "@mui/material";
import AddRow from "./AddRow";

const CreateTable = ({text,data,setData}) =>{
    const [rows,addRows] = useState([0])
    return(
        <Box>
            <Typography mt={2} mb={2}>{text}</Typography>
            <Table className="table" sx={{ minWidth: "100%"}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tablecell"></TableCell>
                        <TableCell className="tablecell">KEY</TableCell>
                        <TableCell className="tablecell">VALUE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{borderBottom:'1px solid black'}}>
                    {rows.map((row,index) =>(
                        <AddRow addRows={addRows}
                                rowId={index}
                                key={index}
                                data={data}
                                setData={setData}
                        />
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}

export default CreateTable;