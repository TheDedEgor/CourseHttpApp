import React, {useEffect, useState} from "react";
import {handleFormSubmit, resizeWindow} from "../../Utils";
import "./Auth.css";
import "../../css/modal.css";
import icon_close from '../../images/close.svg';
import icon_show from '../../images/show_pass.png';
import icon_hide from '../../images/hide_pass.png'
import AuthValid from "../AuthValid/AuthValid";

const Auth = ({setActiveAuth, setActiveReg, setActiveForgotPass, setToken}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [formValid, setFormValid] = useState(true)
    const [validUser, setValidUser] = useState('')

    useEffect(() => {
        setTimeout(resizeWindow, 10);
        document.body.style.overflowY = "hidden"
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();
        let email = document.getElementById("auth_email");
        let password = document.getElementById("auth_password");
        let check = true

        if (!email.value) {
            setEmailError("Введите Email!")
            check = false
        }
        if (!password.value) {
            setPasswordError("Введите Пароль!")
            check = false
        }

        if (check) {
            const response = await handleFormSubmit(event, "/api/Auth")
            const user = await response.json()
            if (user.statusCode === 404) {
                setValidUser('Неверный логин или пароль!')
                setFormValid(false)
                setEmail('')
                setPassword('')
            } else {
                setValidUser('')
                localStorage.setItem("access_token", user.value.access_token)
                localStorage.setItem("user_name", user.value.user_name)
                setToken(user.value.access_token)
                close()
            }
        }
    }
    const close = () => {
        setActiveAuth(false)
        setTimeout(resizeWindow, 10);
        document.body.style.overflow = "auto"
    }
    const emailHandler = (e) => {
        setEmail(e.target.value)
        setValidUser('')
        setFormValid(true)
        if (!e.target.value) {
            setEmailError("")
        } else {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!re.test(String(e.target.value).toLowerCase())) {
                setEmailError("Некорректный email")
                setFormValid(false)
            } else {
                setEmailError("")
            }
        }
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
        setValidUser('')
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
        let input = document.getElementById('auth_password');
        if (input.getAttribute('type') === 'password') {
            e.target.src = icon_hide;
            input.setAttribute('type', 'text');
        } else {
            e.target.src = icon_show;
            input.setAttribute('type', 'password');
        }
    }
    const showModalReg = () => {
        close()
        setActiveReg(true)
    }
    const showModalForgotPass = () => {
        close()
        setActiveForgotPass(true)
    }

    return (
        <div className="modal" onClick={() => close()}>
            <div className="form_content_auth" onClick={(e) => e.stopPropagation()}>
                <div className="header_modal">
                    <div className="title_header_auth">Вход</div>
                    <img className="icon_close" onClick={() => close()} src={icon_close} alt="Закрыть"/>
                </div>
                <form onSubmit={handleSubmit} className="form_auth">
                    <div className="container_form">
                        <input onChange={e => emailHandler(e)} value={email} name="login"
                               id="auth_email" placeholder="Почта" className="auth_input"/>
                        <AuthValid error_msg={emailError}></AuthValid>
                    </div>
                    <div className="container_form">
                        <input onChange={e => passwordHandler(e)} value={password}
                               name="password" id="auth_password" placeholder="Пароль" type="password"
                               className="auth_input"/>
                        <img alt="Пароль" onClick={(event) => showPassword(event)} className="auth_password_control"
                             src={icon_show}/>
                        <AuthValid error_msg={passwordError}></AuthValid>
                    </div>
                    <div className="container_form_btn">
                        <input disabled={!formValid} type="submit" value="Войти" className="submit_btn auth_btn"/>
                        <AuthValid error_msg={validUser}></AuthValid>
                    </div>
                </form>
                <div className="bottom_links">
                    <a onClick={() => showModalForgotPass()} className="bottom_link">Забыли пароль?</a>
                    <a onClick={() => showModalReg()} className="bottom_link">Еще не зарегистрированы?</a>
                </div>
            </div>
        </div>
    )
}
export default Auth;