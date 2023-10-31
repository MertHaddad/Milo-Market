import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredItemsNumber } from "../../features/filteredProducts";
import { getItems } from "../../features/productSlice";
import { setQuery } from "../../features/querySlice";

const Sort = () => {
  const [checkedOption, setCheckedOption] = useState("");
  const dispatch = useDispatch();
  const selectQuery = useSelector((state) => state.query.value);
  const handleChange = (e) => {
    setCheckedOption(checkedOption === e.target.id ? "" : e.target.id);
    let query = `_sort=${
      /price/.test(e.target.id) ? "price" : "added"
    }&_order=${/Asc/.test(e.target.id) ? "asc" : "desc"}`;
    dispatch(setQuery(query));
    dispatch(getItems(selectQuery));
    dispatch(getFilteredItemsNumber());
  };

  const inputsArray = [
    { testId: "sort-radio", name: "priceAsc", label: "Price low to high" },
    { testId: "sort-radio", name: "priceDesc", label: "Price high to low" },
    { testId: "sort-radio", name: "dateDesc", label: "New to old" },
    { testId: "sort-radio", name: "dateAsc", label: "Old to new" },
  ];

  return (
    <section className="filter-container">
      <details open>
        <summary>
          <h3 className="filters-title">Sorting</h3>
        </summary>
        {inputsArray.map((input, i) => (
          <div className="filter-item" key={i}>
            <input
              defaultChecked={input.name === checkedOption}
              onClick={handleChange}
              // onChange={handleChange}
              id={input.name}
              type="radio"
              data-testid="test-sort-radio"
              value={input.name}
              className="custom-radio"
              name="sort-radio"
            />
            <label
              className="sorting-label text-secondary"
              htmlFor={input.name}
            >
              {input.label}
            </label>
          </div>
        ))}
      </details>
    </section>
  );
};

export default Sort;
