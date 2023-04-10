import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import colors from "../colors";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { FaEdit } from "react-icons/fa";
import { ethers } from "ethers";
function Account({ userProfileData }) {
  const connectWallet = async () => {
    console.log("wallet");
  };

  const getbalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let bal = await provider.getBalance(userProfileData.activeAddress);
  };

  useEffect(() => {
    getbalance();
  }, []);

  return (
    <div>
      <div className="card-body">
        <h5 className="mb-4">General information</h5>
        <div className="row">
          <div className="mb-3 col-md-6">
            <div id="firstName">
              <label className="form-label">User Name</label>
              <input
                disabled
                type="text"
                className="form-control"
                value={userProfileData.username}
              />
            </div>
          </div>
          <div className="mb-3 col-md-6">
            <div id="email">
              <label className="form-label">Email</label>
              <input
                disabled
                type="email"
                className="form-control"
                value={userProfileData.email}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-md-6">
            <div id="phone">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={userProfileData.name}
              />
            </div>
          </div>

          <div className="mb-3 col-md-6">
            <div id="address" style={{ position: "relative" }}>
              <label className="form-label">primaryAddress</label>
              <input
                disabled
                type="text"
                className="form-control"
                value={userProfileData.activeAddress}
              />
              <FaEdit
                onClick={() => {
                  connectWallet();
                }}
                size={20}
                style={{
                  position: "absolute",
                  bottom: 13,
                  right: 20,
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-3">
          <button type="submit" className="btn btn-primary">
            Save All
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
