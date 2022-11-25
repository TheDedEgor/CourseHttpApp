import React from "react";
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
                <a className="social-links" target="_blank" href="https://telegram.me/devoidbark" title="Телеграм">
                    <BsTelegram size={40}/>
                </a>
                <a className="social-links" href="mailto:petros_9002@mail.ru" title="Почта">
                    <AiTwotoneMail size={40}/>
                </a>
            </div>
            <div className="second-person">
                <p>Егор Витальевич</p>
                <a className="social-links" target="_blank" href="https://telegram.me/x_ternus">
                    <BsTelegram size={40}/>
                </a>
                <a className="social-links" href="mailto:korepin.02@gmail.com">
                    <AiTwotoneMail size={40}/>
                </a>
            </div>
        </div>
    )
}
export default Contacts;