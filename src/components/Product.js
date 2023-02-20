import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";
import activity from "../images/activity.gif";

function Product({ name, id, price, preImg }) {
  const navigate = useNavigate();
  // products:[{productid:id,quan:quan,price:price,preimg:preimg,name:name}],
  const { username, user } = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);

  const getCart = async () => {
    const pro = await getDoc(
      doc(getFirestore(), "users", username, "cart", id)
    );
    if (pro.exists) {
      setCount(pro.data()?.quantity ? pro.data().quantity : 0);
    } else {
      setCount(0);
    }
    setLoader(false);
  };

  const updateCart = async (val) => {
    setLoader(true);
    let product = await getDoc(
      doc(getFirestore(), "users", username, "cart", id)
    );
    if (product.data() !== undefined) {
      if (val === "add") {
        setDoc(doc(collection(getFirestore(), "users", username, "cart"), id), {
          ...product.data(),
          quantity: product.data().quantity + 1,
        }).then(() => {
          console.log("add done");
          getCart();
        });
      } else {
        if (product.data().quantity === 1) {
          deleteDoc(doc(getFirestore(), "users", username, "cart", id)).then(
            () => {
              console.log("delete done");
              getCart();
            }
          );
        } else {
          setDoc(
            doc(collection(getFirestore(), "users", username, "cart"), id),
            {
              ...product.data(),
              quantity: product.data().quantity - 1,
            }
          ).then(() => {
            console.log("remove done");
            getCart();
          });
        }
      }
    } else {
      setDoc(doc(collection(getFirestore(), "users", username, "cart"), id), {
        productName: name,
        quantity: 1,
        price: price,
        preImg: preImg,
      }).then(() => {
        console.log("new product added");
        getCart();
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
          navigate("/single-product", { state: { id: id } });
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
      {loader ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img width={40} src={activity} alt="activity" />
        </div>
      ) : (
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
                if (user) {
                  updateCart("add");
                } else {
                  navigate("/login");
                }
              }}
            >
              Add to Cart
            </button>
          ) : (
            <div style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}>
              {count}
            </div>
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
      )}
    </div>
  );
}

export default Product;
