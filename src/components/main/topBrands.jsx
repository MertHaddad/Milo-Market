import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function TopBrands() {
  const selectBrands = useSelector((state) => state.brand.value);

  return (
    <>
      <div className="text-center main-text">Top Brands</div>
      <div className="hot-products-container">
        <div className="hot-products">
          {selectBrands.length
            ? selectBrands.map(
                (item, i) =>
                  i < 4 && (
                    <div
                      data-testid="product-item"
                      className="product-card"
                      key={i}
                    >
                      <Link
                        to="/store"
                        state={{ item: item, type: "brand" }}
                      >
                        <div className="product-thumbnail hot-thumbnail">
                          <img
                            width={160}
                            alt=""
                            src={require(`./../../assets/img/thumbnails/thumbnail${
                              i + 9
                            }.jpg`)}
                          />
                        </div>
                        <div className="card-titles">
                          <div className="pointer ">{item.name} </div>
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
