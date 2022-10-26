import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Course from "./components/Course/Course";
import Traning from "./components/Traning/Traning";
import Contacts from "./components/Contacts/Contacts";
import Auth from "./components/Auth/Auth";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import ForgotPass from "./components/ForgotPass/ForgotPass";
import NewPass from "./components/NewPass/NewPass";
import Modal from './components/UI/Modal/Modal'

const App = () => {
    const tasks = [
        {
            id: 1,
            title: "Напишите запрос GET",
            success: false
        },
        {
            id: 2,
            title: "Напишите запрос POST",
            success: false
        },
        {
            id: 3,
            title: "Напишите запрос PUT",
            success: false
        },
        {
            id: 4,
            title: "Напишите запрос POST",
            success: false
        },
        {
            id: 5,
            title: "Напишите запрос POST",
            success: false
        },
        {
            id: 6,
            title: "Напишите запрос POST",
            success: false
        },
    ]
    const [active, setActive] = useState(false)
    return (
        <div className="App">
            <div className="container">
                <Header setActive={setActive}/>
                <>
                    <Routes>
                        <Route path="/:title/:id/:slider_id/*" element={<Course/>}/>
                        <Route path="/" element={<Course setActive={setActive}/>}/>
                        <Route path="/traning" element={<Traning tasks={tasks}/>}/>
                        <Route path="/contacts" element={<Contacts/>}/>
                        <Route path="/reg" element={<Register/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/forgotPass" element={<ForgotPass/>}/>
                        <Route path="/newPass" element={<NewPass/>}/>
                    </Routes>
                    {active && <Modal>
                        <Auth setActive={setActive}/>
                    </Modal>}
                </>
            </div>
        </div>
    )
}
export default App;