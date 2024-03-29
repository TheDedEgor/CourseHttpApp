﻿import React, {useState, useContext, useEffect} from "react";
import "./Training.css"
import NotAuthTraining from "../NotAuthTraining/NotAuthTraining";
import {Box, Select, MenuItem, TextField, Button, Tabs, Tab, FormControl} from '@mui/material'
import InputLabel from "@mui/material/InputLabel";
import CreateTable from "../CreateTable/CreateTable";
import CreateJson from "../CreateJson/CreateJson";
import Response from "../Response/Response";
import ErrorScreen from "../ErrorScreen/ErrorScreen";
import {DataContext} from "../../context/DataProvider";
import {checkParams, getHeaderAndParams} from "../../utils";
import SnackBar from "../SnakBar/SnakBar";
import success_logo from '../../images/success.png'
import error_logo from '../../images/error-icon.png'
import LoadingSlider from "../UI/LoadingSlider/LoadingSlider";
import axios from "axios";
import {StyledEngineProvider} from "@mui/material/styles";
import toast from "react-hot-toast";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import styled, {keyframes} from 'styled-components';
import {headShake} from 'react-animations';
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from '@mui/icons-material/Send';

const bounceAnimation = keyframes`${headShake}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
  animation-iteration-count: infinite;
`;

const Training = () => {
    const {
        paramData,
        jsonText,
        setParamData,
        headerData,
        setHeaderData,
        formData,
        setFormData,
        token
    } = useContext(DataContext)
    const [urlValue, setUrlValue] = useState("")
    const [value, setValue] = useState(0)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorResponse, setErrorResponse] = useState(false)
    const [apiResponse, setApiResponse] = useState({})
    const [task, setTask] = useState('')
    const [hashJson, setHashJson] = useState({})
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [responseLoading, setResponseLoading] = useState(false)

    useEffect(() => {
        if (token) {
            getTasks()
        }
    }, [token])

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
        setUrlValue(e.target.value)
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

        setResponseLoading(true)
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
                toast.success('Задание выполнено верно!')
            } else {
                task_.is_done = 0
                toast.error('Задание решено неверно, попробуйте еще раз!')
            }
        }).catch((error) => {
            setErrorResponse(true)
            setApiResponse(error)
            task_.is_done = 0
        }).finally(() => {
            setResponseLoading(false)
            setFormData({...formData, url: ""})
            setUrlValue("")
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
        setTask(task_)
    }

    return (
        <StyledEngineProvider injectFirst>
            {token ?
                <div className="training-tasks">
                    <div className="tasks-block">
                        {loading ? <LoadingSlider/> :
                            <>
                                {tasks.map((task, id) => (
                                    <div className="task-item" onClick={() => onClickTask(task.id)} key={id}>
                                        <div>
                                            {task.title}
                                        </div>
                                        <div>
                                            {
                                                task.is_done === 1
                                                    ? <img src={success_logo} alt="success" width={20} height={20}/> :
                                                    task.is_done === 0 ?
                                                        <img src={error_logo} alt="error" width={20}
                                                             height={20}/> : <></>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </>
                        }
                    </div>
                    {
                        task !== ''
                            ?
                            <div className="response-block">
                                {task &&
                                    <div className="task">
                                        <div className="task-title">
                                            {task.title}
                                        </div>
                                        {task.description}
                                    </div>
                                }
                                <Box className="training-block">
                                    <Box className="form-block">
                                        <FormControl className="select-response">
                                            <InputLabel className="label-response"
                                                        id="demo-simple-select-label">
                                                Метод
                                            </InputLabel>
                                            <Select id="demo-simple-select-label"
                                                    className="select-type"
                                                    value={formData.type}
                                                    label="Метод"
                                                    onChange={(e) => handleChange(e)}>
                                                <MenuItem value={'GET'}>GET</MenuItem>
                                                <MenuItem value={'POST'}>POST</MenuItem>
                                                <MenuItem value={'PUT'}>PUT</MenuItem>
                                                <MenuItem value={'PATCH'}>PATCH</MenuItem>
                                                <MenuItem value={'DELETE'}>DELETE</MenuItem>
                                                <MenuItem value={'HEAD'}>HEAD</MenuItem>
                                                <MenuItem value={'OPTIONS'}>OPTIONS</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            size="small"
                                            className="url-input"
                                            onChange={(e) => onUrlChange(e)}
                                            value={urlValue}
                                        />
                                        <StyledEngineProvider injectFirst>
                                            <LoadingButton
                                                size="small"
                                                color="primary"
                                                loading={responseLoading}
                                                loadingPosition="start"
                                                startIcon={<SendIcon/>}
                                                variant="contained"
                                                className="send-btn"
                                                onClick={() => onSendClick(task.id)}
                                            >
                                                Send
                                            </LoadingButton>
                                        </StyledEngineProvider>
                                        {/* <Button
                                                    className="send-btn"
                                                    variant="contained"
                                                    onClick={() => onSendClick(task.id)}>
                                                    Send
                                                </Button>*/}
                                    </Box>
                                    <Box className="select-tab-block">
                                        <Tabs value={value} onChange={handleChangeTabs} textColor="inherit">
                                            <Tab label="Params" className="tab-item"/>
                                            <Tab label="Headers" className="tab-item"/>
                                            <Tab label="Body" className="tab-item"/>
                                        </Tabs>
                                    </Box>
                                    <Box
                                        role="tabpanel"
                                        hidden={value !== 0}
                                        id={`simple-tabpanel-${0}`}
                                        aria-labelledby={`simple-tab-${0}`}>
                                        <CreateTable text="Params" data={paramData} setData={setParamData}/>
                                    </Box>
                                    <Box
                                        role="tabpanel"
                                        hidden={value !== 1}
                                        id={`simple-tabpanel-${1}`}
                                        aria-labelledby={`simple-tab-${1}`}>
                                        <CreateTable text="Headers" data={headerData} setData={setHeaderData}/>
                                    </Box>
                                    <Box
                                        role="tabpanel"
                                        hidden={value !== 2}
                                        id={`simple-tabpanel-${2}`}
                                        aria-labelledby={`simple-tab-${2}`}>
                                        <CreateJson/>
                                    </Box>
                                    {errorResponse ? <ErrorScreen apiResponse={apiResponse}/> :
                                        <Response data={apiResponse}/>}
                                    {error && <SnackBar error={error} setError={setError} errorMsg={errorMessage}/>}
                                    <div style={{height: "20px"}}></div>
                                </Box>
                            </div>
                            :
                            <div className="select-task">
                                <div className="arrows-select-task">
                                    <BouncyDiv>
                                        <ArrowBackIcon className="arrow-icon"/>
                                    </BouncyDiv>
                                    <BouncyDiv>
                                        <ArrowBackIcon className="arrow-icon"/>
                                    </BouncyDiv>
                                    <BouncyDiv>
                                        <ArrowBackIcon className="arrow-icon"/>
                                    </BouncyDiv>
                                </div>
                                <div className="title-select-task">
                                    Выберите задачу из списка
                                </div>
                            </div>
                    }
                </div>
                :
                <NotAuthTraining/>
            }
        </StyledEngineProvider>
    )
}
export default Training;