import React from "react";
import {Link} from 'react-router-dom'
import "./NotAuth.css"
import course_photo from '../../images/course_photo.png'
import {AiFillCheckCircle} from 'react-icons/ai'
import junior from '../../images/junior.png'
import senior from '../../images/senior.png'
const NotAuth = ({link}) => {
    return(
        <div className="error_course">
            <div className="error-course-content-1">
                <div className="course-desc">
                    <p className="course-desc-title">HTTP</p>
                    <p>HTTP — протокол прикладного уровня передачи данных, изначально — в виде гипертекстовых документов в формате HTML,
                        в настоящее время используется для передачи произвольных данных.
                    </p>
                    <Link className="auth-btn" to="/auth">Записаться на курс</Link>
                </div>
                <div className="course-photo">
                    <img src={course_photo} alt="Курс Http" width={700} height={400}/>
                </div>
            </div>
            <div className="error-course-content-2">
                <div className="error-course-content-2-title">
                    <p>Чему вы научитесь</p>
                </div>
                <div className="course-flex-items">
                    <div className="course-flex item1">
                        <AiFillCheckCircle size={40}/>
                        <p>Создавать простые и сложные модульные программы: от консольных скриптов до чат-ботов</p>
                    </div>
                    <div className="course-flex item2">
                        <AiFillCheckCircle size={40}/>
                        <p>Работать с базами данных</p>
                    </div>
                    <div className="course-flex item3">
                        <AiFillCheckCircle size={40}/>
                        <p>Использовать промышленные средства разработки: Git, PyCharm, Postman</p>
                    </div>
                    <div className="course-flex item4">
                        <AiFillCheckCircle size={40}/>
                        <p>Упаковывать проекты в Docker и применять DevOps-практики</p>
                    </div>
                    <div className="course-flex item5">
                        <AiFillCheckCircle size={40}/>
                        <p>Упаковывать проекты в Docker и применять DevOps-практики</p>
                    </div>
                    <div className="course-flex item6">
                        <AiFillCheckCircle size={40}/>
                        <p>Упаковывать проекты в Docker и применять DevOps-практики</p>
                    </div>
                </div>
            </div>
            <div className="error-course-content-3">
                <div className="error-course-content-3-title">
                    <p>Кому подойдет этот курс</p>
                </div>
                <div className="error-course-content-3-flex">
                    <div className="flex">
                        <img src={junior} alt="junior" width={250} height={250}/>
                        <p>Начинающим программистам</p>
                    </div>
                    <div className="flex">
                        <img src={senior} alt="senior" width={250} height={250}/>
                        <p>Тем, кто уже имеет опыт в HTTP и хочет обновить свои навыки</p>
                    </div>
                </div>
            </div>
            <div className="error-course-content-4">
                <div className="error-course-content-4-title">
                    <p>Как проходит обучение на платформе</p>
                </div>
            </div>
            <div className="error-course-content-5">
                
            </div>
        </div>
    )
}

export default NotAuth;