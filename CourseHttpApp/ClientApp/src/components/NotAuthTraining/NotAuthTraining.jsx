import React from "react";
import './NotAuthTraining.css'
import sticker from "../../images/bad_sticker.png";

const NotAuthTraining = () => {
    return (
        <div className="not-auth-training-block">
            <img src={sticker} alt="Стикер" width="300" height="300"/>
            <div className="title-not-auth-training">
                Пожалуйста авторизуйтесь для продолжения
            </div>
        </div>
    )
}

export default NotAuthTraining;