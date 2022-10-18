import React from "react";
import "./PrivateRoute.css"
import {Route,useNavigate} from "react-router-dom";
const PrivateRoute = ({component:Component,token}) => {
    const navigate = useNavigate()
    return (
        <Route>
            render={props => ((token !== null) ? navigate('/') : <Component {...props}/>
        )}
        </Route>
    )
}

export default PrivateRoute