import React,{useContext} from "react";
import {Typography} from "@mui/material";
import {DataContext} from "../../context/DataProvider";
import ReactCodeMirror from "@uiw/react-codemirror";
import {json} from '@codemirror/lang-json'
import {myTheme} from "../../utils";

const CreateJson = () =>{
    const {setJsonText} = useContext(DataContext) 
    const onValueChange = (e) =>{
        setJsonText(e.target.value)
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