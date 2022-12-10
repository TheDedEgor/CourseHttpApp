import React, {createContext, useState} from "react";
import {useTheme} from "./useTheme";

export const DataContext = createContext(null)

const DataProvider = ({children}) => {
    const [formData, setFormData] = useState({url: '', type: 'GET'})
    const [paramData, setParamData] = useState([])
    const [headerData, setHeaderData] = useState([])
    const [jsonText, setJsonText] = useState('')
    const [taskId, setTaskId] = useState(-1)
    const [progress, setProgress] = useState(0)
    const [userName, setUserName] = useState(localStorage.getItem("user_name"))
    const [token, setToken] = useState(localStorage.getItem("access_token"));
    const {theme, setTheme} = useTheme()

    return (
        <DataContext.Provider value={{
            formData,
            setFormData,
            paramData,
            setParamData,
            headerData,
            setHeaderData,
            jsonText,
            setJsonText,
            taskId,
            setTaskId,
            progress,
            setProgress,
            theme,
            setTheme,
            userName,
            setUserName,
            token,
            setToken
        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataProvider