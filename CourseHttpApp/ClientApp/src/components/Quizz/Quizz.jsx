import React, {useState} from "react";
import "./Quizz.css"

const Quizz = ({data}) => {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)

    const handleAnswerOptionClick = (indexCorrect) => {
        if (indexCorrect === data[currentQuestion].correct_id) {
            setScore(prevState => prevState + 1)
        }
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < data.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            setShowScore(true)
        }
    }
    const refresh = () =>{
        setCurrentQuestion(0)
        setScore(0)
        setShowScore(false)
    }
    return (
        <div className="quizz-block">
            <div className="quizz">
                {showScore ?
                    <div className="section-score">
                        <div>Правильных ответов {score} из {data.length}</div>
                        <button
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