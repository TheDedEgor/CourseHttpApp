import React from "react";
import "./AuthValid.css";

const  AuthValid = (props) =>{
    
    return(
        <div className="auth_error_msg">
            {props.error_msg}
        </div>
    )
}
export default AuthValid;