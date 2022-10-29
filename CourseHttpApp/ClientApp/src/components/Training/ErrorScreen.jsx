import React from "react";
import {Box, TextareaAutosize, Typography} from "@mui/material";

const ErrorScreen = () =>{
    const error = 'http://i.stack.imgur.com/01tZQ.png'
    return(
        <Box>
            <Typography mt={2} mb={2}>Response</Typography>
            <Box style={{display:"flex"}}>
                <img src={error} alt="error" style={{width:'60%',margin:'auto',height:'auto'}}/>
            </Box>
        </Box>
    )
}
export default ErrorScreen;