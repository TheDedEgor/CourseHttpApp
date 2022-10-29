import React from "react";
import {Box,Typography,TextareaAutosize} from "@mui/material";
import hash from "object-hash";

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

const Response = ({data}) =>{
    let obj = data
    if(!Array.isArray(obj)){
        let readableObj = '{ \n';
        for(let key in obj) {
            readableObj += '\t'
            readableObj += (typeof obj[key] === "string") ? `${key}: "${obj[key]}"` : `${key}: ${obj[key]}`;
            if (Object.keys(obj).pop() !== key.toString()) {
                readableObj += ',\n'
            }
        }
        readableObj += '\n}';
        return(
            <Box>
                <Typography mt={2} mb={2}>Response</Typography>
                <TextareaAutosize
                    minRows={3}
                    maxRows={5}
                    style={textareaStyle}
                    disabled="disabled"
                    value={readableObj}
                />
            </Box>
        )
    }
    else{
        let readableObj = '['
        for(let i = 0;i < obj.length; i++){
            readableObj += '\n\t{'
            readableObj +='\n'
            for(let key in obj[i]) {
                readableObj += '\t\t'
                readableObj += (typeof obj[i][key] === "string") ? `${key}: "${obj[i][key]}"` : `${key}: ${obj[i][key]}`;
                if (Object.keys(obj[i]).pop() !== key.toString()) {
                    readableObj += ',\n'
                }
            }
            readableObj += '\n\t},'
        }
        readableObj += '\n]'
        let hash = require('object-hash')
        return(
            <Box>
                <Typography mt={2} mb={2}>Response</Typography>
                <TextareaAutosize
                    minRows={3}
                    maxRows={6}
                    style={textareaStyle}
                    disabled="disabled"
                    value={readableObj}
                />
            </Box>
        )
    }
   /* return(
        <Box>
            <Typography mt={2} mb={2}>Response</Typography>
            <TextareaAutosize
                minRows={3}
                maxRows={5}
                style={textareaStyle}
                disabled="disabled"
                value={readableObj}
            />
        </Box>
    )*/
}
export default Response;
