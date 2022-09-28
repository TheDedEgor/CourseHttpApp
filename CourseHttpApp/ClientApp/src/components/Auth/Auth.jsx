import React from "react";
import {useNavigate} from "react-router-dom";
import "./Auth.css"

const  Auth = ({setIsRegister}) =>{
    let navigate = useNavigate()
    async function handleFormSubmit(event) {
        event.preventDefault();
        const data = serializeForm(event.target);
        const response = await sendData(data);
        const user = await response.json()
        sessionStorage.setItem("access_token", user.value.access_token)
        navigate('/')
        setIsRegister(true)
    }
    function serializeForm(formNode) {
        return new FormData(formNode)
    }

    async function sendData(data) {
        return await fetch('/api/auth/', {
            method: 'POST',
            body: data,
        })
    }
    return(
            <form onSubmit={handleFormSubmit} className="form">
                <input name="login"/>
                <input name="password"/>
                <input type="submit" value="Отправить"/>
            </form>
    )
}
export default Auth;