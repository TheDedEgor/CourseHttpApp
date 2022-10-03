import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./Profile.css"
const Profile = () =>{
    let navigate = useNavigate()
    const token = sessionStorage.getItem("access_token")
    const handleLogOut = () =>{
        sessionStorage.removeItem("access_token")
        navigate('/')
    }
    return(
        <div>{token ? 
            <div>
                <p>Имя</p>
                <div>
                    <h3>Прогресс курса</h3>
                    <p></p>
                </div>
                <div onClick={() => handleLogOut()}>Выйти</div>
            </div> : 
            <p>Bad</p>
        }</div>
    )
}

export default Profile;