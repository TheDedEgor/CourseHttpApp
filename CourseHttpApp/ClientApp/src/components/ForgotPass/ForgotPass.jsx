import React from "react";
import "./ForgotPass.css"

const ForgotPass = () =>{
    return(
        <>
            <h3>Восстановление пароля</h3>
            <form className="form_forgot">
                <input name="login" placeholder="Введите email"/>
                <input type="submit" value="Отправить"/>
            </form> 
        </>
    )
}

export default ForgotPass;