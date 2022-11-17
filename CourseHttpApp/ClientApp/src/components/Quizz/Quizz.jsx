import React, {useContext, useRef, useState} from "react";
import "./Quizz.css"
import {DataContext} from "../../context/DataProvider";

const Quizz = ({data}) => {
    const token = localStorage.getItem("access_token")
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const obj = useRef([])
    const {setProgress} =useContext(DataContext)
    const handleAnswerOptionClick = (indexCorrect) => {
        if (indexCorrect === data[currentQuestion].correct_id) {
            setScore(prevState => prevState + 1)
            obj.current.push({
                task_id:data[currentQuestion].id,
                is_done:true
            })
        }else{
            obj.current.push({
                task_id:data[currentQuestion].id,
                is_done:false
            })
        }
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < data.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            fetch("api/Course",{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body:JSON.stringify({
                    theme_id:localStorage.getItem("theme_id"),
                    course_tasks:obj.current
                })
            })
            let prog = (score / data.length) * 100;
            setProgress(prog)
            setShowScore(true)
        }
    }
    console.log(obj.current)
    const refresh = () =>{
        setCurrentQuestion(0)
        setScore(0)
        obj.current = []
        setShowScore(false)
    }
    let res = obj.current.map(function(item,index) {
        return <tr key={item.task_id}>
            <td>{index + 1}</td>
            <td>{item.is_done ? "+" : "-"}</td>
        </tr>;
    });
    return (
        <div className="quizz-block">
            <div className="quizz">
                {showScore ?
                    <div className="section-score">
                        <div>Правильных ответов {score} из {data.length}</div>
                        {/*<div>
                            {obj.current.map((a,index) => (
                                <div className={a.is_done ? "good" : "bad"}>Вопрос {index + 1}</div>
                            ))}
                        </div>*/}
                        <table>
                            <thead>
                            <tr>
                                <td>Задание</td>
                                <td>Ответ</td>
                            </tr>
                            </thead>
                            <tbody>
                            {res}
                            </tbody>
                        </table>
                        <button
                            className="refresh-btn"
                            onClick={() => refresh()}
                        >Попробовать еще раз</button>
                    </div> :
                    <>
                        <div className="question-section">
                            <div className="question-count">
                                <span>Вопрос {currentQuestion + 1}/{data.length}</span>
                            </div>
                            <div className="question-text">{data[currentQuestion].description}</div>
                        </div>
                        <div className="answer-section">
                            {data[currentQuestion].response_options.map(option => (
                                <button onClick={() => handleAnswerOptionClick(option.id)}
                                        className="answer">{option.title}</button>
                            ))}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
export default Quizz;