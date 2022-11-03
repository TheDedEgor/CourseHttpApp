import React,{useState} from "react";
import './AddRow.css'
import {TableCell, TableRow, Checkbox, TextField} from "@mui/material";
import {resizeWindow} from "../../Utils";

const AddRow = ({addRows,rowId,data,setData}) =>{
    const [checkCheckBox,setCheckCheckBox] = useState(false)
    
    const handleChange = (e) =>{
        let result = data.filter(entry => entry.id === Number(e.target.name))[0]
        setTimeout(resizeWindow,10)
        if(!checkCheckBox){
            setCheckCheckBox(true)
            addRows(oldArr => [...oldArr,rowId])
            result ={...result,id:rowId,check:true}
        }else{
            setCheckCheckBox(false)
            result = {...result,id:rowId,check:false}
        }

        let index = data.findIndex(value => value.id === Number(e.target.name))
        if(index === -1){
            setData(oldArr => [...oldArr,result])
        }else{
            const newArr = Object.assign([...data],{
                [index]:result
            })
            setData(newArr)
        }
    }
    const onTextChange = (e) =>{
        let result = data.filter(entry => entry.id === rowId)[0]
        result = {...result,id:rowId,[e.target.name]:e.target.value}
        let index = data.findIndex(value => value.id === rowId)
        if(index === -1){
            setData(oldArr => [...oldArr,result])
        }else{
            const newArr = Object.assign([...data],{
                [index]:result
            })
            setData(newArr)
        }
    }
    return(
        <TableRow>
            <TableCell align="right" className="tablecell">
                <Checkbox
                    checked={checkCheckBox}
                    size="large"
                    className="checkbox"
                    onChange={(e) =>handleChange(e)}
                    name={rowId}
                />
            </TableCell>
            <TableCell align="right" className="tablecell">
                <TextField
                    className="text-field"
                    InputProps={{style:{height:30,padding:'0 5px'}}}
                    onChange={(e) => onTextChange(e)}
                    name="key"
                />
            </TableCell>
            <TableCell align="right" className="tablecell">
                <TextField
                    className="text-field"
                    InputProps={{style:{height:30,padding:'0 5px'}}}
                    onChange={(e) => onTextChange(e)}
                    name="value"
                />
            </TableCell>
        </TableRow>
    )
}

export default AddRow;