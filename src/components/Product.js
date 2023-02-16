import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

function Product({ name, id, price, preImg }) {
  const naviagte = useNavigate();
  // products:[{productid:id,quan:quan,price:price,preimg:preimg,name:name}],
  const { username } = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);

  const getCart = () => {
    getDoc(doc(getFirestore(), "cart", username)).then((doc) => {
      setCart(doc.data().products);
      setCount(
        doc.data().products[id]?.quantity !== undefined
          ? doc.data().products[id]?.quantity
          : 0
      );
    });
  };

  const updateCart = (val) => {
    if (val == "add") {
      if (cart.find((obj) => obj["productId"] === id) !== undefined) {
        let cartDoc = [...cart];
        for (const iterator of cartDoc) {
          if (iterator.productId === id) {
            iterator.quantity += 1;
          }
        }
        setDoc(
          doc(getFirestore(), "cart", username),
          {
            products: cartDoc,
          },
          { merge: true }
        ).then(() => {
          console.log("done in add ");
        });
      } else {
        setCart((prev) => [
          ...prev,
          {
            productId: id,
            quantity: 1,
            price: price,
            name: name,
            preImg: preImg,
          },
        ]);
        setDoc(
          doc(getFirestore(), "cart", username),
          {
            products: [
              ...cart,
              {
                productId: id,
                quantity: 1,
                price: price,
                name: name,
                preImg: preImg,
              },
            ],
          },
          { merge: true }
        ).then(() => {
          console.log("done in add else");
        });
      }
    } else {
      let cartDoc = [...cart];
      for (const iterator of cartDoc) {
        if (iterator.productId === id) {
          iterator.quantity -= 1;
        }
      }
      setDoc(
        doc(getFirestore(), "cart", username),
        {
          products: cartDoc,
        },
        { merge: true }
      ).then(() => {
        console.log("done in remove");
      });
    }
  };

  useEffect(() => {
    setCount(0);
    getCart();
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
        {count !== 0 && (
          <button
            type="button"
            style={{ marginRight: "0.5rem" }}
            className="cart-btn"
            onClick={() => {
              updateCart("remove");
            }}
          >
            -
          </button>
        )}
        {!count ? (
          <button
            style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}
            type="button"
            className="cart-btn"
            onClick={() => {
              updateCart("add");
            }}
          >
            Add to Cart
          </button>
        ) : (
          <div>{count}</div>
        )}
        {count !== 0 && (
          <button
            type="button"
            className="cart-btn"
            style={{ marginLeft: "0.5rem" }}
            onClick={() => {
              updateCart("add");
            }}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default Product;
