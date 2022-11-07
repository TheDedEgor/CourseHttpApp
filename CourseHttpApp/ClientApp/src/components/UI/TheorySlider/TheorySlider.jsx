import React, {useState, useEffect} from "react";
import "./TheorySlider.css"
import {AiOutlineArrowRight} from "react-icons/ai";
import {AiOutlineArrowLeft} from "react-icons/ai";
import photo from '../../../images/theory-1-2.png'
import photo2 from '../../../images/theory-1-1.png'

const SliderComponent = ({data}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    useEffect(() => {
        const lastIndex = data.length - 1
        if (currentIndex < 0) {
            setCurrentIndex(lastIndex)
        }
        if (currentIndex > lastIndex) {
            setCurrentIndex(0)
        }
    }, [currentIndex, data])
    return (
        <section className="section">
            <div className="section-center">
                <div>
                    {data?.map((e, e_index) => {
                        const {id, description} = e
                        let position = 'nextSlide'
                        if (e_index === currentIndex) {
                            position = "activeSlide"
                        }
                        if (e_index === currentIndex - 1 || (currentIndex === 0 && e_index === data.length - 1)) {
                            position = "lastSlide"
                        }
                        return (
                            <article className={`slider ${position}`} key={id}>
                                <p className="slick-desc">{description}</p>
                                <img src={e_index === 0 ? photo2 : photo} alt="photo" width={600} height={200}/>
                            </article>
                        )
                    })
                    }
                </div>
                <div>
                    <button className={currentIndex === 0 ? "prev-none" : 'prev'}
                            onClick={() => setCurrentIndex(prevState => prevState - 1)}>
                        <AiOutlineArrowLeft/>
                    </button>
                    <button className={currentIndex === data.length - 1 ? "next-none" : 'next'}
                            onClick={() => setCurrentIndex(prevState => prevState + 1)}>
                        <AiOutlineArrowRight/>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default SliderComponent;
