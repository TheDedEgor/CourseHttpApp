import React, {useEffect, useState} from "react";
import "./Course.css"
import {Link, Route, Routes, useParams} from 'react-router-dom'
const Course = ({courses}) =>{
    const {id} = useParams()
    const [isVisible,setIsVisible] = useState(false)
    let post = courses[0].dependises[id -1]
    const onCLickCourse = (index) =>{
        setIsVisible(index)
        console.log(index)
    }
    return(
        <div className="course-block">
                {courses.map((course) =>(
                    <div className="course" key={course.id}>
                        <div className="course-title">
                            <h2>{course.name}</h2>
                        </div>
                        <div className="course-links">
                            {course.dependises.map((depend,index) =>(
                                <div key={depend.id}>
                                    <Link key={depend.id} to={`/${depend.name}/${depend.id}`}>{depend.name}</Link>
                                    <div className="depend-links">
                                        {/*{depend.dep.map((p,index) => (
                                            <div key={p.id}  className={isVisible ? "depend-links" : "depend-not-link"}> 
                                                <p>{p.name}</p>
                                            </div>
                                            <div>
                                                <span>Теория</span>
                                                <span>Практика</span>
                                            </div>
                                        ))}*/}
                                        <a href="#">Теория</a>
                                        <a href="#">Практика</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            <div className="main-block">
                {post && <div>
                    <h1>{post.name}</h1>
                    <span>{post.desc}</span>
                    {post.image === null ? <></> :<img src={post.image} alt="post-img"/>}
                </div>}
            </div>
        </div>
    )
}
export default Course;