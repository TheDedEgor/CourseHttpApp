import React, {createRef, useEffect, useRef, useState} from "react";
import "./Course.css"
import NotAuth from "../NotAuth/NotAuth";
import Loader from "../UI/Loader/Loader";
import photo from '../../images/theory-1-2.png'
import {AiOutlineArrowDown} from 'react-icons/ai'
import {AiOutlineArrowUp} from 'react-icons/ai'
import ScrollTop from "../UI/ScrollTop/ScrollTop";
import {AiFillLock} from 'react-icons/ai'
import TheorySlider from "../UI/TheorySlider/TheorySlider";
import PracticeSlider from "../UI/PracticeSLider/PracticeSlider";

const Course = ({theme_id,type_id}) =>{
    const token = localStorage.getItem("access_token")
    const [course,setCourse] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState('')
    const [active,setActive] = useState(0)
    const [activeBlock,setActiveBlock] = useState(false)
    const [theory,setTheory] = useState(null)
    const [practice,setPractice] = useState(null)
    const [themeIdCourse,setThemeIdCourse] = useState(document.cookie.match(/theme_id=(.+?)(;|$)/))
    const [typeIdCourse,setTypeIdCourse] = useState(document.cookie.match(/type_id=(.+?)(;|$)/))
    useEffect( () => {
        if(token !== null){
            getData()
        }
    },[])
    const handleOnClick = (index) =>{
        setActive(index)
        setActiveBlock(!activeBlock)
        document.cookie = `theme_id=${index}`
    }
    if(token === null){
        return <NotAuth link="курс"/>
    }
    if(error){
        console.log("Ошибка входа")
    }
    if(loading){
        return <Loader/>
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
        }).catch((e) => {
            setError(e)
        }).finally(() => {
            setLoading(false)
        })
    }
    async function getInfo(theme_id, type_id){
        const response = await fetch(`/api/Info?theme_id=${theme_id}&type_id=${type_id}`, {
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
            if(type_id === 1){
                setTheory(data.value)
                setPractice(null)
            }
            else{
                setPractice(data.value)
                setTheory(null)
            }
            document.cookie = `type_id=${type_id}`
        }).catch((e) => {
            setError(e)
        }).finally(() => {
            setLoading(false)
        })
    }
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
                            <p onClick={()=>getInfo(course_name.id, 1)} className="course-links">Теория</p>
                            <div className="course-links lock-links">
                                <p onClick={()=>getInfo(course_name.id, 2)}>Практика</p>
                                {/*<AiFillLock className="lock"/>*/}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {loading ? <Loader/> :
                <div className="course-content">
                    {theory ? <TheorySlider theory={theory}/> : practice ? <PracticeSlider practice={practice}/> : <div>Выберите тему</div>}
                </div>
            }
        </div>
    )
}
export default Course;