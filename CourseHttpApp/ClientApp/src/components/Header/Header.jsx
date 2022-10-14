import React from "react";
import {useNavigate} from "react-router-dom";
import "./Header.css"
import {Link} from "react-router-dom";
const Header = () =>{
    let navigate = useNavigate()
    let  token = localStorage.getItem("access_token")
    return(
        <div className="header">
            <div className="header-logo">
                <Link to="/"><b>Б</b>ыстро и <b>т</b>очка.</Link>
            </div>
            {token ?
                <div className="header-links">
                    <Link className="header-link" to="/">Курс</Link>
                    <Link className="header-link" to="/traning">Тренажер</Link>
                    <Link className="header-link" to="/contacts">Контакты</Link>
                    <Link className="header-link" to="/profile">Профиль</Link>
                </div>
                :
                <div className="header-links">
                    <Link className="header-link" to="/">Курс</Link>
                    <Link className="header-link" to="/traning">Тренажер</Link>
                    <Link className="header-link" to="/contacts">Контакты</Link>
                    <Link className="header-link header-link_auth" to="/auth">Войти</Link>
                    <Link className="header-link header-link_auth" to="/reg">Регистрация</Link>
                </div>
            }
        </div>
    )
};

export default Header;