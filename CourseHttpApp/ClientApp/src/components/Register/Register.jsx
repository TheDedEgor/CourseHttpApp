import React from "react";
import "./Register.css"
import {useNavigate} from "react-router-dom";
import {handleFormSubmit} from "../../Utils";
import icon_close from "../../images/close.svg";

const  Register = () =>{
    let navigate = useNavigate()
    async function handleSubmit(event){
        const response = await handleFormSubmit(event,"/api/Reg")
        const user = await response.json()
        localStorage.setItem("access_token", user.value.access_token)
        navigate('/')
    }

    const close = () => {
        navigate('/')
    }
    
    return(
        <div className="modal">
            <div className="form_content_reg">
                <div className="header_modal">
                    <div className="title_header_reg">Регистрация</div>
                    <img className="icon_close" onClick={() => close()} src={icon_close} alt="Закрыть"/>
                </div>
                <form onSubmit={handleSubmit} className="form_reg">
                    <div className="form_reg_item">
                        <div className="title_form_reg_item">Введите ваше имя</div>
                        <input name="first_name" placeholder="Имя"/>
                    </div>
                    <div className="form_reg_item">
                        <div className="title_form_reg_item">Введите вашу фамилию</div>
                        <input name="last_name" placeholder="Фамилия"/>
                    </div>
                    <div className="form_reg_item">
                        <div className="title_form_reg_item">Введите вашу почту</div>
                        <input name="login" placeholder="Почта"/>
                    </div>
                    <div className="form_reg_item">
                        <div className="title_form_reg_item">Введите пароль</div>
                        <input name="password" placeholder="Пароль" type="password"/>
                    </div>
                    
                    <input type="submit" value="Зарегистрироваться"/>
                </form>
            </div>
        </div>
        
    )
}
export default Register;