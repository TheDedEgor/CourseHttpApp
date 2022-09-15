import React from "react";
import "./Header.css"
import {Link} from "react-router-dom";
const Header = () =>{
    return(
        <div className="header">
            <div className="header-logo">
                <a href="#">Быстро и точка.</a>
            </div>
            <div className="header-links">
                <Link className="header-link" to="/">Курс</Link>
                <Link className="header-link" to="/traning">Тренажер</Link>
                <Link className="header-link" to="/contacts">Контакты</Link>
            </div>
        </div>
    )
};

export default Header;