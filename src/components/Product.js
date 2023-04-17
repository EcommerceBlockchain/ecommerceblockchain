import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import {
  addDoc,
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
import colors from "../colors";

function Product({ name, id, price, preImg, owner }) {
  const navigate = useNavigate();
  // products:[{id:id,preimg:preimg,name:name}],
  const { userdata } = useContext(UserContext);
  const [added, setAdded] = useState(false);
  const [loader, setLoader] = useState(false);

  const userid = getAuth()?.currentUser?.uid;

  const getCart = async () => {
    setAdded(false);
    getDocs(query(collection(getFirestore(), "users", userid, "cart"))).then(
      (res) => {
        for (let index = 0; index < res.docs.length; index++) {
          const element = res.docs[index];
          if (element.data().id === id) {
            setAdded(true);
            break;
          } else {
            setAdded(false);
          }
        }
      }
    );
    setLoader(false);
  };

  const updateCart = (val) => {
    setLoader(true);

    if (val === "add") {
      setDoc(doc(getFirestore(), "users", userid, "cart", id), {
        name: name,
        cost: price,
        preImg: preImg,
        id: id,
        owner: owner,
      }).then(() => {
        console.log("product added");
        getCart();
      });
    } else {
      deleteDoc(doc(getFirestore(), "users", userid, "cart", id)).then(() => {
        console.log("delete done");
        getCart();
      });
    }
  };

  useEffect(() => {
    setAdded(false);
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
          {userdata?.bought?.includes(id) ? (
            <button
              style={{
                marginRight: "0.5rem",
                marginLeft: "0.5rem",
                backgroundColor: colors.green,
                cursor: "not-allowed",
              }}
              type="button"
              className="cart-btn"
              disabled
            >
              Bought
            </button>
          ) : !added ? (
            <button
              style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}
              type="button"
              className="cart-btn"
              onClick={() => {
                if (userdata) {
                  updateCart("add");
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
                updateCart("remove");
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
