import React from "react";
import "./Loader.css"
import {BeatLoader} from 'react-spinners'
const Loader = () =>{
    return(
        <div className="loader">
            <BeatLoader color="#5e73d0" size={50}/>
        </div>
    )
}

export default Loader;