import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Profile.css";

const Profile = ({setToken}) => {
    let navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [progress, setProgress] = useState(26)
    useEffect(() => {
        getInfoUser()
    }, [])

    async function getInfoUser() {
        const token = localStorage.getItem("access_token")
        const response = await fetch("api/Profile", {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        })
        const data = (await response.json()).value;
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setEmail(data.email)
    }

    const handleLogOut = () => {
        localStorage.removeItem("access_token")
        setToken(undefined)
        navigate('/')
    }
    return (
        <div className="profile">
            <h1>Личный кабинет</h1>
            <div className="profile-top-block">
                <div className="profile-data">
                    <h3 className="profile-title">Персональные данные</h3>
                    <div className="profile-data-input">
                        <p>Имя</p>
                        <input value={firstName}/>
                        <p>Фамилия</p>
                        <input value={lastName}/>
                        <p>Email</p>
                        <input value={email}/>
                    </div>
                </div>
                <div className="profile-progress">
                    <div className="profile-progress-title">
                        <p>Прогресс курса</p>
                    </div>
                    <div className="progress-bar-block">
                        <progress max="100" value={progress} className="progress-bar-slice">
                            {progress} %
                        </progress>
                        <div style={{marginTop: '13px', marginLeft: '20px'}}>
                            {progress}/100
                        </div>
                    </div>
                </div>
            </div>
            <div className="btn-block">
                <p className="save-change-btn">Сохранить изменения</p>
                <p className="loginout-btn" onClick={() => handleLogOut()}>Выйти</p>
            </div>
        </div>
    )
}

export default Profile;