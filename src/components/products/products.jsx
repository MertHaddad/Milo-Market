import React,{useState} from "react";
import ToggleBar from "./toggleBar"
import Item from "./item"
import Options from "../options/options";
const Pagination = React.lazy(() => import("../pagination/pagination"));

// import Pagination from "../pagination/pagination"
const Products = ()=>{
    const [showDetails, setShowDetails] = useState(false);
    
    return(
        <section className="products">
        <h2 className="d-block fs-2 text-darkest-gray">Products </h2>
        <section className="mobile-filters">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="fs-2 text-darkest-gray"
            >
              <i className="bi bi-funnel fs-2 p-2"></i>
              Filter/Sort
            </button>
            <div className="mobile-filter-details">
              {showDetails && <Options />}
            </div>
          </section>
        <ToggleBar/>
        <Item/>
        <Pagination/>
        </section>
    )
}

export default Products