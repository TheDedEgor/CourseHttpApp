import React from "react";
import "./Course.css"
import {Link, useParams} from 'react-router-dom'
import sticker from '../../images/bad_sticker.png'
const Course = ({courses}) =>{
    const {id} = useParams()
    let post = courses[0].dependises[id -1]
    const token = sessionStorage.getItem("access_token")
    return(
        <div>
            {token ?
                <div className="course-block">
                    {courses.map((course) =>(
                        <div className="course" key={course.id}>
                            <div className="course-title">
                                <h2>{course.name}</h2>
                            </div>
                            <div className="course-links">
                                {course.dependises.map((depend) =>(
                                    <div key={depend.id}>
                                        <Link key={depend.id} to={`/${depend.name}/${depend.id}`}>{depend.name}</Link>
                                        <div className="depend-links">
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
                </div> :
                <div className="error_course">
                    <img src={sticker} alt="sticker"/>
                    <h3>Вам не доступен курс, пожалуйста, войдите в свой <Link to="/auth" className="auth_link">аккаунт</Link></h3>
                </div>
            }
        </div>
    )
}
export default Course;