import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Course from "./components/Course/Course";
import Traning from "./components/Traning/Traning";
import Contacts from "./components/Contacts/Contacts";

const App = () =>{
    return(
        <div className="App">
            <div className="container">
                <Header/>
                <Routes>
                    <Route path="/" element={<Course/>}/>
                    <Route path="/traning" element={<Traning/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                </Routes>
            </div>
        </div>
    )
}
export default App;