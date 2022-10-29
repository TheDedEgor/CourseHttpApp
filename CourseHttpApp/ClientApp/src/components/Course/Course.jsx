import React, {useContext, useEffect, useState} from "react";
import {Link, useParams, Route, Routes, useSearchParams} from "react-router-dom";
import "./Course.css"
import NotAuthCourse from "../NotAuthCourse/NotAuthCourse";
import Loader from "../UI/Loader/Loader";
import {AiOutlineArrowDown} from 'react-icons/ai'
import {AiOutlineArrowUp} from 'react-icons/ai'
import TheorySlider from "../UI/TheorySlider/TheorySlider";
import {DataContext} from "../../context/DataProvider";

const Course = ({setActive, token}) => {
    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [activeItem, setActiveItem] = useState(0)
    const [activeBlock, setActiveBlock] = useState(false)
    const [data, setData] = useState(null)
    const [choice, setChoice] = useState(false)
    const [localStorageParams, setLocalStorageParams] = useState(null)
    const {title, id} = useParams()
    const params = useSearchParams()
    useEffect(() => {
        if (token !== null) {
            getData()
        }
    }, [token])
    /*useEffect(() => {
            fetchData()
    }, [])*/
    const fetchData = () => {
        const theme_id = localStorage.getItem("theme_id")
        const type_id = localStorage.getItem("type_id")
        setLocalStorageParams({theme_id, type_id})
        if (localStorageParams) {
            fetch(`/api/Info?theme_id=${localStorageParams.theme_id}&type_id=${localStorageParams.type_id}`, {
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
                    localStorage.setItem("type_id", type_id)
                } else {
                    setData(data.value)
                    localStorage.setItem("type_id", type_id)
                }
            }).catch((e) => {
                setError(e)
            }).finally(() => {
                setLoading(false)
            })
        }
    }
    const handleOnClick = (index) => {
        setActiveItem(index)
        setActiveBlock(!activeBlock)
        localStorage.setItem("theme_id", index)
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
                localStorage.setItem("type_id", type_id)
            } else {
                setData(data.value)
                localStorage.setItem("type_id", type_id)
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
                {course?.themes?.map((course_name, index) => (
                    <div className="course-burger-item" key={index}>
                        <div onClick={() => handleOnClick(course_name.id, course_name.title)}
                             className="course-name-title">
                            {course_name.title}
                            {activeItem === course_name.id ? <AiOutlineArrowUp/> : <AiOutlineArrowDown/>}
                        </div>
                        <div className={activeItem === course_name.id ? "active-block" : "not-active-block"}>
                            <p onClick={() => getInfo(course_name.id, 1)} className="course-links">Теория</p>
                            <div className="course-links lock-links">
                                <p onClick={() => getInfo(course_name.id, 2)}>Практика</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="course-content">
                {/*{data ? <TheorySlider data={data}/> :
                    <div>Выберите тему</div>
                }*/}
                {/*<span>[</span>
                {data?.map((data_name) =>(
                    <>
                    <div>
                        <span style={{marginLeft:"50px"}}>{`{`}</span>
                        <p style={{marginLeft:"100px"}}>
                            <span style={{color:'red'}}>"id"</span>: <span style={{color:"blue"}}>"{data_name.id}</span>"
                        </p>
                        <p style={{marginLeft:"100px"}}>
                            <span style={{color:'red'}}>"description"</span>: <span style={{color:"blue"}}>"{data_name.description}"</span>
                        </p>
                        <p style={{marginLeft:"100px"}}>
                            <span style={{color:'red'}}>"image_url"</span>: <span style={{color:"blue"}}>"{data_name.image_url}"</span>
                        </p>
                        <span style={{marginLeft:"50px"}}>},</span>
                    </div>
                    </>*/}
                ))}
                <span>]</span>
            </div>
        </div>
    )
}
export default Course;