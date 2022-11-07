import React from "react";
import "./Chevron.css"
import {AiOutlineArrowDown} from 'react-icons/ai'
const Chevron = ({setRotate}) => {
    return (
        <AiOutlineArrowDown className={setRotate}/>
    )
}
export default Chevron;