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
import { initializeApp } from "firebase/app";
import firebaseConfig from "../src/config/firebaseConfig";
import { useEffect } from "react";
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

function App() {
  useEffect(() => {
    initializeApp(firebaseConfig);
    async function getdata() {
      // const docRef = doc(getFirestore(), "products", "wZVVhxSyHBydHNAJzjVn");
      // const docSnap = await getDoc(docRef);
      // console.log(docSnap.data());
      // await addDoc(collection(getFirestore(), "products"), docSnap.data()).then(
      //   () => {
      //     console.log("done");
      //   }
      // );
      // const storage = getStorage();
      // const pathReference = ref(
      //   storage,
      //   "gs://digimart-69f1f.appspot.com/preview_images/parrot.jpg"
      // );
      // getDownloadURL(pathReference).then((url) => {
      //   console.log(url);
      // });
    }
    getdata();
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/single-product" element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
