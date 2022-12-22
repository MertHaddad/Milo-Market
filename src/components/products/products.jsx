import React from "react";
import ToggleBar from "./toggleBar"
import Item from "./item"
const Pagination = React.lazy(() => import("../pagination/pagination"));

// import Pagination from "../pagination/pagination"
const Products = ()=>{

    return(
        <>
        <div className="products">
        <span className="d-block fs-1 text-darkest-gray">Products </span>
        <ToggleBar/>
        <Item/>
        <Pagination/>
        
        </div>
        </>
    )
}

export default Products