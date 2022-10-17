import React from "react";
import "./RegValid.css";

const  RegValid = (props) =>{

    return(
        <div className="reg_error_msg">
            {props.error_msg}
        </div>
    )
}
export default RegValid;