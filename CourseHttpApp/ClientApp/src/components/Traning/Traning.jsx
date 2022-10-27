import React, {useState} from "react";
import "./Traning.css"
import NotAuthTraning from "../NotAuthTraning/NotAuthTraning";

const Traning = ({tasks}) =>{
    const token = localStorage.getItem("access_token")
    const data = {}
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
        <div style={{marginLeft:'50px',height:"100%"}}>
            {token?
                /*<div className="traning-block">
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
                </div>*/
                <div>
                <span style={{fontSize:'15px'}}>[</span>
                <>
                    {tasks.map(task => (
                        <div style={{fontSize:'15px',fontWeight:'600',height:"30%",borderColor:'red'}}>
                            <span style={{marginLeft:"50px",}}>{`{`}</span>
                            <p style={{marginLeft:"100px"}}>
                                <span style={{color:'red'}}>"id"</span>: <span style={{color:"blue"}}>"{task.id}</span>"
                            </p>
                            <p style={{marginLeft:"100px"}}>
                                <span style={{color:'red'}}>"description"</span>: <span style={{color:"blue"}}>"{task.title}"</span>
                            </p>
                            <p style={{marginLeft:"100px"}}>
                                <span style={{color:'red'}}>"image_url"</span>: <span style={{color:"blue"}}>"{task.success}"</span>
                            </p>
                            <span style={{marginLeft:"50px"}}>},</span>
                        </div>
                    ))}
                </>
                    <span style={{fontSize:'15px'}}>]</span>
                </div>
                :
                <NotAuthTraning/>
            }
        </div>
    )
}
export default Traning;