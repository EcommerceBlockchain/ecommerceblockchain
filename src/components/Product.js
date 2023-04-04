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
import { getAuth } from "firebase/auth";

function Product({ name, id, price, preImg }) {
  const navigate = useNavigate();
  // products:[{productid:id,quan:quan,price:price,preimg:preimg,name:name}],
  const { userdata } = useContext(UserContext);
  const [added, setAdded] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cartArray, setCartArray] = useState([]);

  const userid = getAuth()?.currentUser?.uid;

  const getCart = async () => {
    const pro = await getDoc(doc(getFirestore(), "users", userid));
    setCartArray(pro.data().cart);
    console.log("pro", pro.data().cart);
    if (pro.data().cart.includes(id)) {
      setAdded(true);
    } else {
      setAdded(false);
    }
    setLoader(false);
  };

  const updateCart = (val, array) => {
    console.log(array);

    setLoader(true);

    if (val === "add") {
      setDoc(
        doc(getFirestore(), "users", userid),
        {
          cart: [...array],
        },
        { merge: true }
      ).then(() => {
        console.log("add done");
        getCart();
      });
    } else {
      setDoc(
        doc(getFirestore(), "users", userid),
        {
          cart: [...array],
        },
        { merge: true }
      ).then(() => {
        console.log("remove done");
        getCart();
      });
    }
  };

  useEffect(() => {
    setAdded(false);
    setCartArray([]);
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
          {!added ? (
            <button
              style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}
              type="button"
              className="cart-btn"
              onClick={() => {
                if (userdata) {
                  let uparr = cartArray.concat(id);
                  console.log(uparr, "upparr");
                  updateCart("add", uparr);
                } else {
                  navigate("/login");
                }
              }}
            >
              Add to Cart
            </button>
          ) : (
            <button
              style={{
                marginRight: "0.5rem",
                marginLeft: "0.5rem",
                backgroundColor: "crimson",
              }}
              type="button"
              className="cart-btn"
              onClick={() => {
                let uparr = cartArray.filter((val) => {
                  return val !== id;
                });
                updateCart("remove", uparr);
              }}
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Product;
