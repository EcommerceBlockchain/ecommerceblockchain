import Header from "../src/components/Header"; //Include Header
import Footer from "../src/components/Footer"; //Include Footer
import Home from "../src/pages/Home";
import Shop from "../src/pages/Shop";
import SingleProduct from "./pages/SingleProduct";
import Cart from "../src/pages/Cart";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import ForgotPassword from "../src/pages/ForgotPassword";
import UserProfile from "../src/pages/UserProfile";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Location,
} from "react-router-dom";
import { getApp, initializeApp } from "firebase/app";
import firebaseConfig from "../src/config/firebaseConfig";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

import AddProduct from "./pages/AddProduct";
import { onAuthStateChanged } from "firebase/auth";
import UserState from "./context/UserState";
import Search from "./pages/Search";
import Profile from "../src/pages/Profile";

import { ProSidebarProvider } from "react-pro-sidebar";

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
      <div className="App" style={{ height: "100%" }}>
        <ProSidebarProvider>
          <BrowserRouter>
            <Header></Header>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/single-product" element={<SingleProduct />} />

              <Route path="/cart" element={user ? <Cart /> : <Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/addproduct"
                element={<AddProduct />}
              />
              <Route path="/profile" element={user ? <Profile /> : <Login />} />
              <Route path="/userprofile" element={<UserProfile />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ProSidebarProvider>
      </div>
    </UserState>
  );
}

export default App;
