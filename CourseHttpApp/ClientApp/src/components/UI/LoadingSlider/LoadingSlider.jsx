import React from "react";
import "./LoadingSlider.css"
import {ClipLoader} from 'react-spinners'

const LoadingSlider = () =>{
    return(
        <div className="loading_slider">
            <ClipLoader color="#5e73d0" size={50} className="loading_slider"/>
        </div>
    )
    
}

export default LoadingSlider;