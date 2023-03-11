import {
  collection,
  endAt,
  getDocs,
  getFirestore,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import React from "react";
import { useEffect, useState } from "react";
import * as LottiePlayer from "@lottiefiles/lottie-player";
import colors from "../colors";
import activity from "../images/activity.gif";

import { Link, useLocation } from "react-router-dom";
import Product from "../components/Product";

function Search() {
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(
    location.state?.tag ? "#" + location.state?.tag : ""
  );
  const [press, setPress] = useState(false);
  const [loader, setLoader] = useState(false);

  const getProducts = async () => {
    setProducts([]);
    let array = [];
    let qu = query(
      collection(getFirestore(), "products"),
      orderBy("name"),
      startAt(search),
      endAt(search + "~")
    );
    const productss = await getDocs(qu);
    productss.docs.forEach((product) => {
      array.push({ ...product.data(), id: product.id });
    });
    setProducts(array);
    setLoader(false);
  };
  const getProductByTag = async (tag) => {
    setProducts([]);
    let array = [];
    let qu = query(
      collection(getFirestore(), "products"),
      where("tag", "array-contains", tag)
    );
    const productss = await getDocs(qu);
    productss.docs.forEach((product) => {
      array.push({ ...product.data(), id: product.id });
    });
    setProducts(array);
    setLoader(false);
  };

  useEffect(() => {
    setProducts([]);
    setPress(false);
    if (location.state?.tag) {
      console.log(location.state.tag);
      setLoader(true);
      getProductByTag(location.state.tag);
    }
  }, []);
  return (
    <div className="shop-container">
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">Search</h1>
                <p>
                  With our search bar, you can discover new digital products,
                  compare prices, and read reviews from other users. Whether
                  you're interested in digital media, software, or online
                  courses, our search bar has got you covered. So start
                  exploring the world of digital products today and find the
                  perfect products to suit your needs.
                </p>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to={{ pathname: "/" }}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Search
                    </li>
                  </ol>
                </nav>
                <div class="search-bar">
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      position: "absolute",
                    }}
                  >
                    <input
                      type="search"
                      id="form1"
                      class="form-control"
                      style={{
                        height: "50px",
                        position: "relative",
                        borderColor:
                          search === "" && press ? colors.red : "lightgray",
                      }}
                      placeholder={"Search Anything..."}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      value={search}
                    />
                    {search === "" && press && (
                      <p
                        style={{
                          color: colors.red,
                          position: "absolute",
                          top: "3rem",
                          left: 0,
                        }}
                      >
                        search field can't be empty!
                      </p>
                    )}
                    <button
                      type="button"
                      class="btn btn-main"
                      style={{
                        width: "100px",
                        height: "50px",
                      }}
                      onClick={() => {
                        setPress(true);
                        if (search) {
                          setLoader(true);
                          setPress(false);
                          if (
                            (search.charAt(0) === "#") &
                            (search.length >= 2)
                          ) {
                            let st = search;

                            getProductByTag(st.substring(1));
                          } else {
                            getProducts();
                          }
                        }
                      }}
                    >
                      <i className="tf-ion-android-search"></i>
                    </button>
                  </div>
                </div>

                <p style={{ marginTop: "2rem" }}>
                  Example :- Nature, Wallpaper, Python, #sunset, #beautiful ...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* https://assets3.lottiefiles.com/private_files/lf30_2c7wnifx.json */}
      {loader ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img height={60} src={activity} alt="activity" />
        </div>
      ) : (
        <section className="section products-main">
          {!products.length ? (
            <div className="container">
              <div className="row justify-content-center align-items-center">
                <div>
                  <h2>No products to display</h2>
                  <p>Start search for your products.</p>
                </div>
                <div className="slider-caption">
                  <lottie-player
                    autoplay
                    loop
                    mode="normal"
                    src=" https://assets3.lottiefiles.com/private_files/lf30_2c7wnifx.json"
                  ></lottie-player>
                </div>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="title text-center">
                    <p style={{ fontSize: "2rem" }}>
                      Search results for "{search}"
                    </p>
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
          )}
        </section>
      )}
    </div>
  );
}

export default Search;
