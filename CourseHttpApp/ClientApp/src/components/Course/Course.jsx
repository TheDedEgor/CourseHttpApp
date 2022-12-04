import React, {useEffect, useState} from "react";
import "./Course.css"
import NotAuthCourse from "../NotAuthCourse/NotAuthCourse";
import Loader from "../UI/Loader/Loader";
import LoadingSlider from "../UI/LoadingSlider/LoadingSlider";
import TheorySlider from "../UI/TheorySlider/TheorySlider";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../../features/infoSlice";
import AccordionBlock from "../Accordion/Accordion";
import Quizz from "../Quizz/Quizz";

const Course = ({setActive}) => {
    const token = localStorage.getItem("access_token")
    const [typeId, setTypeId] = useState(0)
    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const dispatch = useDispatch()
    let fetchData_all = useSelector(state => state.info.info)
    const loadSLice = useSelector(state => state.info.status)

    useEffect(() => {
        if (token !== null) {
            getInfo()
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

    async function getInfo() {
        const [theme_id, type_id] = await getDataCourse();
        dispatch(fetchData({theme_id, type_id}))
    }

    async function getDataCourse() {
        return await fetch("/api/Course", {
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
            setTypeId(data.value.progress.progress_type_id)
            return [data.value.progress.progress_theme_id, data.value.progress.progress_type_id]
        }).catch((e) => {
            setError(e)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleClickTheme = (theme_id, type_id) => {
        setTypeId(type_id)
        dispatch(fetchData({theme_id, type_id}))
    }
    
    return (
        <div className="course">
            <div className="course-block">
                {course?.themes?.map(course_name => (
                    <AccordionBlock title={course_name.title} id={course_name.id}
                                    handleClickTheme={handleClickTheme}
                                    key={course_name.id}/>
                ))}
            </div>

            <div className="course-content">
                {loadSLice === 'loading' ? <LoadingSlider/> :
                    typeId === 1 ? <TheorySlider data={fetchData_all.value}/> :
                        <Quizz data={fetchData_all.value}/>}
            </div>
        </div>
    )
}
export default Course;