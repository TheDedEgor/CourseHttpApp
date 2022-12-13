import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import {DataContext} from "../../context/DataProvider";

const PrivateRouteProfile = ({children}) => {
    const {token} = useContext(DataContext)
    if (!token) {
        return <Navigate to="/"/>
    }
    return children;
}

export default PrivateRouteProfile