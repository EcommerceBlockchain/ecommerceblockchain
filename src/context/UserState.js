import React, { useState } from "react";
import UserContext from "./UserContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect } from "react";

function UserState(props) {
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState("  ");
  const [userdata, setUserData] = useState({});
  const auth = getAuth(initializeApp(firebaseConfig));


  useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getDoc(doc(getFirestore(), "users", user.uid));
        setUserName(data.data().username);
        setUserData(data.data());
      } else {
        setUserName("  ");
        setUserData(null);
      }
    });
  },[])

  return (
    <UserContext.Provider value={{ user, username, userdata }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
