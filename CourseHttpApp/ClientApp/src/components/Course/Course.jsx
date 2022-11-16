import React, {useContext, useEffect, useState} from "react";
import "./Course.css"
import NotAuthCourse from "../NotAuthCourse/NotAuthCourse";
import Loader from "../UI/Loader/Loader";
import LoadingSlider from "../UI/LoadingSlider/LoadingSlider";
import TheorySlider from "../UI/TheorySlider/TheorySlider";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../../features/infoSlice";
import {getData} from "../../features/dataSlice";
import AccordionBlock from "../Accordion/Accordion";
import Quizz from "../Quizz/Quizz";
import {DataContext} from "../../context/DataProvider";

const Course = ({setActive}) => {
    const token = localStorage.getItem("access_token")
    const [maxLenghtCourse, setMaxLenghtCourse] = useState(null)
    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const fetchData_all = useSelector(state => state.info.info)
    const loadSLice = useSelector(state => state.info.status)
  /*  const course = useSelector(state => state.data.data)
    const loadCourse = useSelector(state => state.data.status)*/
    useEffect(() => {
        if (token !== null) {
            getDataCourse().then(res => {
                dispatch(fetchData())
            })
        }
    }, [token])
    useEffect(() => {
        if (course.value?.themes?.length > 3) {
            setMaxLenghtCourse(true)
        } else {
            setMaxLenghtCourse(false)
        }
    }, [course.value?.themes?.length])
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
            <div className={`${maxLenghtCourse ? "course-block" : "course-block-overflow-hidden"}`}>
                {course?.themes?.map(course_name => (
                    <AccordionBlock title={course_name.title} id={course_name.id} progress={course_name.correct_tasks}
                                    handleClickTheme={handleClickTheme}/>
                ))}
            </div>
            <div className="course-content">
                {loadSLice === 'loading' ? <LoadingSlider/> :
                        <TheorySlider data={fetchData_all.value}/>}
            </div>
        </div>
    )
}
export default Course;