import React,{useState,useEffect} from "react";
import "./SliderComponent.css"
import Slider from 'react-slick'
import {FiChevronRight, FiChevronsRight} from "react-icons/fi";
import {FiChevronsLeft} from "react-icons/fi";

const SliderComponent = ({d,title}) =>{
    const [currentIndex,setCurrentIndex] = useState(0)
    useEffect(() =>{
       const lastIndex = d.length -1
        if(currentIndex < 0){
            setCurrentIndex(lastIndex)
        }
        if(currentIndex > lastIndex){
            setCurrentIndex(0)
        }
    },[currentIndex,d])
    return(
        <section className="section">
            <div className="title">
                <span>
                     <h2>{title}</h2>
                </span>
            </div>
            <div className="section-center">
                {d.map((e,e_index) =>{
                    const {id,description} = e
                    let position = 'nextSlide'
                    if(e_index === currentIndex){
                        position="activeSlide"
                    }
                    if(e_index === currentIndex -1 || (currentIndex === 0 && e_index === d.length -1)){
                        position="lastSlide"
                    }
                    return(
                        <article className={position} key={id}>
                            <p>{description}</p>
                        </article>
                    )
                })}
                <button className="prev" onClick={() => setCurrentIndex(prevState => prevState - 1)}>
                    <FiChevronsLeft/>
                </button>
                <button className="next" onClick={() => setCurrentIndex(prevState => prevState + 1)}>
                    <FiChevronsRight/>
                </button>
            </div>
        </section>
    )
}

export default SliderComponent;
