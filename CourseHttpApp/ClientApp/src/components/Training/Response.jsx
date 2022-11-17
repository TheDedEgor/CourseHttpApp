import React from "react";
import {Box,Typography} from "@mui/material";
import "./Response.css"
import ReactCodeMirror from "@uiw/react-codemirror";
import {json} from '@codemirror/lang-json'
import {myTheme} from "../../utils";

const Response = ({data}) =>{
    let obj = JSON.stringify(data,null,'\t')
    return(
        <Box>
            <Typography mt={2} mb={2}>Response</Typography>
            <ReactCodeMirror
                style={{border:'1px solid black'}}
                value={obj}
                height="200px"
                extensions={[json()]}
                theme={myTheme}
            />
        </Box>
    )
}
export default Response;
