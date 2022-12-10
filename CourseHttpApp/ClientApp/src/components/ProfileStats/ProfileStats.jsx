import "./ProfileStats.css"
import {Box, IconButton, LinearProgress, Typography} from "@mui/material";
import React, {useRef, useState} from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {StyledEngineProvider} from "@mui/material/styles";

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{width: '100%', mr: 1}}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{minWidth: 35}}>
                <Typography variant="body2">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

const ProfileStats = ({stats}) => {
    const [showDetailsStats, setShowDetailsStats] = useState(false)
    const dropBtn = useRef()

    const clickDetails = () => {
        setShowDetailsStats(!showDetailsStats)
        dropBtn.current.classList.toggle("rotate-drop-btn-stats")
    }

    return (
        <div className="stats-block">
            <div className="item-stats-block">
                <h1 className="title-stats">Глобальная статистика</h1>
                <div className="item-stats">
                    {`Решено ${stats.global.correct_count} из ${stats.global.total_count}`}
                    <LinearProgressWithLabel value={stats.global.value}/>
                </div>
            </div>
            <div className="item-stats-block">
                <h1 className="title-stats">Статистика по тренажеру</h1>
                <div className="item-stats">
                    {`Решено ${stats.training.correct_count} из ${stats.training.total_count}`}
                    <LinearProgressWithLabel value={stats.training.value}/>
                </div>
            </div>
            <div className="item-stats-block">
                <div className="stats-themes">
                    <h1 className="title-stats">Статистика по практике курса</h1>
                    <StyledEngineProvider injectFirst>
                        <IconButton ref={dropBtn} disableRipple onClick={clickDetails} sx={{
                            color: "var(--color-text-profile)",
                            transition: "all 0.5s ease"
                        }}>
                            <ArrowDropDownIcon/>
                        </IconButton>
                    </StyledEngineProvider>
                </div>
                <div className="item-stats">
                    {`Решено ${stats.course.correct_count} из ${stats.course.total_count}`}
                    <LinearProgressWithLabel value={stats.course.value}/>
                </div>
            </div>
            {
                showDetailsStats ? <div className="item-stats-block">
                        <h1 className="title-stats title-all-themes">Статистика по каждой теме курса</h1>
                        <div className="stats-all-themes">
                            {stats.themes.map((item, index) => (
                                <div key={index}>
                                    <h2 className="title-theme-stats">{item.title}</h2>
                                    <div className="item-stats">
                                        {`Решено ${item.correct_count} из ${item.total_count}`}
                                        <LinearProgressWithLabel value={item.value}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    : <></>
            }
        </div>
    )
}

export default ProfileStats;