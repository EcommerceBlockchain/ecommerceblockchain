import React, { useContext, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  menuClasses,
} from "react-pro-sidebar";
import { getAuth } from "firebase/auth";

import colors from "../colors";

import { FaSignOutAlt, FaHamburger, FaBars } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Account from "../components/Account";
import UserContext from "../context/UserContext";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Products from "../components/Products";
import Orders from "../components/Orders";
import Transactions from "../components/Transactions";
import userlogo from "../images/user.png";
import ProfileProducts from "../components/ProfileProducts";

// hex to rgba converter

function Profile() {
  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuselection, setMenuSelection] = useState(
    location.state ? location.state : 1
  );
  const [userProfileData, setUserProfileData] = useState("");

  function getData() {
    if (userProfileData !== "") return;

    getDoc(doc(getFirestore(), "users", getAuth().currentUser.uid)).then(
      (res) => {
        setUserProfileData({ ...res.data() });
      }
    );
    console.log("user data : ", userProfileData);
  }

  useEffect(() => {
    getData();
  }, [userProfileData]);

  const menuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },

    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },

    button: ({ level, active, disabled }) => {
      return {
        backgroundColor: active ? "lightgray" : "white",
      };
    },
    label: ({ active }) => ({
      fontWeight: active ? "bold" : 0,
      color: active ? colors.primaryBlue : "black",
    }),
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100%",
        }}
      >
        <Sidebar
          customBreakPoint="800px"
          transitionDuration={500}
          rootStyles={
            broken
              ? {
                  zIndex: 100,
                  boxShadow: "0px 0px 15px 5px rgba(0,0,0,0.1)",
                  height: "100%",
                  backgroundColor: "white",
                }
              : {
                  zIndex: 100,
                  boxShadow: "0px 0px 15px 5px rgba(0,0,0,0.1)",
                  height: "100%",
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "200px",
                  backgroundColor: "white",
                }
          }
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              height: "100%",
            }}
          >
            <div style={{ marginBottom: "24px", marginTop: "16px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link to={"/"}>
                  <h1
                    style={{ color: colors.primaryBlue, paddingLeft: "20px" }}
                  >
                    Digimart
                  </h1>
                </Link>
              </div>
            </div>
            <div
              style={{
                marginBottom: "32px",
                display: "flex",
                height: "80%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <div>
                  <Menu menuItemStyles={menuItemStyles}>
                    <MenuItem
                      active={menuselection === 1}
                      onClick={() => {
                        setMenuSelection(1);
                        toggleSidebar();
                      }}
                    >
                      Account
                    </MenuItem>
                    <MenuItem
                      active={menuselection === 2}
                      onClick={() => {
                        setMenuSelection(2);
                        toggleSidebar();
                      }}
                    >
                      Products
                    </MenuItem>
                    <MenuItem
                      active={menuselection === 3}
                      onClick={() => {
                        setMenuSelection(3);
                        toggleSidebar();
                      }}
                    >
                      Orders
                    </MenuItem>
                    <MenuItem
                      active={menuselection === 4}
                      onClick={() => {
                        setMenuSelection(4);
                        toggleSidebar();
                      }}
                    >
                      Transactions
                    </MenuItem>
                  </Menu>
                </div>
                <div>
                  <div
                    style={{
                      borderBottom: "1px solid lightgrey",
                      width: "100%",
                      marginTop: "10px",
                    }}
                  ></div>

                  <Menu menuItemStyles={menuItemStyles}>
                    <MenuItem
                      icon={
                        <FaSignOutAlt size={15} color={colors.primaryBlue} />
                      }
                      onClick={() => {
                        getAuth().signOut();
                        navigate("/", { replace: true });
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </Sidebar>

        <main
          style={{
            width: "100%",
            marginLeft: broken ? 0 : "250px",
            height: "fit-content",
          }}
        >
          <div
            style={{
              padding: "16px 24px",
              color: "#44596e",
              height: "100%",
              overflow: "hidden auto",
            }}
          >
            <div style={{ marginBottom: "16px", height: "100%" }}>
              {broken ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <button
                    className="sb-button"
                    style={{
                      outline: "none",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                    }}
                    onClick={() => {
                      toggleSidebar();
                    }}
                  >
                    <FaBars color={colors.primaryBlue} size={20} />
                  </button>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <img
                        src={
                          userProfileData?.profileurl
                            ? userProfileData.profileurl
                            : userlogo
                        }
                        width={40}
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          textAlign: "center",
                          paddingLeft: "10px",
                          margin: 0,
                        }}
                      >
                        {userProfileData.username}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <h4>Account</h4>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={
                        userProfileData?.profileurl
                          ? userProfileData.profileurl
                          : userlogo
                      }
                      width={40}
                    />
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        style={{
                          paddingLeft: "10px",
                          margin: 0,
                          fontWeight: "300",
                        }}
                      >
                        {userProfileData?.username}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {menuselection === 1 && <Account />}
              {menuselection === 2 && (
                <ProfileProducts
                  userProfileData={userProfileData}
                  isCurrentUser={true}
                />
              )}
              {menuselection === 3 && (
                <Orders userProfileData={userProfileData} />
              )}
              {menuselection === 4 && (
                <Transactions userProfileData={userProfileData} />
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;
