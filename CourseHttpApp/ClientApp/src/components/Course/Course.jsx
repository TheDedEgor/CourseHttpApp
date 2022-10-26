import React, {useEffect, useState} from "react";
import {Link, useParams, Route,Routes} from "react-router-dom";
import "./Course.css"
import NotAuthCourse from "../NotAuthCourse/NotAuthCourse";
import Loader from "../UI/Loader/Loader";
import {AiOutlineArrowDown} from 'react-icons/ai'
import {AiOutlineArrowUp} from 'react-icons/ai'
import TheorySlider from "../UI/TheorySlider/TheorySlider";

const Course = ({setActive}) => {
    const token = localStorage.getItem("access_token")
    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [activeItem, setActiveItem] = useState(0)
    const [activeBlock, setActiveBlock] = useState(false)
    const [data,setData] = useState(null)
    const {title,id} = useParams()
    useEffect(() => {
        if (token !== null) {
            getData()
        }
    }, [])
    const handleOnClick = (index) => {
        setActiveItem(index)
        setActiveBlock(!activeBlock)
        localStorage.setItem("theme_id",index)
    }
    if (token === null) {
        return <NotAuthCourse setActive={setActive}/>
    }
    if (error) {
        console.log("Ошибка входа")
    }
    if (loading) {
        return <Loader/>
    }
    async function getData() {
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
    async function getInfo(theme_id, type_id) {
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
            if (type_id === 1) {
                setData(data.value)
                localStorage.setItem("type_id",type_id)
            } else {
                setData(data.value)
                localStorage.setItem("type_id",type_id)
            }
        }).catch((e) => {
            setError(e)
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <div className="course">
            <div className="course-block">
                {course.themes.map((course_name, index) => (
                    <div className="course-burger-item" key={index}>
                        <div onClick={() => handleOnClick(course_name.id, course_name.title)}
                             className="course-name-title">
                            {course_name.title}
                            {activeItem === course_name.id ? <AiOutlineArrowUp/> : <AiOutlineArrowDown/>}
                        </div>
                        <div className={activeItem === course_name.id ? "active-block" : "not-active-block"}>
                            <Link to={`${course_name.title}/${course_name.id}/1`} onClick={() => getInfo(course_name.id, 1)} className="course-links">Теория</Link>
                            <div className="course-links lock-links">
                                <Link to={`${course_name.title}/${course_name.id}/2`} onClick={() => getInfo(course_name.id, 2)}>Практика</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="course-content">
                {data ? <Routes>
                        <Route path={`${title}/${id}/1`} element={<TheorySlider data={data}/>}/>
                        <Route path={`${title}/${id}/2`} element={<TheorySlider data={data}/>}/>
                    </Routes> :
                    <div>Выберите тему</div>
                }
            </div>
        </div>
    )
}
export default Course;