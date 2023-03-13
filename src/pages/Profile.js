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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import GetFileByCID from "../service/GetFileByCID";
import Account from "../components/Account";
import UserContext from "../context/UserContext";
import { async } from "@firebase/util";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Products from "../components/Products";
import Orders from "../components/Orders";
import Transactions from "../components/Transactions";

// hex to rgba converter

function Profile() {
  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();
  const navigate = useNavigate();
  const [menuselection, setMenuSelection] = useState(1);
  const { username } = useContext(UserContext);
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const data = await getDoc(
      doc(collection(getFirestore(), "users"), username)
    );
    console.log(data.data());
    setUserData(data.data());
  };

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

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div
      style={{
        height: "100%",
        overflowY: "hidden",
        display: "flex",
      }}
    >
      <Sidebar
        customBreakPoint="800px"
        transitionDuration={500}
        rootStyles={{
          zIndex: 100,
          boxShadow: "0px 0px 15px 5px rgba(0,0,0,0.1)",
          height: "100%",
          backgroundColor: "white",
        }}
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
                <h1 style={{ color: colors.primaryBlue, paddingLeft: "20px" }}>
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
                    icon={<FaSignOutAlt size={15} color={colors.primaryBlue} />}
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

      <main>
        <div
          style={{
            padding: "16px 24px",
            color: "#44596e",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            {broken && (
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
            )}

            {menuselection === 1 && <Account userData={userData} />}
            {menuselection === 2 && <Products userData={userData} />}
            {menuselection === 3 && <Orders userData={userData} />}
            {menuselection === 4 && <Transactions userData={userData} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
