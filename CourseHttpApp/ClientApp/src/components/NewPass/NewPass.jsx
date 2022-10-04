import React, {useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {handleFormSubmit} from "../../Utils";
import "./NewPass.css"

const NewPass = () =>{
    const [searchParams,setSearchParams] = useSearchParams()
    let navigate = useNavigate()
    async function handleSubmit (event) {
        const response = await handleFormSubmit(event,"/api/rec")
        const data = await response.json()
        if(data.statusCode == 404){
            navigate('/forgotPass')
        }
        else{
            navigate('/auth')
        }
    }
    
    return(
        <form onSubmit={handleSubmit} className="form">
            <input type="hidden" name="key" value={searchParams.get("key")}/>
            <input type="password" name="new_password" placeholder="Введите новый пароль"/>
            <input type="submit" value="Поменять пароль"/>
        </form>
    )
}

export default NewPass;