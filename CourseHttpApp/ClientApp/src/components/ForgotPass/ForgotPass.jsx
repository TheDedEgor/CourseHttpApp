import React, {useState} from "react";
import "./ForgotPass.css"
import {handleFormSubmit} from "../../Utils";

const ForgotPass = () =>{
    const [validEmail,setValidEmail] = useState('')
    const [email,setEmail] = useState('')
    const [emailError,setEmailError] = useState('')
    const [emailDirty,setEmailDirty] = useState(false)
    async function handleSubmit(event){
        const response = await handleFormSubmit(event,"/api/Pass");
        debugger;
        const data = await response.json();
        if(data.statusCode === 404){
            setValidEmail("Введён не верный email, попробуйте еще раз!")
        }
        else{
            setValidEmail("Письмо отправлено, в течение 1-3 минут сообщение придет на вашу почту.\n Проверьте папку \"Спам\".")
            setEmail('')
        }
    }
    
    const handleInputChange =(e)=> {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("Некорректный email")
        } else {
            setEmailError("")
        }
    }    
    
        const blurHandler = (e) =>{
            switch (e.target.name){
                case "login":
                    setEmailDirty(true)
                    break
            }
        }
    return(
        <>
            <h3>Восстановление пароля</h3>
            <form onSubmit={handleSubmit} className="form_forgot" >
                {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
                <input onBlur={e => blurHandler(e)} name="login" placeholder="Введите email" value={email} onChange={handleInputChange}/>
                <input type="submit" value="Отправить"/>
                {validEmail}
            </form> 
        </>
    )
}

export default ForgotPass;