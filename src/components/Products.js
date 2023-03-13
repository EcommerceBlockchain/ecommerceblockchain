import React from "react";

function Products({ userData }) {
  return (
    <div>
      <p>Orders</p>
      {userData.products.map((item) => {
        return <h5>{item}</h5>;
      })}
    </div>
  );
}

export default Products;
