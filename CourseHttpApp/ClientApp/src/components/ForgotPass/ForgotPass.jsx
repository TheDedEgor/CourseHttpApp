import React from "react";
import "./ForgotPass.css"

const ForgotPass = () =>{
    async function handleFormSubmit(event) {
        event.preventDefault();
        const data = serializeForm(event.target);
        const response = await sendData(data);
        const user = await response.json()
    }
    function serializeForm(formNode) {
        return new FormData(formNode)
    }

    async function sendData(data) {
        return await fetch('/api/Pass/', {
            method: 'POST',
            body: data,
        })
    }
    return(
        <>
            <h3>Восстановление пароля</h3>
            <form onSubmit={handleFormSubmit} className="form_forgot" >
                <input name="login" placeholder="Введите email"/>
                <input type="submit" value="Отправить"/>
            </form> 
        </>
    )
}

export default ForgotPass;