import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import products from './products.json';
import { useSelector, useDispatch } from 'react-redux';
import { addProducts } from "./features/products/productsSlice";
import "./App.css";

import Navbar from "./features/shared/Navbar";
import Sidebar from "./features/shared/Sidebar";
import ProductListing from "./features/products/ProductListing";

function App() {
	const [count, setCount] = useState(0);
	const {filteredProducts, appliedFilters} = useSelector((state) => state.productList);
	const allProducts = useSelector((state)=> state.productList.products);

	const dispatch = useDispatch();

	useEffect(() => {
		// get products
		// console.log({products});
		dispatch(addProducts(products));
	}, [])

	return <div className="App">
		<Navbar />
		<Sidebar />
		<ProductListing productsList={allProducts} appliedFilters={appliedFilters} filteredProducts={filteredProducts}/>
	</div>;
}

export default App;
