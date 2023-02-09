import React, { useState } from "react";
import UserContext from "./UserContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";
import getUsernameByEmail from "../service/getUsernameByEmail";

function UserState(props) {
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState(null);
  const auth = getAuth(initializeApp(firebaseConfig));

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUser(user);
      const data = await getUsernameByEmail(user.email);
      setUserName(data);
    } else {
      setUser(null);
    }
  });

  return (
    <UserContext.Provider value={{ user, username }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
