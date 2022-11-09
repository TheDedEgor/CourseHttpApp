import React,{createContext,useState} from "react";

export const  DataContext = createContext(null)

const DataProvider = ({children}) =>{
    const [formData,setFormData] = useState({url:'',type:'GET'})
    const [paramData,setParamData] = useState([])
    const [headerData,setHeaderData] = useState([])
    const [jsonText,setJsonText] = useState('')
    const [taskId,setTaskId] = useState(-1)
    const [progress,setProgress] = useState(0)
    return(
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
            setProgress
        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataProvider