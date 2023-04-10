import React from "react";

function Orders({ userProfileData }) {
  return (
    <div>
      <p>Orders</p>
      {userProfileData.bought.map((item) => {
        return <h5>{item}</h5>;
      })}
    </div>
  );
}

export default Orders;
