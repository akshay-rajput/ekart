import React from 'react'

export default function ProductCard({product}) {
    return (
        <div className="displayFlex flexCol rounded border borderGray3 shadowMdGray1 mb4 p2">
            <h3 className="textGray5 fontMedium mb2">{product.name}</h3>
            <img src={product.images} alt="product" className="w24" style={{margin: "auto"}} />

            <div className="mt2 mb2 displayFlex justifyBetween itemsCenter">
                <h4 className="textGray5 mt2">$ {product.price}</h4>
                <small>Brand: {product.brand}</small>
            </div>
            <div className="mt2 mb2 displayFlex justifyBetween itemsCenter">
                <small className="textGray5">Size: {product.size}</small>
                <small className="textGray5">Ideal for: {product.ideal}</small>
            </div>
        </div>
    )
}

// name price size ideal images