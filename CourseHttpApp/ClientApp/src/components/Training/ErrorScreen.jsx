import React from "react";
import {Box, TextareaAutosize, Typography} from "@mui/material";
import {AxiosError} from "axios";

const ErrorScreen = ({apiResponse}) =>{
    /*console.log(apiResponse.message)*/
    return(
        <Box>
            <Typography mt={2} mb={2}>Response</Typography>
            <Box style={{display:"flex"}}>
                <Box>
                    {apiResponse.message}
                </Box>
            </Box>
        </Box>
    )
}
export default ErrorScreen;