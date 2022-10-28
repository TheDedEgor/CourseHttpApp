import React from "react";
import {useLocation,Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const token = localStorage.getItem("access_token")
    if(token === null){
        return <Navigate to="/"/>
    }
    return children;
}

export default PrivateRoute