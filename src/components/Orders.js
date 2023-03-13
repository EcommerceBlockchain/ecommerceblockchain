import React from "react";

function Orders({ userData }) {
  return (
    <div>
      <p>products</p>
      {userData.bought.map((item) => {
        return <h5>{item}</h5>;
      })}
    </div>
  );
}

export default Orders;
