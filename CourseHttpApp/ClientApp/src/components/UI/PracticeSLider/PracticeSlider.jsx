import React,{useState,useEffect} from "react";
import "./PracticeSlider.css"
import {FiChevronsLeft, FiChevronsRight} from "react-icons/fi";

const PracticeSlider = ({practice}) =>{
    const [currentIndex,setCurrentIndex] = useState(0)
    useEffect(() =>{
        const lastIndex = practice.length - 1
        if(currentIndex < 0){
            setCurrentIndex(lastIndex)
        }
        if(currentIndex > lastIndex){
            setCurrentIndex(0)
        }
    },[currentIndex,practice])
    return(
        <section className="section">
            <div className="section-center">
                <div>
                    {practice.map((e,e_index) =>{
                        const {id,description} = e
                        let position = 'nextSlide'
                        if(e_index === currentIndex || practice.length === 1){
                            position="activeSlide"
                        }else if(e_index === currentIndex -1 || (currentIndex === 0 && e_index === practice.length -1)){
                            position="lastSlide"
                        }
                        return(
                            <article className={position} key={id}>
                                <p className="slick-desc">{description}</p>
                            </article>
                        )
                    })
                    }
                </div>
                {practice.length !== 1 &&
                    <div>
                        <button className="prev" onClick={() => setCurrentIndex(prevState => prevState - 1)}>
                            <FiChevronsLeft/>
                        </button>
                        <button className="next" onClick={() => setCurrentIndex(prevState => prevState + 1)}>
                            <FiChevronsRight/>
                        </button>
                    </div>
                }
            </div>
        </section>
    )
}
export default PracticeSlider;