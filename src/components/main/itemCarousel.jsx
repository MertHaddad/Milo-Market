import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ItemCarousel({ items, title, type,description }) {
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

  useEffect(() => {
    setTimeout(
      () => {
        containerRef.current.scrollLeft = scrollLeft + 800;
      },
      type === "brand" ? 400 : 800
    );
    setTimeout(
      () => {
        containerRef.current.scrollLeft = scrollLeft - 800;
      },
      type === "brand" ? 1300 : 1800
    );
  }, []);

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => {
      setAllowClick(true);
    }, 100);
  };

  return (
    <>
      <div className="main-title main-text">{title}</div>
      <div className="main-title text-darkest-gray">{description}</div>
      <div className="hot-products-container">
        <div
          className="hot-products"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {items.length
            ? items.map(
                (item, i) =>
                  i < 20 && (
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
                  )
              )
            : null}
        </div>
      </div>
    </>
  );
}
