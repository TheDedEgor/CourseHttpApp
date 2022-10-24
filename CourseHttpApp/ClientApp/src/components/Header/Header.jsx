import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./Header.css"
import {Link} from "react-router-dom";

const Header = ({setActive}) => {
    let navigate = useNavigate()
    let token = localStorage.getItem("access_token")
    useEffect(() => {
        const target = document.querySelector(".target");
        const links = document.querySelectorAll(".header-link");

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
            for (let i = 0; i < links.length; i++) {
                if (links[i].classList.contains("active")) {
                    links[i].classList.remove("active");
                }
                links[i].style.opacity = "0.35";
            }

            this.classList.add("active");
            this.style.opacity = "1";

            const width = this.getBoundingClientRect().width;
            const height = this.getBoundingClientRect().height;
            const left = this.getBoundingClientRect().left + window.pageXOffset;
            const top = this.getBoundingClientRect().top + window.pageYOffset;
            
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.left = `${left}px`;
            target.style.top = `${top}px`;
            
            setTimeout(resizeFunc, 10);
        }

        window.addEventListener("resize", resizeFunc);

        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener("click", mouseenterFunc);
        }
        
        links[0].click();

    }, [token])

    return (
        <div className="header">
            <Link className="header-logo" to="/"><b>H</b>ttp://course</Link>
            {token ?
                <div className="header-links">
                    <Link className="header-link" to="/">Курс</Link>
                    <Link className="header-link" to="/traning">Тренажер</Link>
                    <Link className="header-link" to="/contacts">Контакты</Link>
                    <Link className="header-link" style={{opacity:0.25}} to="/profile">Профиль</Link>
                </div>
                :
                <div className="header-links">
                    <Link className="header-link active" to="/">Курс</Link>
                    <Link className="header-link" to="/traning">Тренажер</Link>
                    <Link className="header-link" to="/contacts">Контакты</Link>
                    <a onClick={() => setActive(true)} className="header-linkaa header-link_auth" to="/auth">Войти</a>
                    <Link className="header-linkaa header-link_auth" to="/reg">Регистрация</Link>
                </div>
            }
            <span className="target"></span>
        </div>
    )
};

export default Header;