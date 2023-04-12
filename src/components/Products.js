import React, { useState, useEffect } from "react";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Product from "../components/Product";

function Products({ userProfileData }) {
  const [productsData, setProductsData] = useState([]);

  async function getData() {
    let dataArray = [];
    for (let i = 0; i < userProfileData.products.length; i++) {
      let data = await getDoc(
        doc(getFirestore(), "products", userProfileData.products[i])
      );
      dataArray.push(data.data());
    }
    setProductsData(dataArray);
    console.log("Products : ", productsData);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="my-products">
      <div>
        <p>My Products</p>
      </div>
      <div className="products-container">
        {productsData.map((currentProduct) => {
          if (currentProduct)
            return (
              <Product
                name={currentProduct.name}
                id={currentProduct.id}
                price={currentProduct.price}
                preImg={currentProduct.preview_image}
                owner={currentProduct.owner}
              ></Product>
            );
        })}
      </div>
    </div>
  );
}

export default Products;
