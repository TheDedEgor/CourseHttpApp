import React from "react";
import {Link} from 'react-router-dom'
import "./NotAuth.css"
import sticker from '../../images/bad_sticker.png'
const NotAuth = ({link}) => {
    return(
        <div className="error_course">
            <img src={sticker} alt="sticker"/>
            <h3>Вам не доступен {link}, пожалуйста, войдите в свой <Link to="/auth" className="auth_link">аккаунт</Link></h3>
        </div>
    )
}

export default NotAuth;