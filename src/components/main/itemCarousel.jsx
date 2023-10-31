/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ItemCarousel({ items, title, type, description }) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [allowClick, setAllowClick] = useState(true);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    setAllowClick(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const scroll = x - startX;
    containerRef.current.scrollLeft = scrollLeft - scroll;
    setAllowClick(false);
  };

  const handleClick = (e) => {
    e.target.id === "prev"
      ? (containerRef.current.scrollLeft -= 800)
      : (containerRef.current.scrollLeft += 800);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => {
      setAllowClick(true);
    }, 100);
  };

  return (
    <section>
      <div className="main-title main-text">{title}</div>
      <div className="main-title text-darkest-gray">{description}</div>
      <div className="hot-products-container">
        <button onClick={handleClick} id="prev" className="carousel-nav-button">
          {"<"}
        </button>
        <div
          className="hot-products hide-scroll-bar"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {items.length
            ? items.map((item, i) => (
                <div
                  data-testid="product-item"
                  className="product-card"
                  key={i}
                >
                  <Link
                    to={allowClick ? "/store" : "#"}
                    state={{ item: item, type: type }}
                  >
                    <div className="product-thumbnail hot-thumbnail">
                      <img
                        width={160}
                        alt=""
                        src={require(`./../../assets/img/thumbnails/thumbnail${
                          i + 9 + type.length
                        }.jpg`)}
                      />
                    </div>
                    <div className="card-titles">
                      <div className="pointer ">{item.name || item} </div>
                    </div>
                  </Link>
                </div>
              ))
            : null}
        </div>
        <button onClick={handleClick} id="next" className="carousel-nav-button">
          {">"}
        </button>
      </div>
    </section>
  );
}

ItemCarousel.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
};
