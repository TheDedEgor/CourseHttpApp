import "./ProfileEdit.css"
import React, {useContext, useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import toast from "react-hot-toast";
import {DataContext} from "../../context/DataProvider";
import {resizeWindow} from "../../utils";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import {StyledEngineProvider} from "@mui/material/styles";

const ProfileEdit = ({data, setData}) => {
    const {setUserName} = useContext(DataContext)
    /*const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState(true)*/
    const [name, setName] = useState('')
    const [nameValid, setNameValid] = useState(true)
    /*const [errorMsg, setErrorMsg] = useState("")*/
    const [lastName, setLastName] = useState('')
    const [send, setSend] = useState(false)
    /*const emailInput = useRef()*/
    const nameInput = useRef()

    useEffect(() => {
        setName(data.first_name)
        setLastName(data.last_name)
        /*setEmail(data.email)*/
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();

        setSend(true)
        const sendData = new FormData(event.target)
        const token = localStorage.getItem("access_token")
        await fetch("/api/Profile", {
            method: 'POST',
            body: sendData,
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(() => {
            const copyData = Object.assign([], data)
            copyData.first_name = sendData.get("first_name").trim()
            copyData.last_name = sendData.get("last_name").trim()
            setData(copyData)
            setUserName(sendData.get("first_name").trim())
            setName(sendData.get("first_name").trim())
            setLastName(sendData.get("last_name").trim())
            setTimeout(resizeWindow, 10)
            toast.success('Данные успешно обновлены!')
        }).catch(() => {
            toast.error('Произошла ошибка! Попробуйте позже!')
        }).finally(() => {
            setSend(false)
        })
    }

    const nameHandler = (e) => {
        setName(e.target.value)
        setNameValid(true)
        if (!e.target.value.trim()) {
            setNameValid(false)
            nameInput.current.classList.add("error-input-edit-info");
        } else {
            nameInput.current.classList.remove("error-input-edit-info");
        }
    }

    /*const emailHandler = (e) => {
        setEmail(e.target.value)
        setEmailValid(true)
        if (!e.target.value) {
            setEmailValid(false)
            setErrorMsg("Поле обязательно для заполнения")
            emailInput.current.classList.add("error-input-edit-info");
        } else {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!re.test(String(e.target.value).toLowerCase())) {
                setEmailValid(false)
                setErrorMsg("Введите корректный email")
                emailInput.current.classList.add("error-input-edit-info");
            } else {
                emailInput.current.classList.remove("error-input-edit-info");
            }
        }
    }*/

    const lastNameHandler = (e) => {
        setLastName(e.target.value)
    }

    return (
        <div className="profile-edit-block">
            <NavLink to="/profile" className="return-profile-btn">
                <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M.999 6.987c0-.233.08-.46.23-.639l4-4.99a1.002 1.002 0 0 1 1.767.548.998.998 0 0 1-.227.73l-3.48 4.351 3.32 4.351a.997.997 0 0 1-.15 1.407 1 1 0 0 1-1.46-.14l-3.83-4.99a.996.996 0 0 1-.17-.628Z"
                        fill="currentColor"></path>
                </svg>
                Назад
            </NavLink>
            <div className="title-edit-block">
                Личные данные
            </div>
            <form name="edit" onSubmit={handleSubmit}>
                <label className="title-input-edit-info">
                    Имя
                    <input ref={nameInput} autoComplete="off" name="first_name" onChange={e => nameHandler(e)}
                           className="input-edit-info" type="text" value={name}/>
                    {!nameValid ? <div className="error-msg-edit">Поле обязательно для заполнения</div> : <></>}
                </label>
                <label className="title-input-edit-info">
                    Фамилия
                    <input value={lastName} onChange={e => lastNameHandler(e)} autoComplete="off" name="last_name"
                           className="input-edit-info"
                           type="text"/>
                </label>
                {/* <label className="title-input-edit-info">
                    Эл. почта
                    <input ref={emailInput} autoComplete="off" onChange={e => emailHandler(e)} value={email}
                           name="email"
                           className="input-edit-info"
                           type="email"/>
                    {!emailValid ? <div className="error-msg-edit">{errorMsg}</div> : <></>}
                </label>*/}
                <StyledEngineProvider injectFirst>
                    <LoadingButton
                        type="submit"
                        size="small"
                        color="primary"
                        loading={send}
                        loadingPosition="start"
                        startIcon={<SaveIcon/>}
                        variant="contained"
                        disabled={!nameValid}
                        className="btn-edit-info"
                    >
                        Сохранить
                    </LoadingButton>
                </StyledEngineProvider>
            </form>
        </div>
    )
}

export default ProfileEdit;