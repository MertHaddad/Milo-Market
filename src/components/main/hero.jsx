import React from "react";
import ProtoTypes from "prop-types";
// import demo from "./../../assets/img/hero-brand/hero-brand1.png";
// eslint-disable-next-line no-undef
const images = require.context('./../../assets/img', true);


export default function Hero({ classType = "hero-brand" }) {
  const content = {
    "hero-brand": [
      {
        img: "./../../assets/img/hero-brand/hero-brand",
        title: "Brand Title Mark",
        url: "",
      },
      {
        img: "./../../assets/img/hero-brand/hero-brand",
        title: "Brand Title Mark",
        url: "",
      },
      {
        img: "./../../assets/img/hero-brand/hero-brand",
        title: "Brand Title Mark",
        url: "",
      },
      {
        img: "./../../assets/img/hero-brand/hero-brand",
        title: "Brand Title Mark",
        url: "",
      },
      {
        img: "./../../assets/img/hero-brand/hero-brand",
        title: "Brand Title Mark",
        url: "",
      },
      {
        img: "./../../assets/img/hero-brand/hero-brand",
        title: "Brand Title Mark",
        url: "",
      },
    ],
    "hero-tag": [
      {
        img: "./../../assets/img/hero-tag/hero-tag",
        title: "Tag Title Mark",
        url: "",
      },
      {
        img: "./../../assets/img/hero-tag/hero-tag",
        title: "Tag Title Mark",
        url: "",
      },
      {
        img: "./../../assets/img/hero-tag/hero-tag",
        title: "Tag Title Mark",
        url: "",
      },
      {
        img: "./../../assets/img/hero-tag/hero-tag",
        title: "Tag Title Mark",
        url: "",
      },
      {
        img: "./../../assets/img/hero-tag/hero-tag",
        title: "Tag Title Mark",
        url: "",
      },
      {
        img: "./../../assets/img/hero-tag/hero-tag",
        title: "Tag Title Mark",
        url: "",
      },
    ],
  };

  return (
    <section className={`${classType}-container`}>
      {content[classType].map((el, i) => (
        <div
          // eslint-disable-next-line no-undef
          style={{ backgroundImage: `url(${images(`./${classType}/${classType}${i + 1}.png`)})`}}
            
          key={i}
          className={classType}
        >
            <span className="hero-title" >

          {el.title}
            </span>
        </div>
      ))}
    </section>
  );
}

Hero.propTypes = {
  classType: ProtoTypes.string,
};
