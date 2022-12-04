import React, {useState} from "react";
import './AddRow.css'
import {TableCell, TableRow, Checkbox, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const AddRow = ({rows, addRows, rowId, data, setData}) => {
    const [checkCheckBox, setCheckCheckBox] = useState(false)

    const handleChange = (e) => {

        let result = data.filter(entry => entry.id === Number(e.target.name))[0]
        if (!checkCheckBox) {
            setCheckCheckBox(true)
            if (rowId === rows.length - 1) {
                addRows(oldArr => [...oldArr, rows.length])
            }
            result = {...result, id: rowId, check: true}
        } else {
            setCheckCheckBox(false)
            result = {...result, id: rowId, check: false}
        }

        let index = data.findIndex(value => value.id === Number(e.target.name))
        if (index === -1) {
            setData(oldArr => [...oldArr, result])
        } else {
            const newArr = Object.assign([...data], {
                [index]: result
            })
            setData(newArr)
        }
    }

    const deleteRow = () => {
        let newArr = rows.filter((item, index) => index !== rowId)
        addRows(newArr)
    }

    const onTextChange = (e) => {
        let result = data.filter(entry => entry.id === rowId)[0]
        result = {...result, id: rowId, [e.target.name]: e.target.value}
        let index = data.findIndex(value => value.id === rowId)
        if (index === -1) {
            setData(oldArr => [...oldArr, result])
        } else {
            const newArr = Object.assign([...data], {
                [index]: result
            })
            setData(newArr)
        }
    }

    return (
        <TableRow>
            <TableCell align="right" className="tablecell">
                <Checkbox
                    checked={checkCheckBox}
                    size="large"
                    className="checkbox"
                    onChange={(e) => handleChange(e)}
                    name={rowId}
                />
            </TableCell>
            <TableCell align="right" className="tablecell">
                <TextField
                    className="text-field"
                    onChange={(e) => onTextChange(e)}
                    name="key"
                />
            </TableCell>
            <TableCell align="right" className="tablecell">
                <TextField
                    className="text-field"
                    onChange={(e) => onTextChange(e)}
                    name="value"
                />
            </TableCell>
            {/*<TableCell align="right" className="tablecell">
                <IconButton onClick={() => deleteRow()}>
                    <DeleteIcon className="table-delete-icon"/>
                </IconButton>
            </TableCell>
            <TableCell align="right" className="tablecell">
                <div>{test}</div>
            </TableCell>*/}
        </TableRow>
    )
}

export default AddRow;