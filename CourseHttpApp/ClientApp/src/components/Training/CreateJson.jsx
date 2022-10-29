import React,{useContext} from "react";
import {Typography,TextareaAutosize} from "@mui/material";
import {DataContext} from "../../context/DataProvider";

const textareaStyle = {
    width : '100%',
    padding:10,
    background:'url(https://i.imgur.com/2cOaJ.png)',
    backgroundAttachment:'local',
    backgroundRepeat:'no-repeat',
    paddingLeft:35,
    paddingTop:5,
    borderColor:"black"
}
const CreateJson = () =>{
    const {setJsonText} = useContext(DataContext) 
    const onValueChange = (e) =>{
        setJsonText(e.target.value)
    }
    return(
        <>
            <Typography mt={2} mb={2}>JSON</Typography>
            <TextareaAutosize
                minRows={3}
                maxRows={5}
                style={textareaStyle}
                onChange={(e) => onValueChange(e)}
            />
        </>
    )
}
export default CreateJson;