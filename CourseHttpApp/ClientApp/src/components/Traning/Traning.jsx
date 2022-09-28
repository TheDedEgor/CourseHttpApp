import React from "react";
import "./Traning.css"
import {Link} from 'react-router-dom'
const Traning = ({isRegister}) =>{
    return(
        <div>
            {isRegister?
                <p>Traning</p>:
                <div>Вам не доступен курс, войдите в свой <Link to="/profile">аккаунт</Link></div>
            }
        </div>
    )
}
export default Traning;