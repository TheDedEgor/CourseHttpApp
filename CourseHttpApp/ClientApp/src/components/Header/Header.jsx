import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Header.css"
import {Link} from "react-router-dom";
const Header = ({isRegister,setIsRegister}) =>{
    let navigate = useNavigate()
    const handleLogOut = () =>{
        setIsRegister(false)
        navigate('/')
    }
    return(
        <div className="header">
            <div className="header-logo">
                <Link to="/"><b>Б</b>ыстро и <b>т</b>очка.</Link>
            </div>
            {isRegister ?
                <div className="header-links">
                    <Link className="header-link" to="/">Курс</Link>
                    <Link className="header-link" to="/traning">Тренажер</Link>
                    <Link className="header-link" to="/contacts">Контакты</Link>
                    <p className="header-link" onClick={handleLogOut}>Выйти</p>
                </div>
                :
                <div className="header-links">
                    <Link className="header-link" to="/">Курс</Link>
                    <Link className="header-link" to="/traning">Тренажер</Link>
                    <Link className="header-link" to="/contacts">Контакты</Link>
                    <Link className="header-link" to="/profile">Войти</Link>
                </div>
            }
        </div>
    )
};

export default Header;