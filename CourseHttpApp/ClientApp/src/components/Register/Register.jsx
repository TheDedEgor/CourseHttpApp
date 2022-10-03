import React from "react";
import "./Register.css"
import {useNavigate} from "react-router-dom";

const  Register = () =>{
    let navigate = useNavigate()
    async function handleFormSubmit(event) {
        event.preventDefault();
        const data = serializeForm(event.target);
        const response = await sendData(data);
        const user = await response.json()
        sessionStorage.setItem("access_token", user.value.access_token)
        navigate('/')
    }
    function serializeForm(formNode) {
        return new FormData(formNode)
    }

    async function sendData(data) {
        return await fetch('/api/Reg/', {
            method: 'POST',
            body: data,
        })
    }
    return(
        <form onSubmit={handleFormSubmit} className="form">
            <input name="name" placeholder="First Name"/>
            <input name="login" placeholder="Email"/>
            <input name="password" placeholder="Password" type="password"/>
            <input type="submit" value="Зарегистрироваться"/>
        </form>
    )
}
export default Register;