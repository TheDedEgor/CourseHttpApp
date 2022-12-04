import React, {useContext} from "react";
import {Box,Typography} from "@mui/material";
import "./Response.css"
import ReactCodeMirror from "@uiw/react-codemirror";
import {json} from '@codemirror/lang-json'
import {darkTheme, lightTheme} from "../../utils";
import {DataContext} from "../../context/DataProvider";

const Response = ({data}) =>{
    let obj = JSON.stringify(data,null,'\t')
    const {theme} = useContext(DataContext)
    return(
        <Box>
            <Typography mt={2} mb={2}>Response</Typography>
            <ReactCodeMirror
                className="text-area-json"
                value={obj}
                height="300px"
                extensions={[json()]}
                theme={theme === 'light' ? lightTheme : darkTheme}
            />
        </Box>
    )
}
export default Response;
