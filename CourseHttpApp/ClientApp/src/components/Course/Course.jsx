import React, {useEffect, useState} from "react";
import "./Course.css"
import NotAuthCourse from "../NotAuthCourse/NotAuthCourse";
import Loader from "../UI/Loader/Loader";
import LoadingSlider from "../UI/LoadingSlider/LoadingSlider";
import Accordion from "../Accordion/Accordion";
import TheorySlider from "../UI/TheorySlider/TheorySlider";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../../features/infoSlice";

const Course = ({setActive}) => {
    const token = localStorage.getItem("access_token")
    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const fetchData_all = useSelector(state => state.info.info)
    const loadSLice = useSelector(state => state.info.status)
    useEffect(() => {
        if (token !== null) {
            getDataCourse().then(res => {
                dispatch(fetchData())
            })
        }
    }, [token])
    
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
    return (
        <div className="course">
            <div className="course-block">
                {course.themes.map(course_name => (
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