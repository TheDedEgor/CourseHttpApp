import React, {useContext} from "react";
import {Typography} from "@mui/material";
import {DataContext} from "../../context/DataProvider";
import ReactCodeMirror from "@uiw/react-codemirror";
import {json} from '@codemirror/lang-json'
import "./CreateJson.css"
import {darkTheme, lightTheme} from "../../utils";

const CreateJson = () => {
    const {setJsonText, theme} = useContext(DataContext)
    
    const onChange = React.useCallback((value, viewUpdate) => {
        setJsonText(value)
    }, []);

    return (
        <>
            <Typography mt={2} mb={2}>JSON</Typography>
            <ReactCodeMirror
                className="text-area-json"
                extensions={[json()]}
                height="200px"
                theme={theme === 'light' ? lightTheme : darkTheme}
                onChange={onChange}
            />
        </>
    )
}
export default CreateJson;