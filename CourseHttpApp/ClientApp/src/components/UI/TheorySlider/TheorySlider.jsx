﻿import React, {useState, useEffect} from "react";
import "./TheorySlider.css"
import {Pagination} from '@mui/material';
import {StyledEngineProvider} from "@mui/material/styles";

const SliderComponent = ({data}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    useEffect(() => {
        const lastIndex = data?.length - 1
        if (currentIndex < 0) {
            setCurrentIndex(lastIndex)
        }
        if (currentIndex > lastIndex) {
            setCurrentIndex(0)
        }
    }, [currentIndex, data])

    const paginationChange = (event, page) => {
        setCurrentIndex(page)
    }
    
    return (
        <section className="section">
            <div className="section-center">
                <div className="section-content">
                    {data?.map((e, e_index) => {
                        const {id, description, image_url} = e
                        let position = 'nextSlide'
                        if (e_index === currentIndex) {
                            position = "activeSlide"
                        }
                        if (e_index === currentIndex - 1 || (currentIndex === 0 && e_index === data?.length - 1)) {
                            position = "lastSlide"
                        }
                        return (
                            <article className={`slider ${position}`} key={id}>
                                <p className="slick-desc">{description}</p>
                                {image_url ?
                                    <img src={image_url} alt="photo" width={600}
                                         height={200}/> : <></>}
                            </article>
                        )
                    })
                    }
                </div>
            </div>
            <StyledEngineProvider injectFirst>
                <Pagination variant="outlined" shape="rounded" size="large" className="pagination" count={data?.length}
                            onChange={(event, page) => paginationChange(event, page - 1)}/>
            </StyledEngineProvider>
        </section>
    )
}

export default SliderComponent;
