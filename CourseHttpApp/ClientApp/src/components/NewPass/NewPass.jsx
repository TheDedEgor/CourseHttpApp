import React, {useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {handleFormSubmit, resizeWindow} from "../../Utils";
import "./NewPass.css"
import icon_close from "../../images/close.svg";
import AuthValid from "../AuthValid/AuthValid";
import icon_show from "../../images/show_pass.png";
import icon_hide from "../../images/hide_pass.png";
import {useNotification} from "use-toast-notification";

const NewPass = () => {
    const notification = useNotification()
    const [searchParams, setSearchParams] = useSearchParams()
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState("")
    const [formValid, setFormValid] = useState(true)

    let navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        let password = document.getElementById("new_password");
        let check = true

        if (!password.value) {
            setPasswordError("Введите Пароль!")
            check = false
        }

        if (check) {
            const response = await handleFormSubmit(event, "/api/rec")
            const data = await response.json()
            if (data.statusCode === 404) {
                close()
                notification.show({
                    message: 'Что-то пошло не так, попробуйте еще раз!',
                    variant: 'error'
                })
            } else {
                close()
                notification.show({
                    message: 'Пароль был успешно изменен!',
                    variant: 'success'
                })
            }
        }
    }

    const close = () => {
        navigate('/')
        const links = document.querySelectorAll(".menu-item");
        links[0].click()
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        setFormValid(true)
        if (!e.target.value) {
            setPasswordError("")
        } else {
            if (e.target.value.length < 6) {
                setPasswordError("Пароль не может быть меньше 6 символов")
                setFormValid(false)
            } else {
                setPasswordError('')
            }
        }
    }

    const showPassword = (e) => {
        let input = document.getElementById('new_password');
        if (input.getAttribute('type') === 'password') {
            e.target.src = icon_hide;
            input.setAttribute('type', 'text');
        } else {
            e.target.src = icon_show;
            input.setAttribute('type', 'password');
        }
    }

    return (
        <div className="modal" onClick={() => close()}>
            <div className="form_content_new_pass" onClick={(e) => e.preventDefault()}>
                <div className="header_modal">
                    <div className="title_header_new_pass">Новый пароль</div>
                    <img className="icon_close" onClick={() => close()} src={icon_close} alt="Закрыть"/>
                </div>
                <form onSubmit={handleSubmit} className="form_new_pass">
                    <input type="hidden" name="key" value={searchParams.get("key")}/>
                    <div className="container_form">
                        <input onChange={e => passwordHandler(e)} value={password}
                               name="new_password" id="new_password" placeholder="Пароль" type="password"
                               className="new_pass_input"/>
                        <img alt="Пароль" onClick={(event) => showPassword(event)} className="auth_password_control"
                             src={icon_show}/>
                        <AuthValid error_msg={passwordError}></AuthValid>
                    </div>
                    <div className="container_form_btn">
                        <input disabled={!formValid} type="submit" value="Выбрать" className="submit_btn new_pass_btn"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewPass;