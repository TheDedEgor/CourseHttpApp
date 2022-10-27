import React, {useEffect, useState} from "react";
import "./Header.css"
import {Link} from "react-router-dom";
import {resizeWindow} from "../../Utils";

const Header = ({setActiveAuth, setActiveReg, token}) => {

    useEffect(() => {
        const links = document.querySelectorAll(".menu-item");
        const logo = document.querySelector(".header-logo")

        function clickLogo() {
            links[0].click();
        }
        debugger;
        function clickNavMenu() {
            const target = document.querySelector(".target");
            for (let i = 0; i < links.length; i++) {
                if (links[i].classList.contains("active")) {
                    links[i].classList.remove("active");
                }
                links[i].classList.add("no-active")
            }

            this.classList.remove("no-active");
            this.classList.add("active");

            const width = this.getBoundingClientRect().width;
            const height = this.getBoundingClientRect().height;
            const left = this.getBoundingClientRect().left + window.pageXOffset;
            const top = this.getBoundingClientRect().top + window.pageYOffset;

            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.left = `${left}px`;
            target.style.top = `${top}px`;

            setTimeout(resizeWindow, 10);
        }

        window.addEventListener("resize", resizeWindow);

        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener("click", clickNavMenu);
        }

        logo.addEventListener("click", clickLogo)
        links[0].click();
        
    }, [token])
    return (
        <div className="header">
            <Link className="header-logo" to="/"><b>H</b>ttp://course</Link>
            <nav className="header-menu">
                <Link className="menu-item" to="/">Курс</Link>
                <Link className="menu-item" to="/traning">Тренажер</Link>
                <Link className="menu-item" to="/contacts">Контакты</Link>
                {token && <Link className="menu-item no-active" to="/profile">Профиль</Link>}
                {!token && <div className="menu-item-auth">
                    <a onClick={() => setActiveAuth(true)} className="link-auth">Вход</a>
                    <a onClick={() => setActiveReg(true)} className="link-auth">Регистрация</a>
                </div>}
            </nav>
            <span className="target"></span>
        </div>
    )
};

export default Header;