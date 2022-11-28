import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./Accordion.css";
import {StyledEngineProvider} from '@mui/material/styles';

const AccordionBlock = ({title, handleClickTheme, id}) => {
    return (
        <StyledEngineProvider injectFirst>
            <Accordion className="accordion">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography component={'span'}>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography component={'span'}>
                        <div className="accordion-item" onClick={() => handleClickTheme(id, 1)}>Теория</div>
                    </Typography>
                    <Typography component={'span'}>
                        <div className="accordion-item" onClick={() => handleClickTheme(id, 2)}>Практика</div>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </StyledEngineProvider>
    )
}
export default AccordionBlock;
