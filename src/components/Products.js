import React, { useState, useEffect } from "react";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Product from "../components/Product";

function Products({ userProfileData,isCurrentUser }) {
  const [productsData, setProductsData] = useState([]);

  async function getData() {
    if(productsData.length==userProfileData?.products?.length) return
    let newData = []
    userProfileData?.products?.map(async (currentProduct,key)=>{
      if(currentProduct){
        let data = await getDoc(
          doc(getFirestore(), "products", currentProduct)
        );
        if(data){
          newData.push(data.data());
        }
      }
    })
    setProductsData(newData);
    console.log("Products : ", productsData);
  }

  useEffect(() => {
    getData();
  }, [productsData]);

  return (
    <div className="my-products">
      <div>
        <p className={isCurrentUser?'':"user-products-title"}>{isCurrentUser?"My Products":"Products"}</p>
      </div>
      <div className="products-container">
        {productsData.map((currentProduct,key) => {
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
