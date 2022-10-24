import React, {useState} from "react";
import "./Traning.css"
import {Link} from 'react-router-dom'
import sticker from '../../images/bad_sticker.png'
import NotAuth from "../NotAuth/NotAuth";
import NotAuthTraning from "../NotAuthTraning/NotAuthTraning";
const Traning = ({tasks}) =>{
    const token = localStorage.getItem("access_token")
    const params = ['Params','Header','Body']
    const [activeParams,setActiveParams] = useState(-1)
    const [visible,setVisible] = useState(-1)
    const onCLickParams = (index)=>{
        setActiveParams(index)
    }
    const onCLickTask = (index) =>{
        setVisible(index)
    }
    return(
        <div>
            {token?
                <div className="traning-block">
                        <div className="traning-from">
                            <h1>Тренажёр</h1>
                            <form>
                                <div className="request-block">
                                    <select>
                                        <option>GET</option>
                                        <option>POST</option>
                                        <option>PUT</option>
                                        <option>DELETE</option>
                                    </select>
                                    <input placeholder="Введите адрес URL"/>
                                    <button>Отправить</button>
                                </div>
                            </form>
                        </div>
                    <div className="bottom-block">
                        <div className="task-block">
                            {tasks.map((task,id) =>(
                                <div className="task">
                                    <h3 className="task-title" onClick={() => onCLickTask(id)}>Задача {task.id}</h3>
                                    <div className={visible === id ? 'active-task' : 'not-active-task'}>
                                        <p >{task.title}</p>
                                        <span className="start-task">Начать</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="params-block">
                                {params.map((value,i) =>(
                                    <div className="params-links">
                                        <p onClick={() =>onCLickParams(i)} className={activeParams === i ? 'active' : ''}>
                                                {value}
                                        </p>
                                        <div className={activeParams === i ? 'active-params' : 'not-active-params' }>
                                            <h2>lorem</h2>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                :
                <NotAuthTraning/>
            }
        </div>
    )
}
export default Traning;