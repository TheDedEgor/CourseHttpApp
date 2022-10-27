import React, {useEffect, useState} from "react";
import "./ForgotPass.css"
import "../../css/modal.css"
import {handleFormSubmit, resizeWindow} from "../../Utils";
import icon_close from "../../images/close.svg";
import AuthValid from "../AuthValid/AuthValid";
import {useNotification} from "use-toast-notification";

const ForgotPass = ({setActiveForgotPass}) => {
    const notification = useNotification()
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [formValid, setFormValid] = useState(true)
    const [validUser, setValidUser] = useState('')

    useEffect(() => {
        setTimeout(resizeWindow, 10);
        document.body.style.overflowY = "hidden"
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()

        let email = document.getElementById("reg_email");
        let check = true

        if (!email.value) {
            setEmailError("Введите Email!")
            check = false
        }

        if (check) {
            const response = await handleFormSubmit(event, "/api/Pass");
            const data = await response.json();
            if (data.statusCode === 404) {
                setValidUser("Введён неверный Email, попробуйте еще раз!")
            } else if (data.statusCode === 409) {
                close()
                notification.show({
                    message: 'Вы недавно отправляли письмо, попробуйте позже!',
                    variant: 'error'
                })
            } else {
                close()
                notification.show({
                    message: 'Письмо отправлено и будет в течение нескольких минут, обязательно проверьте папку спам!',
                    variant: 'success'
                })
            }
        }
    }

    const close = () => {
        setActiveForgotPass(false)
        setTimeout(resizeWindow, 10);
        document.body.style.overflow = "auto"
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        setFormValid(true)
        setValidUser("")
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

    return (
        <div className="modal" onClick={() => close()}>
            <div className="form_content_forgot_pass" onClick={(e) => e.stopPropagation()}>
                <div className="header_modal">
                    <div className="title_header_forgot_pass">Восстановление пароля</div>
                    <img className="icon_close" onClick={() => close()} src={icon_close} alt="Закрыть"/>
                </div>
                <form onSubmit={handleSubmit} className="form_forgot_pass">
                    <div className="form_reg_item">
                        <input className="reg_input" id="reg_email" name="login" placeholder="Почта"
                               onChange={e => emailHandler(e)} value={email}/>
                        <AuthValid error_msg={emailError}></AuthValid>
                    </div>
                    <div className="container_form_btn">
                        <input disabled={!formValid} className="submit_btn reg_btn" type="submit" value="Отправить"/>
                        <AuthValid error_msg={validUser}></AuthValid>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPass;