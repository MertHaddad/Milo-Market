import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function TopBrands() {
  const selectBrands = useSelector((state) => state.brand.value);

  return (
    <>
      <div className=" fs-1 text-center p-4">Top Brands</div>
      <div className="home-gallery">
        {selectBrands.length
          ? selectBrands.map(
              (item, i) =>
                i < 4 && (
                  <Link
                    key={i}
                    to="/store"
                    state={{ item: item, type: "brand" }}
                    
                  >
                    <div className="product-thumbnail hot-thumbnail">
                      <img
                        width={160}
                        alt=""
                        src={require(`./../../assets/img/thumbnails/thumbnail${i+9}.jpg`)}
                      />
                    </div>
                    <div className="card-titles">
                    <div className="pointer ">{item.name} </div>
                    </div>
                  </Link>
                )
            )
          : null}
      </div>
    </>
  );
}
