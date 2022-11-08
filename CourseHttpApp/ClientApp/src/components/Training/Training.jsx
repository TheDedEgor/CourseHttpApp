import React, {useState, useContext, useEffect} from "react";
import "./Training.css"
import NotAuthTraining from "../NotAuthTraining/NotAuthTraining";
import {Box, Select, MenuItem, TextField, Button, Tabs, Tab, FormControl} from '@mui/material'
import InputLabel from "@mui/material/InputLabel";
import CreateTable from "./CreateTable";
import CreateJson from "./CreateJson";
import Response from "./Response";
import ErrorScreen from "./ErrorScreen";
import {DataContext} from "../../context/DataProvider";
import {checkParams, resizeWindow} from "../../Utils";
import SnackBar from "./SnakBar";
import {getData} from "../../service/api";
import success_logo from '../../images/success.png'

const Training = ({tasks}) => {
    const token = localStorage.getItem("access_token")
    const {formData, setFormData} = useContext(DataContext)
    const {paramData, jsonText, setParamData, headerData, setHeaderData} = useContext(DataContext)
    const {taskId, setTaskId} = useContext(DataContext)
    const [value, setValue] = useState(0)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorResponse, setErrorResponse] = useState(false)
    const [apiResponse, setApiResponse] = useState({})
    const [task, setTask] = useState('')
    const [hashJson, setHashJson] = useState({})
    const [successOtvet, setSuccessOtvet] = useState(null)
    const [otvet, setOtvet] = useState(false)
    const [maxLenghtArray,setMaxLenghtArray] = useState(null)
    useEffect(() => {
        if(tasks.length > 7){
            setMaxLenghtArray(true)
        }
        else{
            setMaxLenghtArray(false)
        }
    },[tasks.length])
    const handleChange = (e) => {
        setFormData({...formData, type: e.target.value})
    }
    const onUrlChange = (e) => {
        setFormData({...formData, url: e.target.value})
    }
    const handleChangeTabs = (event, newValue) => {
        setValue(newValue)
    }

    const onSendClick = async () => {
        if (!checkParams(formData, jsonText, paramData, headerData, setErrorMessage)) {
            setError(true)
            return false
        }
        let response = await getData(formData, jsonText, paramData, headerData)
        if (response === 'error') {
            setErrorResponse(true)
            return
        }
        setErrorResponse(false)
        setApiResponse(response.data)
        setHashJson(response.data)
        let hash = require('object-hash')
        if (hash(hashJson) === successOtvet) {
            const task = tasks.find(task => task.success === successOtvet)
            setOtvet(true)
            setTaskId(task.id)
        } else {
            setOtvet(false)
        }
    }
    const onClickTask = (id) => {
        const task = tasks.find(task => task.id === id + 1)
        setSuccessOtvet(task.success)
        setTask(task.title)
        setTimeout(resizeWindow, 10)
    }
    console.log(maxLenghtArray)
    return (
        <>
            {token ?
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div className={`${maxLenghtArray ? "tasks" : "task-overflow-hidden"}`}>
                        {tasks.map((task, id) => (
                            <div className="task-item" onClick={() => onClickTask(id)} key={id}>
                                <div>
                                    <p>Задание {id + 1}</p>
                                </div>
                                <div>
                                    {(taskId === id + 1) &&
                                        <img src={success_logo} alt="success" width={20} height={20}/>}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        {task && <div className="task">{task}</div>}
                        <Box className="training-block">
                            <Box className="form-block">
                                <FormControl className="select">
                                    <InputLabel id="demo-simple-select-label"
                                                style={{marginTop: '-7px'}}>Method</InputLabel>
                                    <Select
                                        id="demo-simple-select-label"
                                        value={formData.type}
                                        label="Method"
                                        style={{height: '40px'}}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        <MenuItem value={'POST'}>POST</MenuItem>
                                        <MenuItem value={'GET'}>GET</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    size="small"
                                    className="url-input"
                                    onChange={(e) => onUrlChange(e)}
                                />
                                <Button
                                    className="send-btn"
                                    variant="contained"
                                    onClick={() => onSendClick()}
                                    style={{backgroundColor:'#5e73d0'}}
                                >
                                    Send
                                </Button>
                            </Box>
                            <Box className="select-tab-block">
                                <Tabs value={value}
                                      onChange={handleChangeTabs}
                                      TabIndicatorProps={{sx: {backgroundColor: 'blue', height: 4, bottom: 2}}}
                                      textColor="none"
                                >
                                    <Tab label="Params" className="tab-item"/>
                                    <Tab label="Headers" className="tab-item"/>
                                    <Tab label="Body" className="tab-item"/>
                                </Tabs>
                            </Box>
                            <Box
                                role="tabpanel"
                                hidden={value !== 0}
                                id={`simple-tabpanel-${0}`}
                                aria-labelledby={`simple-tab-${0}`}
                            >
                                <CreateTable text="Params" data={paramData} setData={setParamData}/>
                            </Box>
                            <Box
                                role="tabpanel"
                                hidden={value !== 1}
                                id={`simple-tabpanel-${1}`}
                                aria-labelledby={`simple-tab-${1}`}
                            >
                                <CreateTable text="Headers" data={headerData} setData={setHeaderData}/>
                            </Box>
                            <Box
                                role="tabpanel"
                                hidden={value !== 2}
                                id={`simple-tabpanel-${2}`}
                                aria-labelledby={`simple-tab-${2}`}
                            >
                                <CreateJson/>
                            </Box>
                            {errorResponse ? <ErrorScreen/> : <Response data={apiResponse}/>}
                            {error && <SnackBar error={error} setError={setError} errorMsg={errorMessage}/>}
                        </Box>
                    </div>
                </div>
                :
                <NotAuthTraining/>
            }
        </>
    )
}
export default Training;