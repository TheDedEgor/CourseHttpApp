import React,{useContext} from "react";
import {Typography,TextareaAutosize} from "@mui/material";
import {DataContext} from "../../context/DataProvider";
import {resizeWindow} from "../../Utils";
import ReactCodeMirror from "@uiw/react-codemirror";
import {json} from '@codemirror/lang-json'
import {myTheme} from "../../Utils";

const CreateJson = () =>{
    const {setJsonText} = useContext(DataContext) 
    const onValueChange = (e) =>{
        setJsonText(e.target.value)
        setTimeout(resizeWindow,10)
    }
    return(
        <>
            <Typography mt={2} mb={2}>JSON</Typography>
            <ReactCodeMirror
                style={{border:'1px solid black'}}
                extensions={[json()]}
                height="100px"
                theme={myTheme}
                onChange={(e) => onValueChange(e)}
            />
        </>
    )
}
export default CreateJson;