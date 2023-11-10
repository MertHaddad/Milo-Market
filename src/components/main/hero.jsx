import React from "react";
import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
// import demo from "./../../assets/img/hero-brand/hero-brand1.png";
// eslint-disable-next-line no-undef
const images = require.context("./../../assets/img", true);

export default function Hero({ classType = "hero-brand" }) {
  const content = {
    "hero-brand": [
      {
        img: "./../../assets/img/hero-brand/hero-brand",
        title: "Fitness",
        slug: { slug: "Fitness-Equipment-Corp" },
        type: "brand",
      },
      {
        img: "./../../assets/img/hero-brand/hero-brand",
        title: "Boyle LLC",
        slug: { slug: "Boyle-LLC" },
        type: "brand",
      },
      {
        img: "./../../assets/img/hero-brand/hero-brand",
        title: "Home Techs",
        slug: { slug: "Home-Tech-Solutions" },
        type: "brand",
      },
      {
        img: "./../../assets/img/hero-brand/hero-brand",
        title: "Out door gear",
        slug: { slug: "Outdoor-Gear-Co" },
        type: "brand",
      },
      {
        img: "./../../assets/img/hero-brand/hero-brand",
        title: "Bayer & Sons",
        slug: { slug: "Bayer-and-Sons" },
        type: "brand",
      },
      {
        img: "./../../assets/img/hero-brand/hero-brand",
        title: "Fashion Studio",
        slug: { slug: "Fashion-Studio" },
        type: "brand",
      },
    ],
    "hero-tag": [
      {
        img: "./../../assets/img/hero-tag/hero-tag",
        title: "Books",
        slug: "books",
        type: "tag",
      },
      {
        img: "./../../assets/img/hero-tag/hero-tag",
        title: "Ocean",
        slug: "ocean",
        type: "tag",
      },
      {
        img: "./../../assets/img/hero-tag/hero-tag",
        title: "Fluids",
        slug: "water",
        type: "tag",
      },
      {
        img: "./../../assets/img/hero-tag/hero-tag",
        title: "Bear",
        slug: "bear",
        type: "tag",
      },
      {
        img: "./../../assets/img/hero-tag/hero-tag",
        title: "Rocks",
        slug: "rocks",
        type: "tag",
      },
      {
        img: "./../../assets/img/hero-tag/hero-tag",
        title: "Coffee",
        slug: "coffee",
        type: "tag",
      },
    ],
  };

  return (
    <section className={`${classType}-container`}>
      {content[classType].map((el, i) => (
        <div
          key={i}
          // eslint-disable-next-line no-undef
          style={{
            backgroundImage: `url(${images(
              `./${classType}/${classType}${i + 1}.png`
            )})`,
          }}
          className={classType}
        >
          <Link state={{ item: el.slug, type: el.type }} to="/store">
            <span className="hero-title">{el.title}</span>
          </Link>
        </div>
      ))}
    </section>
  );
}

Hero.propTypes = {
  classType: ProtoTypes.string,
};
