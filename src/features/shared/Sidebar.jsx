import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    sortProducts,
    filterAllProducts,
    clearFilters,
} from "../products/productsSlice";

export default function sidebar() {
    // const [filters, setFilters] = useState([]);
    const { sizes, ideal, brands } = useSelector((state) => state.productList);
    const dispatch = useDispatch();

    const [sortBy, setSortBy] = useState("low");
    const [filters, setFilters] = useState({});

    useEffect(() => {
        console.count("filter applied:");
        return () => {
            setFilters({});
        };
    }, []);

    function sortList(event) {
        setSortBy(event.target.value);

        // dispatch
        dispatch(sortProducts(event.target.value));
    }

    function applyFilters(event, type) {
        const filterName = event.target.id;
        let appliedFilters = filters[type] ? [...filters[type]] : [];

        // add if checked
        if (event.target.checked) {
            appliedFilters.push(filterName);
        } else {
            let indexOfFilter = appliedFilters.indexOf(filterName);
            appliedFilters.splice(indexOfFilter, 1);
        }

        // update local state
        setFilters((prevFilters) => ({
            ...prevFilters,
            [type]: appliedFilters,
        }));

        // use available data instead of depending on state update
        let stateFilters = { ...filters, [type]: appliedFilters };
        dispatch(filterAllProducts(stateFilters));
    }

    function clearAllFilters() {
        setFilters({});
        dispatch(clearFilters());
    }

    return (
        <div className="containerMid displayFlex itemsCenter justifyBetween pl-4 pr-4">
            <div className="displayFlex itemsCenter flexWrap gridGap4">
                <fieldset className="displayFlex itemsCenter gridGap4 p2">
                    <legend>&nbsp;Ideal for&nbsp;</legend>
                    {ideal.map((idealValue) => {
                        return (
                            <label
                                key={idealValue}
                                className="displayFlex itemsCenter gridGap1 cursorPointer"
                            >
                                <input
                                    type="checkbox"
                                    onChange={(event) =>
                                        applyFilters(event, "ideal")
                                    }
                                    value={idealValue}
                                    checked={filters["ideal"]?.includes(
                                        idealValue
                                    )? true : false}
                                    name="filter_ideal"
                                    id={idealValue}
                                />
                                {idealValue}
                            </label>
                        );
                    })}
                </fieldset>

                <fieldset className="displayFlex itemsCenter gridGap4 p2">
                    <legend>&nbsp;Sizes&nbsp;</legend>
                    {sizes.map((size) => {
                        return (
                            <label
                                key={size}
                                className="displayFlex itemsCenter gridGap1 cursorPointer"
                            >
                                <input
                                    type="checkbox"
                                    onChange={(event) =>
                                        applyFilters(event, "size")
                                    }
                                    value={size}
                                    checked={filters["size"]?.includes(size)? true : false}
                                    name={"filter_" + size}
                                    id={size}
                                />
                                {size}
                            </label>
                        );
                    })}
                </fieldset>

                <fieldset className="displayFlex itemsCenter gridGap4 p2">
                    <legend>&nbsp;Brands&nbsp;</legend>
                    {brands.map((brand) => {
                        return (
                            <label
                                key={brand}
                                className="displayFlex itemsCenter gridGap1 cursorPointer"
                            >
                                <input
                                    type="checkbox"
                                    onChange={(event) =>
                                        applyFilters(event, "brand")
                                    }
                                    value={brand}
                                    checked={filters["brand"]?.includes(brand)? true : false}
                                    name={"filter_" + brand}
                                    id={brand}
                                />
                                {brand}
                            </label>
                        );
                    })}
                </fieldset>

                <button className="p4 rounded" onClick={clearAllFilters}>
                    Clear filters
                </button>
            </div>

            <label>
                Sort&nbsp;
                <select
                    name="sort"
                    value={sortBy}
                    id="sort"
                    onChange={sortList}
                >
                    <option value="low">Low to high</option>
                    <option value="high">High to low</option>
                </select>
            </label>
        </div>
    );
}
