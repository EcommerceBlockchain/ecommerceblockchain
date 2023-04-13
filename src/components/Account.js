import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import colors from "../colors";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { FaEdit } from "react-icons/fa";
import { ethers } from "ethers";
import { getAuth } from "firebase/auth";
function Account() {
  const [activeAddress, setActiveAddress] = useState("");
  const [showWalletAddesses, setShowWalletAddesses] = useState(false);
  const [name, setName] = useState("");
  const [userProfileData, setUserProfileData] = useState({});

  const connectWallet = async () => {
    console.log("address : ", activeAddress);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    // const ans = await provider.send("wallet_disconnect", []);
    console.log(accounts);
  };

  function getData() {
    getDoc(doc(getFirestore(), "users", getAuth().currentUser.uid)).then(
      (res) => {
        setUserProfileData({ ...res.data() });
        setName(res.data().name);
        setActiveAddress(res.data().activeAddress);
      }
    );
    console.log("user data : ", userProfileData);
  }

  useEffect(() => {
    getData();
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
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
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
                value={activeAddress}
              />
              <FaEdit
                size={20}
                style={{
                  position: "absolute",
                  bottom: 13,
                  right: 20,
                  cursor: "pointer",
                }}
                onClick={() => setShowWalletAddesses(!showWalletAddesses)}
              />
              {showWalletAddesses && (
                <div
                  className="wallet-address-container"
                  style={{
                    position: "absolute",
                    width: "100%",
                    backgroundColor: "white",
                    padding: "10px",
                    bottom: 0,
                    left: 0,
                    transform: "translate(0,100%)",
                    textAlign: "left",
                    boxShadow: "0 0 5px 1px rgba(0,0,0,0.2)",
                  }}
                >
                  {userProfileData?.walletAddress?.map((address) => (
                    <p
                      onClick={() => setActiveAddress(address)}
                      style={{
                        cursor: "pointer",
                        color:
                          address === activeAddress
                            ? colors.primaryBlue
                            : "black",
                      }}
                    >
                      {address}
                    </p>
                  ))}
                  <p
                    onClick={() => {
                      connectWallet();
                    }}
                  >
                    Add New Wallet Address
                  </p>
                </div>
              )}
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
