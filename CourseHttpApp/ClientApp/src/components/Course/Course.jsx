import React, {createRef, useEffect, useRef, useState} from "react";
import "./Course.css"
import NotAuth from "../NotAuth/NotAuth";
import Loader from "../UI/Loader/Loader";
import photo from '../../images/theory-1-2.png'
import {AiOutlineArrowDown} from 'react-icons/ai'
import {AiOutlineArrowUp} from 'react-icons/ai'
import ScrollTop from "../UI/ScrollTop/ScrollTop";
import {AiFillLock} from 'react-icons/ai'
import SliderComponent from "../UI/Slider/SliderComponent";

const Course = () =>{
    const token = localStorage.getItem("access_token")
    const [course,setCourse] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState('')
    const [active,setActive] = useState(0)
    const [activeBlock,setActiveBlock] = useState(false)
    const dataRefs = []
    useEffect( () => {
        if(token !== null){
            getData()
        }
    },[])
    const handleOnClick = (index) =>{
        setActive(index)
        setActiveBlock(!activeBlock)
    }
    if(token === null){
        return <NotAuth link="курс"/>
    }
    async function getData(){
        const response = await fetch("/api/Course", {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response
        }).then(data => {
            setCourse(data.value)
            setLoading(false)
        }).catch((e) => {
            setError(e)
        }).finally(() => {
            setLoading(false)
        })
    }
    if(error){
        console.log("Ошибка входа")
    }
    if(loading){
        return <Loader/>
    }
    /*course.forEach(_ =>{
        dataRefs.push(React.createRef(null))
    })*/
    const scrollToSection = (e,index) =>{
        dataRefs[index].current.focus()
        dataRefs[index].current.scrollIntoView({
            behavior:'smooth',
            block:'start'
        })
    }
    console.log(course)
    return(
        <div className="course">    
            
            <div className="course-block">
                {course.themes.map((course_name,index) => (
                    <div className="course-burger-item" key={index}>
                        <div onClick={() => handleOnClick(course_name.id)} className="course-name-title">
                            {course_name.title}
                            { active === course_name.id ? <AiOutlineArrowUp/> :  <AiOutlineArrowDown/>}
                        </div>
                        <div className={active === course_name.id  ? "active-block" : "not-active-block"}>
                            <p onClick={(e) => scrollToSection(e,index)} className="course-links">Теория</p>
                            <div onClick={(e) => scrollToSection(e,index)} className="course-links lock-links">
                                <p>Практика</p>
                                <AiFillLock className="lock"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/*<div className="course-content">
                {course.themes.map((a,index) => (
                <div ref={dataRefs[index]} key={index}>
                    <SliderComponent d={a} title={a.title}/>
                    <div className="practice-block">
                        <h3>Практика {a.theme}</h3>
                        {a.practice.map((prac,index) => (
                            <div className="practice">
                                <p>{prac.description}</p>
                                <div className="test-block">
                                    <input type="radio" value="a" name="1"/>
                                    <label>Ответ 1</label>
                                </div>
                                <div className="test-block">
                                    <input type="radio" value="a" name="1"/>
                                    <label>Ответ 2</label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            </div>*/}
        </div>
    )
}
export default Course;