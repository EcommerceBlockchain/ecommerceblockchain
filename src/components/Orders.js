import React from "react";

function Orders({ userData }) {
  return (
    <div>
      <p>Orders</p>
      {userData.bought.map((item) => {
        return <h5>{item}</h5>;
      })}
    </div>
  );
}

export default Orders;
