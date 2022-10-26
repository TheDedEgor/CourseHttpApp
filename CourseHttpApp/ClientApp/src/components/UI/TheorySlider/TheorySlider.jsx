import React,{useState,useEffect} from "react";
import "./TheorySlider.css"
import {FiChevronsRight} from "react-icons/fi";
import {FiChevronsLeft} from "react-icons/fi";
import photo from '../../../images/theory-1-2.png'
const SliderComponent = ({data}) =>{
    const [currentIndex,setCurrentIndex] = useState(0)
    useEffect(() =>{
       const lastIndex = data.length -1
        if(currentIndex < 0){
            setCurrentIndex(lastIndex)
        }
        if(currentIndex > lastIndex){
            setCurrentIndex(0)
        }
    },[currentIndex,data])
    return(
        <section className="section">
            <div className="section-center">
                <div>
                    {data.map((e,e_index) =>{
                        const {id,description} = e
                        let position = 'nextSlide'
                        if(e_index === currentIndex){
                            position="activeSlide"
                        }
                        if(e_index === currentIndex -1 || (currentIndex === 0 && e_index === data.length -1)){
                            position="lastSlide"
                        }
                        return(
                            <article className={position} key={id}>
                                <p className="slick-desc">{description}</p>
                                <img src={photo} alt="photo"/>
                            </article>
                        )
                    })
                    }
                </div>
                <div>
                    <button className="prev" onClick={() => setCurrentIndex(prevState => prevState - 1)}>
                        <FiChevronsLeft/>
                    </button>
                    <button className="next" onClick={() => setCurrentIndex(prevState => prevState + 1)}>
                        <FiChevronsRight/>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default SliderComponent;
