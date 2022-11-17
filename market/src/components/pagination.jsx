import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Pagination = () => {
  const dispatch = useDispatch();
  const productsLength = useSelector((state) => state.allProducts.value.length);
  const pages = Array.from(
    { length: Math.ceil(productsLength / 16) },
    (_, index) => index + 1
  );
  const pagesNumber= pages.length
  const viewPages = () => {
    let currentPage = 6;
    const earlyPages =
      currentPage > 1
        ? [currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
        : [currentPage, currentPage + 1, currentPage + 2, currentPage + 3];
    const laterPages = [pagesNumber - 3, pagesNumber - 2, pagesNumber - 1, pagesNumber];
    console.log(earlyPages);
    console.log(laterPages);
  };
  viewPages();

  return (
    <>
      <span>Pagination</span>
    </>
  );
};

export default Pagination;
