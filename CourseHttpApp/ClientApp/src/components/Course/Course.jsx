import React from "react";
import "./Course.css"
import {Link, Route, Routes, useParams} from 'react-router-dom'
const Course = ({courses}) =>{
    const params = useParams()
    console.log(params)
    return(
        <div className="course-block">
                {courses.map((course) =>(
                    <div className="course">
                        <div className="course-title">
                            <h2>{course.name}</h2>
                        </div>
                        {course.dependises.map((depend) =>(
                            <a to="">{depend.name}</a>
                        ))}
                    </div>
                ))}
            <div className="main-block">
                <Routes>
                    <Route path="/:id" element={<h1>sdf</h1>}/>
                </Routes>
            </div>
        </div>
    )
}
export default Course;