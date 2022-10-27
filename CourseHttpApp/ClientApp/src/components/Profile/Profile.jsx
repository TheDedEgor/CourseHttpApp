import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./Profile.css";

const Profile = ({setToken}) => {
    let navigate = useNavigate()
    /*const token = localStorage.getItem("access_token")*/
    const handleLogOut = () => {
        localStorage.removeItem("access_token")
        setToken(undefined)
        navigate('/')
    }
    return (
        <div>
            <div className="profile">
                <h1>Личный кабинет</h1>
                <div className="profile-data">
                    <h3 className="profile-title">Персональные данные</h3>
                    <div className="profile-data-input">
                        <p>Имя</p>
                        <input/>
                        <p>Фамилия</p>
                        <input/>
                        <p>Email</p>
                        <input/>
                    </div>
                </div>
                <div className="theme-block">
                    <p>Выберите тему</p>
                </div>
                <div className="btn-block">
                    <p className="save-change-btn">Сохранить изменения</p>
                    <p className="loginout-btn" onClick={() => handleLogOut()}>Выйти</p>
                </div>
            </div>
        </div>
    )
}

export default Profile;