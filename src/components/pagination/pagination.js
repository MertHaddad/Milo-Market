import React, { useState } from "react";
import { usePagination, DOTS } from "./usePagination";
import "./../../assets/css/pagination.css";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../features/querySlice";
import { getItems } from "../../features/productSlice";
import useDidMountEffect from "../../helpers/useDidMountEffect";
const Pagination = () => {
  const dispatch = useDispatch();
  const selectQuery = useSelector((state) => state.query.value);
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (p) => {
    if (currentPage !== p) {
      setCurrentPage(p);
      const query = `_page=${p}&_limit=16`;
      dispatch(setQuery(query));
      dispatch(getItems(selectQuery));
    }
  };
  
  useDidMountEffect(() => {
    onPageChange(1);
  }, [filteredProducts.currentProductNumber]);

  let totalCount = filteredProducts.currentProductNumber;
  const siblingCount = 1;
  const pageSize = 16;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange?.length - 1];
  return (
    <ul className="pagination-container">
      <li
        className={`pagination-item ${currentPage === 1 ? "disabled" : ""}
         )`}
        onClick={onPrevious}
      >
        {/* <div className="arrow left" /> */}
        {"<"} Prev 
      </li>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <li key={i + "dot"} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={i}
            className={`pagination-item ${
              pageNumber === currentPage ? "selected" : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`pagination-item ${
          currentPage === lastPage ? "disabled" : ""
        }`}
        onClick={onNext}
      >
         Next {">"}
        {/* <div className="arrow right" /> */}
      </li>
    </ul>
  );
};

export default Pagination;
