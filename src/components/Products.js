import { doc, getDoc, getFirestore } from "firebase/firestore";
import React from "react";
import { useEffect, useState } from "react";

function Products({ userProfileData }) {
  const [products, setProducts] = useState([]);

  console.log(userProfileData.products);

  const getdata = async () => {
    setProducts([]);
    userProfileData?.products?.forEach((element, index) => {
      getDoc(doc(getFirestore(), "products", element)).then((res) => {
        setProducts((prev) => [
          ...new Set([...prev, { ...res.data(), id: element }]),
        ]);
      });
    });
  };

  useEffect(() => {
    setProducts([]);
    getdata();
  }, []);

  return (
    <div>
      <p>Products</p>
      {products.map((item) => {
        return (
          <div>
            {item.name}
            {item.cost}
            {item.preview_image[0]}
          </div>
        );
      })}
    </div>
  );
}

export default Products;
