import { Link } from "react-router-dom";
import * as LottiePlayer from "@lottiefiles/lottie-player";
import GoToTop from "../components/GoToTop";
import Product from "../components/Product";
import SmallProduct from "../components/SmallProduct";
import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  getFirestore,
  query,
  orderBy,
  limit,
  setDoc,
  getDoc,
  doc,
  where,
} from "firebase/firestore";
import { ethers } from "ethers";
import GetFileByPath from "../service/GetFileByPath";
import smartConracts from "../blockchain/smartContracts";
import addproductabi from "../blockchain/abis/addProduct.json";
import { getAuth } from "firebase/auth";

function Home() {
  const [products, setProducts] = useState([]);
  const [newArrival, SetNewArrival] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);

  const getProducts = async () => {
    setProducts([]);
    SetNewArrival([]);
    setBestSeller([]);
    let array = [];
    let newarrival = [];
    let bestseller = [];
    let qu = query(
      collection(getFirestore(), "products"),
      limit(8),
      where("is_active", "==", true)
    );
    const products = await getDocs(qu);
    products.docs.forEach((product) => {
      array.push({ ...product.data(), id: product.id });
    });
    setProducts(array);
    let qu2 = query(
      collection(getFirestore(), "products"),
      orderBy("timestamp", "desc"),
      where("is_active", "==", true),
      limit(4)
    );
    const products2 = await getDocs(qu2);
    products2.docs.forEach((product) => {
      newarrival.push({ ...product.data(), id: product.id });
    });
    SetNewArrival(newarrival);
    let qu3 = query(
      collection(getFirestore(), "products"),
      orderBy("quantity_sold", "desc"),
      where("is_active", "==", true),
      limit(4)
    );
    const products3 = await getDocs(qu3);
    products3.docs.forEach((product) => {
      bestseller.push({ ...product.data(), id: product.id });
    });
    setBestSeller(bestseller);
  };

  const addwallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const smcon = new ethers.Contract(
      smartConracts.addProduct,
      addproductabi,
      provider
    );

    let ans = await provider.getTransaction(
      "0xd067006212f4fd2a33537b9d79cf85ca783c5c2ea74a7c44761e30aaa6fc8d8b"
    );
    console.log(ans.maxFeePerGas);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="home-container">
      <div className="main-slider slider slick-initialized slick-slider">
        <div className="slider-item">
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div className="slider-caption">
                {/* <span className="lead">Get the Best</span> */}
                <h1 className="mt-2 mb-5">
                  <span className="text-color">SafeGuard Your </span>Documents
                </h1>
                <Link
                  className="btn btn-main"
                  to={{ pathname: "/addproduct" }}
                  onClick={() => {
                    addwallet();
                  }}
                >
                  Try for free
                </Link>
              </div>
              <div className="slider-caption" style={{ width: "70%" }}>
                <lottie-player
                  autoplay
                  loop
                  mode="normal"
                  src=""
                ></lottie-player>
              </div>
            </div>
          </div>
        </div>
      </div>



      <section className="features border-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="feature-block">
                <i className="tf-wallet"></i>
                <div className="content">
                  <h5>Lifetime Access</h5>
                  <p>Pay only once</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="feature-block">
                <i className="tf-key"></i>
                <div className="content">
                  <h5>Secure Checkout</h5>
                  <p>100% Protected by Metamask</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="feature-block">
                <i className="tf-clock"></i>
                <div className="content">
                  <h5>24/7 Support</h5>
                  <p>All time customer support </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GoToTop />
    </div>
  );
}
export default Home;
