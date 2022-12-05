import React from "react";
import {Box, Typography} from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import "./ErrorScreen.css";

const ErrorScreen = ({apiResponse}) => {
    return (
        <Box>
            <Typography className="title-table" component={'div'} mt={2} mb={2}>Response</Typography>
            <div className="response-error-block">
                <ErrorIcon className="response-error-icon"/>
                <div className="response-error">
                    {apiResponse.message}
                </div>
            </div>
        </Box>
    )
}
export default ErrorScreen;