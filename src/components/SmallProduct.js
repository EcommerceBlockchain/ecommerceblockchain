import React from "react";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import colors from "../colors";

function SmallProduct({ name, id, price, preImg, rating }) {
  const naviagte = useNavigate();

  return (
    <div
      className="media mb-3"
      onClick={() => {
        naviagte("/single-product", { state: { id: id } });
      }}
      style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
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
        <h6 className="featured-entry-title mb-0">{name}</h6>
        <div style={{ marginBottom: -10 }}>
          <span className="price">{price} Eth</span>
        </div>
        <StarRatings
          numberOfStars={5}
          starEmptyColor="grey"
          starHoverColor={colors.darkYellow}
          starRatedColor={colors.darkYellow}
          starDimension="10px"
          starSpacing="1px"
          rating={rating}
        />
      </div>
    </div>
  );
}

export default SmallProduct;
