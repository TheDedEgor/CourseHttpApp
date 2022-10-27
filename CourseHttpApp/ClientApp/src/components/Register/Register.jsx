import React, {useEffect, useState} from "react";
import "./Register.css";
import "../../css/modal.css";
import {handleFormSubmit, resizeWindow} from "../../Utils";
import icon_close from "../../images/close.svg";
import icon_show from "../../images/show_pass.png";
import icon_hide from "../../images/hide_pass.png";
import RegValid from "../RegValid/RegValid";

const Register = ({setActiveReg, setToken}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [formValid, setFormValid] = useState(true)
    const [validUser, setValidUser] = useState('')

    useEffect(() =>{
        setTimeout(resizeWindow, 10);
        document.body.style.overflowY = "hidden"
    },[])

    async function handleSubmit(event) {
        event.preventDefault();
        let email = document.getElementById("reg_email");
        let password = document.getElementById("reg_password");
        let name = document.getElementById("reg_name");
        let check = true

        if (!email.value) {
            setValidUser("Заполните обязательные поля!")
            email.classList.add("reg_error_red")
            check = false
        }
        if (!password.value) {
            setValidUser("Заполните обязательные поля!")
            password.classList.add("reg_error_red")
            check = false
        }
        if (!name.value) {
            setValidUser("Заполните обязательные поля!")
            name.classList.add("reg_error_red")
            check = false
        }

        if (check) {
            const response = await handleFormSubmit(event, "/api/Reg")
            const user = await response.json()
            if (user.statusCode === 409) {
                setValidUser('Пользователь с такой почтой уже зарегистрирован!')
                email.classList.add("reg_error_red")
                setFormValid(false)
                setPassword('')
            } else {
                setValidUser('')
                localStorage.setItem("access_token", user.value.access_token)
                setToken(user.value.access_token)
                close()
            }
        }
    }

    const close = () => {
        setActiveReg(false)
        setTimeout(resizeWindow, 10);
        document.body.style.overflow = "auto"
    }

    const emailHandler = (e) => {
        e.target.classList.remove("reg_error_red")
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
    const nameHandler = (e) => {
        e.target.classList.remove("reg_error_red")
    }
    const passwordHandler = (e) => {
        e.target.classList.remove("reg_error_red")
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
        let input = document.getElementById('reg_password');
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
            <div className="form_content_reg" onClick={(e) => e.stopPropagation()}>
                <div className="header_modal">
                    <div className="title_header_reg">Регистрация</div>
                    <img className="icon_close" onClick={() => close()} src={icon_close} alt="Закрыть"/>
                </div>
                <form onSubmit={handleSubmit} className="form_reg">
                    <div className="form_reg_item">
                        <div className="title_form_reg_item">Введите ваше имя</div>
                        <input className="reg_input" id="reg_name" name="first_name" placeholder="Имя"
                               onChange={e => nameHandler(e)}/>
                        <RegValid></RegValid>
                    </div>
                    <div className="form_reg_item">
                        <div className="title_form_reg_item">Введите вашу фамилию</div>
                        <input className="reg_input" name="last_name" placeholder="Фамилия"/>
                        <RegValid></RegValid>
                    </div>
                    <div className="form_reg_item">
                        <div className="title_form_reg_item">Введите вашу почту</div>
                        <input className="reg_input" id="reg_email" name="login" placeholder="Почта"
                               onChange={e => emailHandler(e)} value={email}/>
                        <RegValid error_msg={emailError}></RegValid>
                    </div>
                    <div className="form_reg_item">
                        <div className="title_form_reg_item">Введите пароль</div>
                        <input className="reg_input" id="reg_password" name="password" placeholder="Пароль"
                               type="password" onChange={e => passwordHandler(e)} value={password}/>
                        <img alt="Пароль" className="reg_password_control" onClick={(event) => showPassword(event)}
                             src={icon_show}/>
                        <RegValid error_msg={passwordError}></RegValid>
                    </div>
                    <div className="container_form_btn">
                        <input disabled={!formValid} className="submit_btn reg_btn" type="submit"
                               value="Зарегистрироваться"/>
                        <RegValid error_msg={validUser}></RegValid>
                    </div>
                </form>
            </div>
        </div>

    )
}
export default Register;