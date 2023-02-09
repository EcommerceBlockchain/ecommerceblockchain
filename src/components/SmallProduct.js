import React from "react";
import { useNavigate } from "react-router-dom";

function SmallProduct({ name, id, price, preImg }) {
  const naviagte = useNavigate();

  return (
    <div
      className="media mb-3"
      onClick={() => {
        naviagte("/single-product", { state: { id: id } });
      }}
    >
      <div
        className="featured-entry-thumb"
        style={{ cursor: "pointer" }}
        href="/single-product"
      >
        <img
          src={preImg}
          alt="Product thumb"
          width="64"
          className="img-fluid mr-3"
        />
      </div>
      <div className="media-body">
        <h6 className="featured-entry-title mb-0">
          <a href="#">{name}</a>
        </h6>
        <span className="price">{price} Eth</span>
      </div>
    </div>
  );
}

export default SmallProduct;
