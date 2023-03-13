import React from "react";

function Transactions({ userData }) {
  return (
    <div>
      <p>Transactions</p>
      {userData.transaction.map((item) => {
        return <h5>{item}</h5>;
      })}
    </div>
  );
}

export default Transactions;
