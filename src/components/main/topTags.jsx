import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function TopTags() {
  const selectTags = useSelector((state) => state.allProducts.tags);

  return (
    <>
      <div className=" fs-1 text-center p-4">Top Tags</div>
      <div className="home-gallery">
        {selectTags.length
          ? selectTags.map(
              (item, i) =>
                i < 4 && (
                  <Link key={i} to="/store" state={{ item: item, type: "tag" }}>
                    <span className="product-thumbnail hot-thumbnail">
                      <img
                        width={160}
                        alt=""
                        src={require(`./../../assets/img/thumbnails/thumbnail${i}.jpg`)}
                      />
                    </span>
                    <div className="card-titles">
                      <span className=" text-center pointer ">{item}</span>
                    </div>
                  </Link>
                )
            )
          : null}
      </div>
    </>
  );
}
