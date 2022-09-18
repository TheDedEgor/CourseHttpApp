﻿import React from "react";
import "./Contacts.css"
import {BsTelegram} from "react-icons/bs"
import {AiTwotoneMail} from "react-icons/ai"
const Contacts = () =>{
    return(
        <div className="contacts">
            <p>Если есть вопросы по сервису или вы нашли какой то баг,то напишите нам.</p>
            <p>Мы всегда на связи и будем рады вам ответить!</p>
            <div className="first-person">
                <p>Иван Михайлович</p>
                <a className="social-links" href="https://telegram.me/devoidbark" title="Телеграм"><BsTelegram color="blue" size={30}/></a>
                <a className="social-links" href="mailto:petros_9002@mail.ru" title="Почта"><AiTwotoneMail color="red" size={30}/></a>
            </div>
            <div className="second-person">
                <p>Егор Витальевич</p>
                <a className="social-links" href="https://telegram.me/x_ternus"><BsTelegram color="blue" size={30}/></a>
                <a className="social-links" href="mailto:korepin.02@gmail.com"><AiTwotoneMail color="red" size={30}/></a>
            </div>
        </div>
    )
}
export default Contacts;