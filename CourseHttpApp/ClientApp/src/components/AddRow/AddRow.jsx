import React, {useState} from "react";
import './AddRow.css'
import {TableCell, TableRow, Checkbox, TextField} from "@mui/material";

const AddRow = ({rowId, data, setData}) => {
    const [checkCheckBox, setCheckCheckBox] = useState(false)

    const handleChange = (e) => {

        let result = data.filter(entry => entry.id === rowId)[0]
        if (!checkCheckBox) {
            setCheckCheckBox(true)
            result = {...result, id: rowId, check: true}
        } else {
            setCheckCheckBox(false)
            result = {...result, id: rowId, check: false}
        }

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
                />
            </TableCell>
            <TableCell align="right" className="tablecell">
                <TextField
                    className="text-field"
                    onChange={(e) => onTextChange(e)}
                    name="key"
                    autoComplete="off"
                />
            </TableCell>
            <TableCell align="right" className="tablecell">
                <TextField
                    className="text-field"
                    onChange={(e) => onTextChange(e)}
                    name="value"
                    autoComplete="off"
                />
            </TableCell>
        </TableRow>
    )
}

export default AddRow;