import React from "react";
import "./Register.css"
import {useNavigate} from "react-router-dom";
import {handleFormSubmit} from "../../Utils";

const  Register = () =>{
    let navigate = useNavigate()
    async function handleSubmit(event){
        const response = await handleFormSubmit(event,"/api/Reg")
        const user = await response.json()
        localStorage.setItem("access_token", user.value.access_token)
        navigate('/')
    }
    
    return(
        <form onSubmit={handleSubmit} className="form">
            <input name="name" placeholder="First Name"/>
            <input name="login" placeholder="Email"/>
            <input name="password" placeholder="Password" type="password"/>
            <input type="submit" value="Зарегистрироваться"/>
        </form>
    )
}
export default Register;