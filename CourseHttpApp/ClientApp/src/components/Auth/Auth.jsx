import React from "react";
import "./Auth.css"

const  Auth = () =>{
    
    async function handleFormSubmit(event) {
        event.preventDefault();
        const data = serializeForm(event.target);
        const response = await sendData(data);
        console.log(response)
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
        <div>
            <form onSubmit={handleFormSubmit}>
                <input name="login"/>
                <input name="password"/>
                <input type="submit" value="Отправить"/>
            </form>
        </div>
    )
}
export default Auth;