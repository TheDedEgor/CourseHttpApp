import React,{useState,useRef} from 'react'
import "./Accordion.css"
import Chevron from "./Chevron/Chevron";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AccordionBlock = ({title,handleClickTheme,id}) =>{
    
    /*const [setActive,setActiveState] = useState("")
    const [setHeight,setHeightState] = useState("0")
    const [setRotate,setRotateState] = useState("accordion-icon")
    
    const content = useRef(null)
    
    function toggleAccordion () {
        setActiveState(setActive === "" ? "active-item" : "")
        setHeightState(setActive === "active-item" ? "0px" : `${content.current.scrollHeight}px`)
        setRotateState(
            setActive === 'active-item' ? "accordion-icon" : "accordion-icon rotate"
        )
    }*/
    {/*<Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Accordion 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion disabled>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>Disabled Accordion</Typography>
                </AccordionSummary>
            </Accordion>*/}
    return(
        /*<div className="accordion-section">
            <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
                <p className="accordion-title">{title}</p>
                <Chevron setRotate={setRotate}/>
            </button>
            <div ref={content} style={{maxHeight: `${setHeight}`}} className="accordion-content">
                <p onClick={() => handleClickTheme(id,1)} className="accordion-text">Теория</p>
                <p onClick={() => handleClickTheme(id,2)} className="accordion-text">Практика</p>
            </div>
        </div>*/
            <Accordion className="accordion" disabled={id > 1}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <p onClick={() => handleClickTheme(id,1)}>Теория</p>
                    </Typography>
                    <Typography>
                        <p onClick={() => handleClickTheme(id,2)}>Практика</p>
                    </Typography>
                </AccordionDetails>
            </Accordion>
    )
}
export default AccordionBlock;