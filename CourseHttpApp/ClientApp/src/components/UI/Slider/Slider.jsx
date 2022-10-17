import React, {useState} from "react";
import "./Slider.css"

const Slider = ({a,title}) =>{
    const [index,setIndex] = useState(0)
    
    return(
        <section className="section">
            <div className="section-center">
                {a.theory.map((example,example_index) =>{
                    const {id,description,image_url} = example
                    let position = 'nextSlide'
                    if(example_index === index){
                        position ="activeSlide"
                    }
                    if(example_index === index -1 || (index === 0 && example_index === example.length -1)){
                        position = "lastSLide"
                    }
                    return (
                        <article className={position} key={id}>
                            <h1>{title}</h1>
                            <h3>{description}</h3>
                        </article>
                    )
                })}
                <button onClick={() =>setIndex(prevState => prevState + 1)}>
                    Лево
                </button>
                <button onClick={() =>setIndex(prevState => prevState - 1)}>
                    Лево
                </button>
            </div>
        </section>
    )
}

export default Slider;