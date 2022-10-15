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
        <div className="modal">
            <div className="form_content_reg">
                <form onSubmit={handleSubmit} className="form">
                    <input name="name" placeholder="First Name"/>
                    <input name="login" placeholder="Email"/>
                    <input name="password" placeholder="Password" type="password"/>
                    <input type="submit" value="Зарегистрироваться"/>
                </form>
            </div>
        </div>
        
    )
}
export default Register;