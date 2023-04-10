import React from "react";

function Transactions({ userProfileData }) {
  return (
    <div>
      <p>Transactions</p>
      {userProfileData.transaction.map((item) => {
        return <h5>{item}</h5>;
      })}
    </div>
  );
}

export default Transactions;
