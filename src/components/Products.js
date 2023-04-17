import { doc, getDoc, getFirestore } from "firebase/firestore";
import React from "react";
import { useEffect, useState } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";

function Products({ userProfileData,isCurrentUser }) {
  const [products, setProducts] = useState([]);

  console.log(userProfileData.products);

  const getdata = async () => {
    if(products.length==userProfileData?.products?.length) return
    let temp = []
    userProfileData?.products?.forEach(async(element, index) => {
      await getDoc(doc(getFirestore(), "products", element)).then((res) => {
        temp.push(res.data())
      });
    });
    setProducts(temp);
  };

  useEffect(() => {
    getdata();
    console.log(isCurrentUser)
  }, [products]);

  if(products.length!=userProfileData?.products?.length)
   return(
    <>
      Loading
    </>
  )

  return (
    <div className={isCurrentUser?"":"my-products"} style={{width:"100%"}}>
      <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
        <p className={isCurrentUser?"mt-3":"user-products-title"} style={{fontSize:isCurrentUser?"14px":"24px"}}>Products</p>
        {isCurrentUser && <Link to={"/addproduct"}>
          <div className="mt-3">
            <button className="btn-primary p-2" style={{border:"none",boxShadow:"none",fontSize:"12px"}} >
              Add Product
            </button>
          </div>
        </Link>}
      </div>
      <div className={isCurrentUser?"mt-3":"user-product-title"} style={{display: "flex",flexWrap: "wrap",width: "100%",justifyContent: "center",columnGap:"2.5rem",rowGap:"1.5rem"}}>
        {userProfileData?.products?.length==0?
          <p>You don't have any products</p>
          :products.map((item,index) => {
            return <Product name={item?.name} id={item?.id} price={item?.price} preImg={item?.preview_image} owner={item?.owner} />
          })
        }
      </div>
    </div>
  );
}

export default Products;
