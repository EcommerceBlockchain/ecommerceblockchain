import React,{useState,useEffect} from "react";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Product from "../components/Product";
import { data } from "jquery";

function Products({userData}) {
  const [productsData,setProductsData] = useState([]);

  async function getData(){
    let dataArray = [];
    for(let i=0;i<userData.products.length;i++){
      let data = await getDoc(doc(getFirestore(), "products", userData.products[i]));
      dataArray.push(data.data());
    }
    setProductsData(dataArray);
    console.log("Products : ",productsData)
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <div className="my-products">
      <div>
        <p>My Products</p>
      </div>
      <div className="products-container">
        {productsData.map((currentProduct)=>{
          if(currentProduct)
            return <Product name={currentProduct.name} id={currentProduct.id} price={currentProduct.price } preImg={currentProduct.preview_image} ></Product>
        })}
      </div>
    </div>
  );
}

export default Products;
