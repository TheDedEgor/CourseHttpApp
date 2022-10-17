import React, {useEffect, useState} from "react";
import "./ScrollTop.css"
import {FaAngleDoubleUp} from "react-icons/fa";

const ScrollTop = () =>{
    const [showScrollTopButton,setScrollTopButton] = useState(false)
    useEffect(() =>{
        window.addEventListener('scroll',() =>{
            if(window.scrollY > 500){
                setScrollTopButton(true)
            }
            else{
                setScrollTopButton(false)
            }
        })
    },[])
    const scrollTop = () =>{
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    }
    return(
        <div className="top-btn-style">
            {showScrollTopButton && (<FaAngleDoubleUp className="top-btn-position" onClick={scrollTop}/>)}
        </div>
    )
}
export default ScrollTop