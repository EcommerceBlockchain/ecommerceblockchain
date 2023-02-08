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
} from "firebase/firestore";

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
      orderBy("timestamp", "desc"),
      limit(8)
    );
    const products = await getDocs(qu);
    products.docs.forEach((product) => {
      array.push({ ...product.data(), id: product.id });
    });
    setProducts(array);
    let qu2 = query(
      collection(getFirestore(), "products"),
      orderBy("timestamp", "desc"),
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
      limit(4)
    );
    const products3 = await getDocs(qu3);
    products3.docs.forEach((product) => {
      bestseller.push({ ...product.data(), id: product.id });
    });
    setBestSeller(bestseller);
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
                <span className="lead">Get the Best</span>
                <h1 className="mt-2 mb-5">
                  <span className="text-color">Digital </span>Products
                </h1>
                <Link className="btn btn-main" to={{ pathname: "/shop" }}>
                  Shop
                </Link>
              </div>
              <div className="slider-caption" style={{ width: "70%" }}>
                <lottie-player
                  autoplay
                  loop
                  mode="normal"
                  src="https://assets4.lottiefiles.com/packages/lf20_ikaawl5v.json"
                ></lottie-player>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section products-main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="title text-center">
                <h2>New arrivals</h2>
                <p>The best Online sales to shop these weekend</p>
              </div>
            </div>
          </div>

          <div
            className="row"
            style={{
              display: "grid",
              gap: "2rem",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            }}
          >
            {products.map((item) => {
              return (
                <Product
                  key={item.id}
                  name={item.name}
                  price={item.cost}
                  id={item.id}
                  preImg={item.preview_image[0]}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="ads section"></section>

      <section className="section products-list">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-12 col-md-12">
              <img
                src="assets/images/etherbg.png"
                alt="ether img"
                className="img-fluid w-100"
              />
            </div>

            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="widget-featured-entries mt-5 mt-lg-0">
                <h4 className="mb-4 pb-3">Best selllers</h4>
                {bestSeller.map((item) => {
                  return (
                    <SmallProduct
                      key={item.id}
                      name={item.name}
                      price={item.cost}
                      id={item.id}
                      preImg={item.preview_image[0]}
                    />
                  );
                })}
              </div>
            </div>

            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="widget-featured-entries mt-5 mt-lg-0">
                <h4 className="mb-4 pb-3">New Arrivals</h4>
                {newArrival.map((item) => {
                  return (
                    <SmallProduct
                      key={item.id}
                      name={item.name}
                      price={item.cost}
                      id={item.id}
                      preImg={item.preview_image[0]}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
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
