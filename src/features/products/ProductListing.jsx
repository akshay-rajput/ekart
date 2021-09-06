import React from 'react'
import ProductCard from './ProductCard';

export default function ProductListing({productsList, filteredProducts, appliedFilters}) {
    return (
        <div className="product-list containerMid mt8 mb8 displayGrid gridCols1 md:gridCols4">
            {
                filteredProducts?.length > 0 && Object.keys(appliedFilters).length > 0 ?
                filteredProducts.map(product => {
                    return(
                        <ProductCard key={product._id} product={product} />
                    )
                })
                :
                filteredProducts?.length < 1 && Object.keys(appliedFilters).length > 0 ?
                <div className="">No matches found..</div>
                :
                productsList.map(product => {
                    return(
                        <ProductCard key={product._id} product={product} />
                    )
                })
            }
        </div>
    )
}
