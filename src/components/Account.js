import React from "react";

function Account({ userData }) {
  return (
    <div>
      <p>
        {userData.username} {userData.avg_rating} {userData.balance}{" "}
        {userData.contact} {userData.email} {userData.name} {userData.reward}
      </p>
    </div>
  );
}

export default Account;
