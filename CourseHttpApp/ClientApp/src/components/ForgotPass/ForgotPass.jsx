import React, {useState} from "react";
import "./ForgotPass.css"
import {handleFormSubmit} from "../../Utils";

const ForgotPass = () =>{
    const [validEmail,setValidEmail] = useState('')
    async function handleSubmit(event){
        const response = await handleFormSubmit(event,"/api/Pass");
        debugger;
        const data = await response.json();
        if(data.statusCode === 404){
            setValidEmail("Введён не верный email, попробуйте еще раз!")
            
        }
        else{
            setValidEmail("Письмо отправлено, в течение 1-3 минут сообщение придет на вашу почту. Проверьте папку \"Спам\".")
        }
    }
    return(
        <>
            <h3>Восстановление пароля</h3>
            <form onSubmit={handleSubmit} className="form_forgot" >
                <input name="login" placeholder="Введите email"/>
                <input type="submit" value="Отправить"/>
                {validEmail}
            </form> 
        </>
    )
}

export default ForgotPass;