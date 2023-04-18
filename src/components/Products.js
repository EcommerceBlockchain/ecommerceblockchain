import { doc, getDoc, getFirestore } from "firebase/firestore";
import React from "react";
import { useEffect, useState } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";

function Products({ userProfileData, isCurrentUser }) {
  const [products, setProducts] = useState([]);

  const getdata = () => {
    setProducts([]);

    if (products.length == userProfileData?.products?.length) return;

    userProfileData?.products?.forEach((element, index) => {
      getDoc(doc(getFirestore(), "products", element)).then((res) => {
        setProducts((prev) => [...prev, { ...res.data(), id: element }]);
      });
    });
  };

  useEffect(() => {
    getdata();
  }, [userProfileData]);

  return (
    <div
      className={isCurrentUser ? "mt-3" : "my-products"}
      style={{ width: "100%" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h5
          className={isCurrentUser ? "mt-3" : "user-products-title"}
          style={{}}
        >
          Products
        </h5>
      </div>
      <div
        className={isCurrentUser ? "mt-3" : "user-product-title"}
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center",
          columnGap: "7rem",
          rowGap: "1.5rem",
        }}
      >
        {userProfileData?.products?.length == 0 ? (
          <p>You don't have any products</p>
        ) : (
          products.map((item, index) => {
            return (
              <Product
                name={item?.name}
                id={item?.id}
                price={item?.cost}
                preImg={item?.preview_image}
                owner={item?.owner}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Products;
