import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import colors from "../colors";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { FaEdit } from "react-icons/fa";
import { ethers } from "ethers";
import { getAuth } from "firebase/auth";
import activity from "../images/activity.gif";

function Account() {
  const [activeAddress, setActiveAddress] = useState("");
  const [showWalletAddresses, setShowWalletAddresses] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState({});
  const [name, setName] = useState("");
  const [userProfileData, setUserProfileData] = useState({});

  // const connectWallet = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const accounts = await provider.send("eth_requestAccounts", []);
  //   setDoc(
  //     doc(getFirestore(), "users", getAuth().currentUser.uid),
  //     {
  //       walletAddress: arrayUnion(...accounts),
  //     },
  //     { merge: true }
  //   ).then(() => {
  //     getData();
  //   });
  // };

  function getData() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let add = {};
    getDoc(doc(getFirestore(), "users", getAuth().currentUser.uid)).then(
      (res) => {
        setUserProfileData({ ...res.data() });
        setName(res.data().name);
        setActiveAddress(res.data().activeAddress);

        res.data().walletAddress.forEach(async (item) => {
          add[item] = parseFloat(
            ethers.utils.formatEther(await provider.getBalance(item), "ether")
          );
        });
        setAddresses(add);
      }
    );
  }

  const savedata = () => {
    setLoading(true);
    setDoc(
      doc(getFirestore(), "users", getAuth().currentUser.uid),
      { ...userProfileData, name: name, activeAddress: activeAddress },
      { merge: true }
    ).then(() => {
      console.log("done");
      setLoading(false);
    });

    console.log("hello");
  };

  useEffect(() => {
    // connectWallet();
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
                style={{ cursor: "not-allowed" }}
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
                style={{ cursor: "not-allowed" }}
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
                  top: 50,
                  right: 20,
                  cursor: "pointer",
                }}
                onClick={() => setShowWalletAddresses(!showWalletAddresses)}
              />
              {showWalletAddresses && (
                <div
                  className="wallet-address-container"
                  style={{
                    position: "absolute",
                    width: "100%",
                    backgroundColor: "white",
                    padding: "10px",
                    top: -20,
                    left: 0,
                    transform: "translate(0,100%)",
                    textAlign: "left",
                    boxShadow: "0 0 5px 1px rgba(0,0,0,0.2)",
                  }}
                >
                  {Object.keys(addresses).map((address) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "Center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        onClick={() => {
                          setActiveAddress(address);
                          setShowWalletAddresses(!showWalletAddresses);
                        }}
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

                      <p>{addresses[address].toFixed(2)} Eth</p>
                    </div>
                  ))}
                </div>
              )}
              <p style={{ color: colors.red, fontWeight: "500" }}>
                Note : Please add new address manually in metamask, connect
                address with this site. After that refresh the page to see
                updated addresses.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3">
          {loading ? (
            <img width={30} src={activity} alt="activity" />
          ) : (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={savedata}
            >
              Save All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
