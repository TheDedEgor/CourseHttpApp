import React, {useContext, useEffect, useRef, useState} from "react";
import "./Header.css"
import {Link, useNavigate} from "react-router-dom";
import {resizeWindow} from "../../utils";
import {DataContext} from "../../context/DataProvider";

const Header = ({setActiveAuth, setActiveReg, setToken, token}) => {
    let navigate = useNavigate()
    const [isVisibleProfileMenu, setIsVisibleProfileMenu] = useState(false)
    const {theme, setTheme} = useContext(DataContext)
    const toogle_switch = useRef()
    useEffect(() => {
        const links = document.querySelectorAll(".menu-item");
        const logo = document.querySelector(".header-logo")

        function clickLogo() {
            links[0].click();
        }

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
        }

        window.addEventListener("resize", resizeWindow);

        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener("click", clickNavMenu);
        }

        logo.addEventListener("click", clickLogo)
        document.addEventListener("click", (e) => {
            if (e.target.id !== "drop-menu") {
                setIsVisibleProfileMenu(false)
            }
        })

        const path = window.location.pathname;

        if (path === "/") {
            links[0].click();
        } else if (path === "/training") {
            links[1].click();
        } else if (path === "/contacts") {
            links[2].click();
        } else if (path === "/profile") {
            showProfile()
        }

    }, [token])
    const showDropMenu = (e) => {
        e.stopPropagation()
        setIsVisibleProfileMenu(!isVisibleProfileMenu)
    }

    const handleLogOut = () => {
        localStorage.removeItem("access_token")
        setToken(undefined)
        localStorage.removeItem("theme_id")
        localStorage.removeItem("type_id")
        /*document.documentElement.setAttribute('data-theme', "light")*/
        navigate('/')
    }

    const showProfile = () => {
        const profile = document.querySelector(".menu-item-profile")
        const target = document.querySelector(".target");
        const links = document.querySelectorAll(".menu-item");

        for (let i = 0; i < links.length; i++) {
            if (links[i].classList.contains("active")) {
                links[i].classList.remove("active");
            }
            links[i].classList.add("no-active")
        }

        profile.classList.remove("no-active");
        profile.classList.add("active");

        const width = profile.getBoundingClientRect().width;
        const height = profile.getBoundingClientRect().height;
        const left = profile.getBoundingClientRect().left + window.pageXOffset;
        const top = profile.getBoundingClientRect().top + window.pageYOffset;
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;
        target.style.left = `${left}px`;
        target.style.top = `${top}px`;

        setIsVisibleProfileMenu(false)
        navigate("/profile")
    }
    const handleClick = () => {
        if (document.documentElement.getAttribute("data-theme") === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }
    return (
        <div className="header">
            <Link className="header-logo" to="/"><b>H</b>ttp://course</Link>
            <nav className="header-menu">
                <Link className="menu-item" to="/">Курс</Link>
                <Link className="menu-item" to="/training">Тренажер</Link>
                <Link className="menu-item" to="/contacts">Контакты</Link>
                {token && <div className="menu-item-profile" id="drop-menu" onClick={(e) => showDropMenu(e)}>
                    <div className="profile_title">
                        <div className="name-profile">{localStorage.getItem("user_name")}</div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Zm0 5c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3Zm0 13c-2.2 0-4.3-.9-5.8-2.5 2.2-3.2 6.5-4 9.7-1.8.7.5 1.3 1.1 1.8 1.8-1.4 1.6-3.5 2.5-5.7 2.5Z"
                                fill="currentColor"></path>
                        </svg>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                             className="arrow-profile">
                            <path
                                d="M12 16a1 1 0 0 1-.64-.23l-5-4a1.001 1.001 0 0 1 1.28-1.54L12 13.71l4.36-3.32a1.001 1.001 0 0 1 1.41.15 1 1 0 0 1-.14 1.46l-5 3.83A1 1 0 0 1 12 16Z"
                                fill="currentColor"></path>
                        </svg>
                    </div>
                    {isVisibleProfileMenu &&
                        <div className="profile-nav" id="profile-drop-menu" onClick={(e) => e.stopPropagation()}>
                            <a className="profile-nav-item" onClick={() => showProfile()}>Профиль</a>
                            <a className="profile-nav-item dark-theme" onClick={handleClick}>
                                Темная тема
                                <label className="label-theme" onClick={event => event.preventDefault()}>
                                    <input
                                        className="switch-input"
                                        type="checkbox"
                                        checked={theme === 'dark'}
                                    />
                                    <div className="switch" ref={toogle_switch}></div>
                                </label>
                            </a>
                            <a className="profile-nav-item logout" onClick={() => handleLogOut()}>Выйти</a>
                        </div>
                    }
                </div>}
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