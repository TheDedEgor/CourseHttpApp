import React, {useEffect, useState} from "react";
import "./Course.css"
import {Link, Route, Router, Routes, useParams} from 'react-router-dom'
import sticker from '../../images/bad_sticker.png'
import NotAuth from "../NotAuth/NotAuth";
import Loader from "../UI/Loader/Loader";
const Course = () =>{
    const token = localStorage.getItem("access_token")
    const [course,setCourse] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState('')
    useEffect( () => {
        getData()
    },[])
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
    /*const {id} = useParams()
    const {practike} = useParams()
    const params = useParams()
    let post = courses[0].dependises[id -1]
    let test = post?.praktika[0]
    const token = sessionStorage.getItem("access_token")*/
    return(
        <div>
            {/*<div className="course-block">
                    {courses.map((course) =>(
                        <div className="course" key={course.id}>
                            <div className="course-title">
                                <h2>{course.name}</h2>
                            </div>
                            <div className="course-links">
                                {course.dependises.map((depend,index) =>(
                                    <div key={depend.id}>
                                        <h3 className="main-link">{depend.name}</h3>
                                        <div className="depend-links">
                                            <Link to={`/${depend.name}/${depend.id}`}>Теория</Link>
                                            <Link to={`/${depend.name}/${depend.id}/${depend.praktika[0].title}`}>Практика</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="main-block">
                        <Routes>
                            <Route path={`${id}/${id}`} element={<div>asd</div>}/>
                            <Route path={`${id}/${id}`} element={<div>asdad</div>}/>
                        </Routes>
                        {post && <div>
                            <h1>{post.name}</h1>
                            <span>{post.desc}</span>
                            {post.image === null ? <></> :<img src={post.image} alt="post-img"/>}
                        </div>}
                        {
                            test && <div>{test.title}</div>
                        }
                    </div>
                </div> :
                <div className="error_course">
                    <img src={sticker} alt="sticker"/>
                    <h3>Вам не доступен курс, пожалуйста, войдите в свой <Link to="/auth" className="auth_link">аккаунт</Link></h3>
                </div>*/}
            <div>
                {course.map(course => (
                    <div>
                       <h2>{course.theme}</h2>
                        {course.theory.map(a => (
                            <div className="theory">
                                <p>Теория</p>
                                {a.description}
                            </div>
                        ))}
                    </div>
                ))}
            </div> 
        </div>
    )
}
export default Course;