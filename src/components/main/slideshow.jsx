import React from "react";
import "./../../assets/css/slideshow.css";
import img1 from "./../../assets/img/slideshow/1.jpg";
import img2 from "./../../assets/img/slideshow/2.jpg";
import img3 from "./../../assets/img/slideshow/3.jpg";

const images = [img1, img2, img3];
const delay = 4500;
export default function SlideShow() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div role="banner" className="slideshow">

      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((img, index) => (
          <div className="slide" alt="" key={index} style={{backgroundImage: `url(${img})` }}></div>
        ))}
      </div>

      {/* <div className="slideshowDots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div> */}
    </div>
  );
}
