/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

function Carrousel ({images}){
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const goToNextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
  
    useEffect(() => {
      const intervalId = setInterval(goToNextSlide, 5000); 
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <div className="carousel">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      </div>
    );
  }

export default Carrousel
