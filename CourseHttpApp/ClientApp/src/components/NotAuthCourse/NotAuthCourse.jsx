import React from "react";
import "./NotAuthCourse.css"
import course_photo from '../../images/course_photo.png'
import {AiFillCheckCircle} from 'react-icons/ai'
import junior from '../../images/junior.png'
import senior from '../../images/senior.png'

const NotAuthCourse = ({setActive}) => {
    return(
        <div className="error_course">
            <div className="error-course-content-1 course-not-auth">
                <div className="course-desc">
                    <p className="course-desc-title">HTTP</p>
                    <p>HTTP — протокол прикладного уровня передачи данных, изначально — в виде гипертекстовых документов в формате HTML,
                        в настоящее время используется для передачи произвольных данных.
                    </p>
                    <p className="auth-btn" onClick={() => setActive(true)}>Начать курс</p>
                </div>
                <div className="course-photo">
                    <img src={course_photo} alt="Курс Http" width={700} height={400}/>
                </div>
            </div>
            <div className="error-course-content-2 course-not-auth">
                <div className="error-course-content-2-title">
                    <p>Что вас ожидает на курсе</p>
                </div>
                <div className="course-flex-items">
                    <div className="course-flex item1">
                        <AiFillCheckCircle size={40}/>
                        <p>Ознакомитесь с теорией по HTTP-протоколу</p>
                    </div>
                    <div className="course-flex item2">
                        <AiFillCheckCircle size={40}/>
                        <p>Пройдете тесты по каждой теме курса</p>
                    </div>
                    <div className="course-flex item3">
                        <AiFillCheckCircle size={40}/>
                        <p>Закрепите теорию на тренажере с заданиями</p>
                    </div>
                    <div className="course-flex item4">
                        <AiFillCheckCircle size={40}/>
                        <p>Отследите свою статистику в профиле</p>
                    </div>
                    <div className="course-flex item5">
                        <AiFillCheckCircle size={40}/>
                        <p>Научитесь работать с HTTP-протоколом</p>
                    </div>
                    <div className="course-flex item6">
                        <AiFillCheckCircle size={40}/>
                        <p>Веселое времяпрепровождение)</p>
                    </div>
                </div>
            </div>
            <div className="error-course-content-3 course-not-auth">
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
        </div>
    )
}

export default NotAuthCourse;