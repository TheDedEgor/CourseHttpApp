import React, {useEffect, useState} from "react";
import "./Course.css"
import {Link, Route, Routes, useParams} from 'react-router-dom'
import {Log} from "oidc-client";
const Course = ({courses}) =>{
    const {id} = useParams()
    let post = courses[0].dependises[id -1]
    /*console.log(courses[0].dependises.dep.map(p => p.id))*/
    return(
        <div className="course-block">
                {courses.map((course) =>(
                    <div className="course" key={course.id}>
                        <div className="course-title">
                            <h2>{course.name}</h2>
                        </div>
                        <div className="course-links">
                            {course.dependises.map((depend) =>(
                                <div>
                                    <Link key={depend.id} to={`/${depend.id}`}>{depend.name}</Link>
                                    <div>
                                        {depend.dep.map(p => (
                                            <div className="depend-links">
                                                <p>{p.name}</p>
                                                {/*<p>{p.descrip}</p>*/}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            <div className="main-block">
                {/*<Routes>
                    <Route path="/:id" element={<h1>{id}</h1>}/>
                </Routes>*/}
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