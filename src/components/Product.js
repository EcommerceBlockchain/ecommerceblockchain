import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";

function Product({ name, id, price, preImg }) {
  const naviagte = useNavigate();
  const [cart, setCart] = useState({});
  // products:[{productid:id,quan:quan,price:price,preimg:preimg,name:name}],

  const { username } = useContext(UserContext);

  const getCart = async () => {
    const data = await getDoc(doc(getFirestore(), "cart", username));
    setCart(data.data());
  };
  useEffect(() => {
    getCart();
    localStorage.getItem("users");
  }, []);

  return (
    <div style={{ marginBottom: "3rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "1.5rem",
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
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <button
          type="button"
          style={{ marginRight: "0.5rem" }}
          className="cart-btn"
        >
          -
        </button> */}
        <button
          style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}
          type="button"
          className="cart-btn"
          onClick={() => {
            localStorage.setItem("products", [
              {
                name: "yash",
              },
            ]);
          }}
        >
          Add to Cart
        </button>
        {/* <button
          type="button"
          className="cart-btn"
          style={{ marginLeft: "0.5rem" }}
        >
          +
        </button> */}
      </div>
    </div>
  );
}

export default Product;
