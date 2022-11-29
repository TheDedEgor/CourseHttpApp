import React, {useEffect, useRef, useState} from "react";
import "./Quizz.css";


const Quizz = ({data}) => {
    const token = localStorage.getItem("access_token")
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const obj = useRef([])
    const animation = useRef()

    const Animation = () => {
        animation.current.classList.add('box-animation')
        setTimeout(() => {
            animation.current.classList.remove('box-animation');
        }, 1000)
    }

    useEffect(() => {
        Animation()
    }, [currentQuestion,data])

    const handleAnswerOptionClick = (indexCorrect) => {
        

        if (indexCorrect === data[currentQuestion].correct_id) {
            setScore(prevState => prevState + 1)
            obj.current.push({
                task_id: data[currentQuestion].id,
                is_done: true
            })
        } else {
            obj.current.push({
                task_id: data[currentQuestion].id,
                is_done: false
            })
        }
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < data.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            fetch("api/Course", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    theme_id: localStorage.getItem("theme_id"),
                    course_tasks: obj.current
                })
            })
            let prog = (score / data.length) * 100;
            setShowScore(true)
        }
    }
    const refresh = () => {
        setCurrentQuestion(0)
        setScore(0)
        obj.current = []
        setShowScore(false)
    }
    let res = obj.current?.map(function (item, index) {
        return <tr key={item.task_id}>
            <td>{index + 1}</td>
            <td className={item.is_done ? "good" : "bad"}>{item.is_done ? "+" : "-"}</td>
        </tr>;
    });
    return (
        <div className="quizz">
            {showScore ?
                <div className="section-score">
                    <div>Правильных ответов {score} из {data.length}</div>
                    <table className="result-test">
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
                        onClick={() => refresh()}>
                        Повтор
                    </button>
                </div> :
                <>
                    <div className="question-count">
                        <span>Вопрос {currentQuestion + 1}/{data.length}</span>
                    </div>
                    <div className="box-question" ref={animation}>
                        <div className="question-section">
                            <div className="question-text">{data[currentQuestion].description}</div>
                        </div>
                        <div className="answer-section">
                            {data[currentQuestion].response_options?.map(option => (
                                <button onClick={() => handleAnswerOptionClick(option.id)} key={option.id}
                                        className="answer">{option.title}</button>
                            ))}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
export default Quizz;