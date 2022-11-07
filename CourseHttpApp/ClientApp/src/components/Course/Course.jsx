import React, {useEffect, useState} from "react";
import "./Course.css"
import NotAuthCourse from "../NotAuthCourse/NotAuthCourse";
import Loader from "../UI/Loader/Loader";
import LoadingSlider from "../UI/LoadingSlider/LoadingSlider";
import Accordion from "../Accordion/Accordion";
import {AiOutlineArrowDown} from 'react-icons/ai'
import {AiOutlineArrowUp} from 'react-icons/ai'
import TheorySlider from "../UI/TheorySlider/TheorySlider";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../../features/infoSlice";

const Course = ({setActive}) => {
    const token = localStorage.getItem("access_token")
    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [activeItem, setActiveItem] = useState(0)
    const [activeBlock, setActiveBlock] = useState(false)
    const dispatch = useDispatch()
    const fetchData_all = useSelector(state => state.info.info)
    const data = useSelector(state => state.info)
    const loadSLice = useSelector(state => state.info.status)
    const [selected,setSelected] = useState(null)
    useEffect(() => {
        if (token !== null) {
            getDataCourse().then(res => {
                dispatch(fetchData())
            })
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
    /*async function progressData(theme_id,type_id){
        const token = localStorage.getItem("access_token")
        return await fetch('/api/UpdateProgress',{
            method:'POST',
            body:JSON.stringify({
                progress_theme_id:theme_id,
                progress_type_id:type_id,
                progress_task_id:0
            }),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            }
        })
    }*/
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

    const handleOnClick = (index) => {
        setActiveItem(index)
        setActiveBlock(!activeBlock)
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
            localStorage.setItem("theme_id", data.value.progress.progress_theme_id)
            localStorage.setItem("type_id", data.value.progress.progress_type_id)
        }).catch((e) => {
            setError(e)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleClickTheme = (theme_id, type_id) => {
        localStorage.setItem("theme_id", theme_id)
        localStorage.setItem("type_id", type_id)
        dispatch(
            fetchData({
                theme_id,
                type_id
            })
        )
    }
    /*{course.themes.map((course_name, index) => (
        <div className="course-burger-item" key={index}>
            <div onClick={() => handleOnClick(course_name.id)}
                 className="course-name-title">
                {course_name.title}
                {((activeItem === course_name.id) && activeBlock) ? <AiOutlineArrowUp/> : <AiOutlineArrowDown/>}
            </div>
            <div
                className={ ((activeItem === course_name.id) && activeBlock) ? "active-block" : "not-active-block"}>
                <p onClick={() => handleClickTheme(course_name.id, 1)} className="course-links">Теория</p>
                <p className="course-links lock-links"
                   onClick={() => handleClickTheme(course_name.id, 2)}>Практика</p>
            </div>
        </div>
    ))}*/
    return (
        <div className="course">
            <div className="course-block">
                {/*{course.themes.map((item,i) => (
                    <div className="item">
                        <div className="title" onClick={() => toggle(i)}>
                            <h2>{item.title}</h2>
                            {selected === i ? <AiOutlineArrowUp/> : <AiOutlineArrowDown/>}
                        </div>
                        <div className={selected === i ? "content show" : "content"}>
                            <p>Теория</p>
                            <p>Практика</p>
                        </div>
                    </div>
                ))}*/}
                {course.themes.map((course_name, index) => (
                /*<div className="course-burger-item" key={index}>
                    <div onClick={() => toggle(index)}
                         className="course-name-title">
                        {course_name.title}
                        {selected === index ? <AiOutlineArrowUp/> : <AiOutlineArrowDown/>}
                    </div>
                    <div
                        className={ selected === index ? "active-block" : "not-active-block"}>
                        <p onClick={() => handleClickTheme(course_name.id, 1)} className="course-links">Теория</p>
                        <p className="course-links lock-links"
                           onClick={() => handleClickTheme(course_name.id, 2)}>Практика</p>
                    </div>
                </div>*/
                    <Accordion title={course_name.title} id={course_name.id} handleClickTheme={handleClickTheme}/>
            ))}
            </div>
            <div className="course-content">
                {loadSLice === 'loading' ? <LoadingSlider/> : <TheorySlider data={fetchData_all.value}/>}
            </div>
        </div>
    )
}
export default Course;