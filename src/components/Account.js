import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import colors from "../colors";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { FaEdit } from "react-icons/fa";
import { ethers } from "ethers";
import  Products  from "./Products"
function Account({userProfileData,isCurrentUser}) {
  const [activeAddress,setActiveAddress] = useState("")
  const [showWalletAddesses,setShowWalletAddesses] = useState(false);
  const [name,setName] = useState("");

  const connectWallet = async () => {
    console.log("wallet");
    const {ethereum} = window;
    const accounts = await ethereum.request({method: 'eth_accounts'});
    ethereum.enable()
    console.log(accounts)
  };

  const getBalance = async (address) => {
    console.log("address : ",address)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setActiveAddress(address)
    let bal = await provider.getBalance(activeAddress);
    let newAccount = await provider.send("eth_requestAccounts",[]);
  };

  useEffect(() => {
    getBalance(userProfileData?.activeAddress);
    setName(userProfileData?.name)
    console.log(userProfileData?.walletAddress)
  }, [userProfileData]);

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
                value={userProfileData?.username}
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
                value={userProfileData?.email}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-md-6">
            <div id="phone">
              <label className="form-label">Name</label>
                <input
                  disabled={!isCurrentUser}
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
              {showWalletAddesses && <div className="wallet-address-container" style={{position:"absolute",width:"100%",backgroundColor:"white",padding:"10px",bottom:0,left:0,transform:"translate(0,100%)",textAlign:"left",boxShadow:"0 0 5px 1px rgba(0,0,0,0.2)"}}>
                {
                  userProfileData?.walletAddress?.map((address,key) => (
                    <p onClick={()=>getBalance(address)} style={address===userProfileData.activeAddress ? {} : {backgroundColor:"lightgrey"}}>{address}</p>
                  ))
                }
                <p onClick={() => {
                  connectWallet();
                }}>
                  Add New Wallet Address
                </p>
              </div>}
            </div>
          </div>
        </div>

        {isCurrentUser && <div className="mt-3">
          <button type="submit" className="btn btn-primary">
            Save All
          </button>
        </div>}
      </div>
      {!isCurrentUser && <Products userProfileData={userProfileData} isCurrentUser={isCurrentUser} />}
    </div>
  );
}

export default Account;
