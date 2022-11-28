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
import {checkParams, getHeaderAndParams} from "../../utils";
import SnackBar from "./SnakBar";
import success_logo from '../../images/success.png'
import error_logo from '../../images/error-icon.png'
import LoadingSlider from "../UI/LoadingSlider/LoadingSlider";
import axios from "axios";
import {useNotification} from "use-toast-notification";

const Training = () => {
    const notification = useNotification()
    const token = localStorage.getItem("access_token")
    const {formData, setFormData} = useContext(DataContext)
    const {paramData, jsonText, setParamData, headerData, setHeaderData} = useContext(DataContext)
    const [value, setValue] = useState(0)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorResponse, setErrorResponse] = useState(false)
    const [apiResponse, setApiResponse] = useState({})
    const [task, setTask] = useState('')
    const [hashJson, setHashJson] = useState({})
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
   
    useEffect(() => {
        if (token !== null) {
            getTasks()
        }
    }, [])

    async function getTasks() {
        const response = await fetch("api/Training", {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        }).finally(() => {
            setLoading(false)
        })
        const data = await response.json();
        setTasks(data.value)
    }

    const handleChange = (e) => {
        setFormData({...formData, type: e.target.value})
    }
    const onUrlChange = (e) => {
        setFormData({...formData, url: e.target.value})
    }
    const handleChangeTabs = (event, newValue) => {
        setValue(newValue)
    }

    const onSendClick = async (id) => {
        const task_ = tasks.find(x => x.id === id)
        if (!checkParams(formData, jsonText, paramData, headerData, setErrorMessage)) {
            setError(true)
            return
        }
        
        const apiType = formData.type.toLowerCase()
        const apiURL = formData.url
        const apiHeaders = getHeaderAndParams(headerData)
        const apiParams = getHeaderAndParams(paramData)

        await axios({
            method: apiType,
            url: apiURL,
            body: jsonText,
            headers: apiHeaders,
            params: apiParams
        }).then((response) => {
            setErrorResponse(false)
            setApiResponse(response.data)
            setHashJson(response.data)
            let hash = require('object-hash')
            if (hash(response.data) === task.correct_hash) {
                task_.is_done = 1
                notification.show({
                    message: 'Задание выполнено верно!',
                    variant: 'success'
                })
            } else {
                task_.is_done = 0
                notification.show({
                    message: 'Ошибка в запросе, попробуйте еще раз!',
                    variant: 'error'
                })
            }
        }).catch((error) => {
            console.log("error")
            setErrorResponse(true)
            setApiResponse(error)
            task_.is_done = 0
        })

        await fetch("api/Training", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                task_id: id,
                is_done: task_.is_done === 1
            })
        })
    }
    const onClickTask = (id) => {
        const task_ = tasks.find(task => task.id === id)
        console.log(task_)
        setTask(task_)
    }
    return (
        <>
            {token ?
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div className="tasks" style={{width: '350px', position: "relative",marginLeft:'20px'}}>
                        {loading === true ? <LoadingSlider/> :
                            <div>
                                {tasks.map((task, id) => (
                                    <div className="task-item" onClick={() => onClickTask(task.id)} key={id}>
                                        <div>
                                            <p>Задание {id + 1}</p>
                                        </div>
                                        <div>
                                            {
                                                task.is_done === 1 
                                                    ? <img src={success_logo} alt="success" width={20} height={20}/>
                                                    : <img src={error_logo} alt="error" width={20} height={20}/>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                    {
                        task !== '' 
                            ? <div>{task && <div className="task">{task.description}</div>}<Box className="training-block">
                                    <Box className="form-block">
                                        <FormControl className="select">
                                            <InputLabel id="demo-simple-select-label"
                                                        style={{marginTop: '-7px',color:'white'}}
                                            >
                                                Method
                                            </InputLabel>
                                            <Select
                                                id="demo-simple-select-label"
                                                value={formData.type}
                                                label="Method"
                                                style={{height: '40px',backgroundColor:'white'}}
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
                                            onClick={() => onSendClick(task.id)}
                                            style={{backgroundColor: '#5e73d0'}}
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
                                    {errorResponse ? <ErrorScreen apiResponse={apiResponse}/>: <Response data={apiResponse}/>}
                                    {error && <SnackBar error={error} setError={setError} errorMsg={errorMessage}/>}
                                </Box></div>
                            : <div className="select-task">adfdsf</div>
                    }
                </div>
                :
                <NotAuthTraining/>
            }
        </>
    )
}
export default Training;