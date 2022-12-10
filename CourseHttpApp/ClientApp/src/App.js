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
import {Toaster} from 'react-hot-toast';

const App = () => {
    const [activeAuth, setActiveAuth] = useState(false)
    const [activeReg, setActiveReg] = useState(false)
    const [activeForgotPass, setActiveForgotPass] = useState(false)

    return (
        <div className="App">
            <div className="container">
                <Header setActiveAuth={setActiveAuth} setActiveReg={setActiveReg}/>
                <div className="main">
                    <Routes>
                        <Route path="/" element={<Course setActive={setActiveAuth}/>}/>
                        <Route path="/training" element={<Training/>}/>
                        <Route path="/contacts" element={<Contacts/>}/>
                        <Route path="/profile/*" element={
                            <PrivateRoute>
                                <Profile/>
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
                              setActiveForgotPass={setActiveForgotPass}/>
                    </Modal>}
                    {activeReg && <Modal>
                        <Register setActiveReg={setActiveReg}/>
                    </Modal>}
                    {activeForgotPass && <Modal>
                        <ForgotPass setActiveForgotPass={setActiveForgotPass}/>
                    </Modal>}
                </div>
            </div>
            <Toaster position="top-center"/>
        </div>
    )
}
export default App;