import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {handleFormSubmit} from "../../Utils";
import "./Auth.css";
import icon_close from '../../images/close.svg';
import icon_show from '../../images/show_pass.png';
import icon_hide from '../../images/hide_pass.png'
import AuthValid from "../AuthValid/AuthValid";

const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [formValid, setFormValid] = useState(true)
    const [validUser, setValidUser] = useState('')

    let navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault();
        let email = document.getElementById("auth_email");
        let password = document.getElementById("auth_password");
        let check = true

        if (!email.value) {
            setEmailError("Введите email!")
            check = false
        }
        if (!password.value) {
            setPasswordError("Введите пароль!")
            check = false
        }
        if (check) {
            const response = await handleFormSubmit(event, "/api/Auth")
            const user = await response.json()
            if (user.statusCode === 404) {
                setValidUser('Не верный логин или пароль!')
                setFormValid(false)
                setEmail('')
                setPassword('')
            } else {
                setValidUser('')
                localStorage.setItem("access_token", user.value.access_token)
                navigate('/')
            }
        }
    }

    const close = () => {
        navigate('/')
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
            if (e.target.value.length < 3) {
                setPasswordError("Пароль не может быть меньше 3 символов")
                setFormValid(false)
            } else {
                setPasswordError('')
            }
        }
    }

    const test = (e) => {
        let input = document.getElementById('auth_password');
        if (input.getAttribute('type') === 'password') {
            e.target.src = icon_hide;
            input.setAttribute('type', 'text');
        } else {
            e.target.src = icon_show;
            input.setAttribute('type', 'password');
        }
    }

    return (
        <div className="modal">
            <div className="form_content_auth">
                <div className="header_auth">
                    <div className="title_header">Вход</div>
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
                        <img alt="Пароль" onClick={(event) => test(event)} className="password_control"
                             src={icon_show}/>
                        <AuthValid error_msg={passwordError}></AuthValid>
                    </div>
                    <div className="container_form_btn">
                        <input disabled={!formValid} type="submit" value="Войти" className="submit"/>
                        <AuthValid error_msg={validUser}></AuthValid>
                    </div>
                </form>
                <div className="bottom_links">
                    <Link to="/forgotPass" className="bottom_link">Забыли пароль</Link>
                    <Link to="/reg" className="bottom_link">Еще не зарегистрированы?</Link>
                </div>
            </div>
        </div>
    )
}
export default Auth;