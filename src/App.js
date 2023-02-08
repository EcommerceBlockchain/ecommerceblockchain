import Header from "../src/components/Header"; //Include Header
import Footer from "../src/components/Footer"; //Include Footer
import Home from "../src/pages/Home";
import Shop from "../src/pages/Shop";
import SingleProduct from "./pages/SingleProduct";
import Checkout from "../src/pages/Checkout";
import Cart from "../src/pages/Cart";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import ForgotPassword from "../src/pages/ForgotPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getApp, initializeApp } from "firebase/app";
import firebaseConfig from "../src/config/firebaseConfig";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
// import {
//   getDocs,
//   getDoc,
//   doc,
//   getFirestore,
//   setDoc,
//   addDoc,
//   collection,
// } from "firebase/firestore";
// import { getDownloadURL, getStorage, ref } from "firebase/storage";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import AddProduct from "./pages/AddProduct";
import { onAuthStateChanged } from "firebase/auth";
import UserState from "./context/UserState";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getdata() {
      const auth = getAuth(getApp());
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
    }
    getdata();
    initializeApp(firebaseConfig);
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <UserState>
      <div className="App">
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/single-product/" element={<SingleProduct />} />

            <Route
              path="/checkout"
              element={user ? <Checkout /> : <Login path={"/checkout"} />}
            />
            <Route
              path="/cart"
              element={user ? <Cart /> : <Login path={"/cart"} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/addproduct"
              element={user ? <AddProduct /> : <Login path={"/addproduct"} />}
            />
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </div>
    </UserState>
  );
}

export default App;
