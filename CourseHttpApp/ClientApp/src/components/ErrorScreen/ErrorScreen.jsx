import React from "react";
import {Box, Typography} from "@mui/material";
import bad from './../../images/bad_request.png'

const ErrorScreen = ({apiResponse}) => {
    console.log(apiResponse)
    return (
        <Box>
            <Typography mt={2} mb={2}>Response</Typography>
            <Box style={{display: "flex",flexDirection:'column'}}>
                <img src={bad} alt="bad-request" width={200} height={200}/>
                {apiResponse.message}
            </Box>
        </Box>
    )
}
export default ErrorScreen;