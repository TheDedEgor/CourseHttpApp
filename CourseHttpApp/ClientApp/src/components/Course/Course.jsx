import React, {useEffect, useState} from "react";
import "./Course.css"
import NotAuthCourse from "../NotAuthCourse/NotAuthCourse";
import Loader from "../UI/Loader/Loader";
import {AiOutlineArrowDown} from 'react-icons/ai'
import {AiOutlineArrowUp} from 'react-icons/ai'
import TheorySlider from "../UI/TheorySlider/TheorySlider";

import {useDispatch, useSelector} from "react-redux";
import {getData} from "../../features/dataSlice";
import {fetchData} from "../../features/infoSlice";

const Course = ({setActive}) => {
    const token = localStorage.getItem("access_token")
    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [activeItem, setActiveItem] = useState(0)
    const [activeBlock, setActiveBlock] = useState(false)
    /*const [data, setData] = useState(null)*/
    const [localStorageParams,setLocalStorageParams] = useState(null)
    const dispatch = useDispatch()
    const data = useSelector(state => state.data.data)
    const fetchData_all = useSelector(state => state.info.info)
    useEffect(() => {
        dispatch(fetchData())
    }, [])
    useEffect(() => {
        if (token !== null) {
            getDataCourse()
        }
    }, [token])
    /*const fetchData = () => {
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
    }*/
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
    async function getDataCourse() {
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

    /*async function getInfo(theme_id, type_id) {
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
        console.log(theme_id,type_id)
    }*/
    const handleClickTheme = (theme_id,type_id) =>{
        localStorage.setItem("theme_id", theme_id)
        localStorage.setItem("type_id",type_id)
        dispatch(
            getData({
                theme_id,
                type_id
            })
        )
        dispatch(fetchData())
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
                        <div
                            className={(activeItem === course_name.id) ? "active-block" : "not-active-block"}>
                            <p onClick={() => handleClickTheme(course_name.id,1)} className="course-links">Теория</p>
                            <div className="course-links lock-links">
                                <p onClick={() => handleClickTheme(course_name.id,2)}>Практика</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="course-content">
                {fetchData_all.value ? <TheorySlider data={fetchData_all.value}/> :
                    <div>Выберите тему</div>
                }
            </div>
        </div>
    )
}
export default Course;