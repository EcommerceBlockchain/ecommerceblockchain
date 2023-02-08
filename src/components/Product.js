import React from "react";
import { useNavigate } from "react-router-dom";

function Product({ name, id, price, preImg }) {
  const naviagte = useNavigate();

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "3rem",
          cursor: "pointer",
        }}
        onClick={() => {
          naviagte("/single-product", { state: { id: id } });
        }}
      >
        <div className="product-img">
          <img
            style={{ objectFit: "contain" }}
            src={preImg}
            alt="product-img"
          />
        </div>
        <div className="product-info mt-3">
          <h2 className="product-title h5 mb-0">{name}</h2>
          <span className="price">{price} Eth</span>
          <span className="converted-price">(₹10)</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <button type="button" className="cart-btn">
          -
        </button>
        <button type="button" className="cart-btn">
          Add to Cart
        </button>
        <button type="button" className="cart-btn">
          +
        </button>
      </div>
    </div>
  );
}

export default Product;
