import React from "react";
import "./NewPass.css"

const NewPass = () =>{
    return(
        <form>
            <input name="password" placeholder="Введите новый пароль"/>
            <input type="submit" value="Поменять пароль"/>
        </form>
    )
}

export default NewPass;