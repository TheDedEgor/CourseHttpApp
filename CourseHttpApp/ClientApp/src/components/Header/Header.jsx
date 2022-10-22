import React from "react";
import {useNavigate} from "react-router-dom";
import "./Header.css"
import {Link} from "react-router-dom";

const Header = () => {
    let navigate = useNavigate()
    let token = localStorage.getItem("access_token")




   /* const target = document.querySelector(".target");
    const links = document.querySelectorAll(".header-link");
    const colors = ["deepskyblue", "orange", "firebrick", "gold", "magenta", "black", "darkblue"];

    function resizeFunc() {
        const active = document.querySelector(".header-links .header-link.active");

        if (active) {
            const left = active.getBoundingClientRect().left + window.pageXOffset;
            const top = active.getBoundingClientRect().top + window.pageYOffset;

            target.style.left = `${left}px`;
            target.style.top = `${top}px`;
        }
    }

    function mouseenterFunc() {
        if (!this.parentNode.classList.contains("active")) {
            for (let i = 0; i < links.length; i++) {
                if (links[i].parentNode.classList.contains("active")) {
                    links[i].parentNode.classList.remove("active");
                }
                links[i].style.opacity = "0.25";
            }

            this.parentNode.classList.add("active");
            this.style.opacity = "1";

            const width = this.getBoundingClientRect().width;
            const height = this.getBoundingClientRect().height;
            const left = this.getBoundingClientRect().left + window.pageXOffset;
            const top = this.getBoundingClientRect().top + window.pageYOffset;
            const color = colors[Math.floor(Math.random() * colors.length)];

            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.left = `${left}px`;
            target.style.top = `${top}px`;
            target.style.borderColor = color;
            target.style.transform = "none";
        }
    }

    window.addEventListener("resize", resizeFunc);

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", (e) => e.preventDefault());
        links[i].addEventListener("mouseenter", mouseenterFunc);
    }*/
    
    
    
    
    
    return (
        <div className="header">
            <Link className="header-logo" to="/"><b>H</b>ttp://course</Link>
            {token ?
                <div className="header-links">
                    <Link className="header-link" to="/">Курс</Link>
                    <Link className="header-link" to="/traning">Тренажер</Link>
                    <Link className="header-link" to="/contacts">Контакты</Link>
                    <Link className="header-link" to="/profile">Профиль</Link>
                    <span className="target"></span>
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