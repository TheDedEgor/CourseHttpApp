import React from "react";
import "./Traning.css"
import {Link} from 'react-router-dom'
import sticker from '../../images/bad_sticker.png'
const Traning = () =>{
    const token = sessionStorage.getItem("access_token")
    return(
        <div>
            {token?
                <p>Traning</p>:
                <div className="error_traning">
                    <img src={sticker} alt="sticker"/>
                    <h3>Вам не доступен тренажёр, пожалуйста, войдите в свой <Link to="/auth" className="auth_link">аккаунт</Link></h3>
                </div>
            }
        </div>
    )
}
export default Traning;