import React,{useState,useRef} from 'react'
import "./Accordion.css"
import Chevron from "./Chevron/Chevron";

const Accordion = ({title,handleClickTheme,id}) =>{
    
    const [setActive,setActiveState] = useState("")
    const [setHeight,setHeightState] = useState("0")
    const [setRotate,setRotateState] = useState("accordion-icon")
    
    const content = useRef(null)
    
    function toggleAccordion () {
        setActiveState(setActive === "" ? "active-item" : "")
        setHeightState(setActive === "active-item" ? "0px" : `${content.current.scrollHeight}px`)
        setRotateState(
            setActive === 'active-item' ? "accordion-icon" : "accordion-icon rotate"
        )
    }
    return(
        <div className="accordion-section">
            <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
                <p className="accordion-title">{title}</p>
                <Chevron setRotate={setRotate}/>
            </button>
            <div ref={content} style={{maxHeight: `${setHeight}`}} className="accordion-content">
                <p onClick={() => handleClickTheme(id,1)} className="accordion-text">Теория</p>
                <p onClick={() => handleClickTheme(id,2)} className="accordion-text">Практика</p>
            </div>
        </div>
    )
}
export default Accordion;