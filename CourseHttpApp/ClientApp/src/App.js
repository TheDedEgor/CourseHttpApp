import React, {useState} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Course from "./components/Course/Course";
import Contacts from "./components/Contacts/Contacts";
import Auth from "./components/Auth/Auth";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import ForgotPass from "./components/ForgotPass/ForgotPass";
import NewPass from "./components/NewPass/NewPass";
import Modal from './components/UI/Modal/Modal'
import Training from "./components/Training/Training";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const App = () => {
    const tasks = [
        {
            id: 1,
            title: "Отправьте GET-запрос по URL-https://jsonplaceholder.typicode.com/todos",
            success: '323217f643c3e3f1fe7532e72ac01bb0748c97be',
        },
        {
            id: 2,
            title: "Отправьте POST-запрос по URL-https://jsonplaceholder.typicode.com/todos",
            success: '323217f643c3e3f1fe7532e72ac01bb0748c97besdsdsd',
        },
        {
            id: 3,
            title: "Отправьте GET-запрос по URL-https://jsonplaceholder.typicode.com/todos",
            success: '323217f643c3e3f1fe7532e72ac01bb0748c97be',
        },
        {
            id: 4,
            title: "Отправьте GET-запрос по URL-https://jsonplaceholder.typicode.com/todos",
            success: '323217f643c3e3f1fe7532e72ac01bb0748c97be',
        },
        {
            id: 5,
            title: "Отправьте GET-запрос по URL-https://jsonplaceholder.typicode.com/todos",
            success: '323217f643c3e3f1fe7532e72ac01bb0748c97be',
        },
        {
            id: 6,
            title: "Отправьте GET-запрос по URL-https://jsonplaceholder.typicode.com/todos",
            success: '323217f643c3e3f1fe7532e72ac01bb0748c97be',
        },
        {
            id: 7,
            title: "Отправьте GET-запрос по URL-https://jsonplaceholder.typicode.com/todos",
            success: '323217f643c3e3f1fe7532e72ac01bb0748c97be',
        },
        {
            id: 8,
            title: "Отправьте GET-запрос по URL-https://jsonplaceholder.typicode.com/todos",
            success: '323217f643c3e3f1fe7532e72ac01bb0748c97be',
        },
        {
            id: 9,
            title: "Отправьте GET-запрос по URL-https://jsonplaceholder.typicode.com/todos",
            success: '323217f643c3e3f1fe7532e72ac01bb0748c97be',
        },
        {
            id: 10,
            title: "Отправьте GET-запрос по URL-https://jsonplaceholder.typicode.com/todos",
            success: '323217f643c3e3f1fe7532e72ac01bb0748c97be',
        },
        {
            id: 11,
            title: "Отправьте GET-запрос по URL-https://jsonplaceholder.typicode.com/todos",
            success: '323217f643c3e3f1fe7532e72ac01bb0748c97be',
        },
        {
            id: 11,
            title: "Отправьте GET-запрос по URL-https://jsonplaceholder.typicode.com/todos",
            success: '323217f643c3e3f1fe7532e72ac01bb0748c97be',
        },
        {
            id: 11,
            title: "Отправьте GET-запрос по URL-https://jsonplaceholder.typicode.com/todos",
            success: '323217f643c3e3f1fe7532e72ac01bb0748c97be',
        },
        {
            id: 11,
            title: "Отправьте GET-запрос по URL-https://jsonplaceholder.typicode.com/todos",
            success: '323217f643c3e3f1fe7532e72ac01bb0748c97be',
        },
        {
            id: 11,
            title: "Отправьте GET-запрос по URL-https://jsonplaceholder.typicode.com/todos",
            success: '323217f643c3e3f1fe7532e72ac01bb0748c97be',
        },
        {
            id: 11,
            title: "Отправьте GET-запрос по URL-https://jsonplaceholder.typicode.com/todos",
            success: '323217f643c3e3f1fe7532e72ac01bb0748c97be',
        }
        
    ]
    const [activeAuth, setActiveAuth] = useState(false)
    const [activeReg, setActiveReg] = useState(false)
    const [activeForgotPass, setActiveForgotPass] = useState(false)
    const [token, setToken] = useState(localStorage.getItem("access_token"));
    return (
        <div className="App">
            <div className="container">
                <Header setActiveAuth={setActiveAuth} setActiveReg={setActiveReg} setToken={setToken} token={token}/>
                <div className="main">
                    <Routes>
                        <Route path="/" element={<Course setActive={setActiveAuth}/>}/>
                        <Route path="/training" element={<Training/>}/>
                        <Route path="/contacts" element={<Contacts/>}/>
                        <Route path="/profile" element={
                            <PrivateRoute>
                                <Profile setToken={setToken}/>
                            </PrivateRoute>
                        }/>
                        <Route path="/newPass" element={
                            <PrivateRoute>
                                <NewPass/>
                            </PrivateRoute>
                        }/>
                    </Routes>
                    {activeAuth && <Modal>
                        <Auth setActiveAuth={setActiveAuth} setActiveReg={setActiveReg}
                              setActiveForgotPass={setActiveForgotPass} setToken={setToken}/>
                    </Modal>}
                    {activeReg && <Modal>
                        <Register setActiveReg={setActiveReg} setToken={setToken}/>
                    </Modal>}
                    {activeForgotPass && <Modal>
                        <ForgotPass setActiveForgotPass={setActiveForgotPass}/>
                    </Modal>}
                </div>
            </div>
        </div>
    )
}
export default App;