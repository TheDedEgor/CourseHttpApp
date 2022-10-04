import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Auth.css"

const  Auth = () =>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [emailDirty,setEmailDirty] = useState(false)
    const [passwordDirty,setPasswordDirty] = useState(false)
    const [emailError,setEmailError] = useState("Email не может быть пустым")
    const [passwordError,setPasswordError] = useState("Пароль не может быть пустым")
    const [formValid,setFormValid] = useState(false)
    const [validUser,setValidUser] = useState('')
    
    useEffect(() =>{
        if(emailError || passwordError){
            setFormValid(false)
        }else{
            setFormValid(true)
        }
    },[emailError,passwordError])
    
    let navigate = useNavigate()
    async function handleFormSubmit(event) {
        event.preventDefault();
        const data = serializeForm(event.target);
        const response = await sendData(data);
        const user = await response.json()
        if(user.statusCode === 404){
            setValidUser('Не верный логин или пароль!')
            setFormValid(false)
            setEmail('')
            setPassword('')
        }
        else{
            setValidUser('')
            sessionStorage.setItem("access_token", user.value.access_token)
            navigate('/')
        }
    }
    function serializeForm(formNode) {
        return new FormData(formNode)
    }

    async function sendData(data) {
        return await fetch('/api/Auth/', {
            method: 'POST',
            body: data,
        })
    }
    
    const blurHandler = (e) =>{
        switch (e.target.name){
            case "login":
                setEmailDirty(true)
                break
            case "password":
                setPasswordDirty(true)
                break
        }
    }
    const emailHandler = (e) =>{
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!re.test(String(e.target.value).toLowerCase())){
            setEmailError("Некорректный email")
        }
        else{
            setEmailError("")
        }
    }
    const passwordHandler = (e) =>{
        setPassword(e.target.value)
        if(e.target.value.length < 3){
            setPasswordError("Пароль не может быть меньше 3 символов")
            if(!e.target.value){
                setPasswordError("Пароль не может быть пустым")
            }
        }
        else{
            setPasswordError('')
        }
    }
    
    return(
        <div className="form_content">
            <h3>Вход</h3>
            <form onSubmit={handleFormSubmit} className="form">
                {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
                <input onChange={e => emailHandler(e)} value={email} onBlur={(e) => blurHandler(e)} name="login" placeholder="Email" className="auth_input"/>
                {(passwordDirty && passwordError) && <div style={{color:'red'}}>{passwordError}</div>}
                <input onChange={e => passwordHandler(e)} value={password} onBlur={(e) => blurHandler(e)} name="password" placeholder="Password" type="password" className="auth_input"/>
                <input disabled={!formValid} type="submit" value="Войти" className="auth_input submit"/>
                {validUser !== "" ? <div style={{color: 'red'}}>{validUser}</div> : <></>}
            </form>
            <div className="bottom_links">
                <Link to="/forgotPass" className="bottom_link">Забыли пароль</Link>
                <Link to="/reg" className="bottom_link">Еще не зарегистрирован!</Link>
            </div>
        </div>
    )
}
export default Auth;