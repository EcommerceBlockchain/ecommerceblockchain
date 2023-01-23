import Header from "../src/components/Header"; //Include Header
import Footer from "../src/components/Footer"; //Include Footer
import Home from "../src/pages/Home";
import Shop from "../src/pages/Shop";
import SingleProduct from "../src/components/SingleProduct";
import Checkout from "../src/pages/Checkout";
import Cart from "../src/pages/Cart";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import ForgotPassword from "../src/pages/ForgotPassword";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

function App() {
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
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
