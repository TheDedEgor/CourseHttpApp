import "./ProfileInfo.css"
import React from "react";
import {useNavigate} from "react-router-dom";

const ProfileInfo = ({name}) => {
    const navigate = useNavigate()

    const clickInfoEdit = () => {
        navigate("/profile/edit")
    }

    return (
        <div className="info-block">
            <div className="info-block-title">Информация</div>
            <div className="info-block-description">
                <div className="info-block-data">
                    <div className="info-block-avatar">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2a10 10 0 0 0-7.35 16.76 10.001 10.001 0 0 0 14.7 0A10 10 0 0 0 12 2Zm0 18a8 8 0 0 1-5.55-2.25 6 6 0 0 1 11.1 0A8 8 0 0 1 12 20Zm-2-10a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm8.91 6A8 8 0 0 0 15 12.62a4 4 0 1 0-6 0A8 8 0 0 0 5.09 16 7.92 7.92 0 0 1 4 12a8 8 0 0 1 16 0 7.921 7.921 0 0 1-1.09 4Z"
                                fill="currentColor"></path>
                        </svg>
                    </div>
                    <div className="info">
                        <p className="info-title">Личные данные</p>
                        <span className="info-name">{name}</span>
                    </div>
                </div>
                <button className="info-change-btn" onClick={clickInfoEdit}>Изменить</button>
            </div>
        </div>
    )
}

export default ProfileInfo;