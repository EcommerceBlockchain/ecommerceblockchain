import React, { useState } from "react";
import UserContext from "./UserContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";

function UserState(props) {
  const [user, setUser] = useState(null);
  const auth = getAuth(initializeApp(firebaseConfig));
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  const [cart, setCart] = useState([]);

  return (
    <UserContext.Provider value={{ user, cart, setCart }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
