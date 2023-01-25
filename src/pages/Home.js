import { Link } from "react-router-dom";
import * as LottiePlayer from "@lottiefiles/lottie-player";
import GoToTop from "../components/GoToTop";

function Home() {
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
      {/* <section className="category section pt-3 pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-12 col-md-6">
              <div className="cat-item mb-4 mb-lg-0">
                <img
                  src="assets/images/cat-1.jpg"
                  alt=""
                  className="img-fluid"
                />
                <div className="item-info">
                  <p className="mb-0">Stylish Leather watch</p>
                  <h4 className="mb-4">
                    up to <strong>50% </strong>off
                  </h4>

                  <a href="#" className="read-more">
                    Shop now
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-12 col-md-6">
              <div className="cat-item mb-4 mb-lg-0">
                <img
                  src="assets/images/cat-2.jpg"
                  alt=""
                  className="img-fluid"
                />

                <div className="item-info">
                  <p className="mb-0">Ladies hand bag</p>
                  <h4 className="mb-4">
                    up to <strong>40% </strong>off
                  </h4>

                  <a href="#" className="read-more">
                    Shop now
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-12 col-md-6">
              <div className="cat-item">
                <img
                  src="assets/images/cat-3.jpg"
                  alt=""
                  className="img-fluid"
                />
                <div className="item-info">
                  <p className="mb-0">Trendy shoe</p>
                  <h4 className="mb-4">
                    up to <strong>50% </strong>off
                  </h4>

                  <a href="#" className="read-more">
                    Shop now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

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

          <div className="row">
            <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
              <div className="product">
                <div className="product-wrap">
                  <a href="/single-product">
                    <img
                      className="img-fluid w-100 mb-3 img-first"
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="product-img"
                    />
                  </a>
                  {/* <a href="/single-product">
                    <img
                      className="img-fluid w-100 mb-3 img-second"
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="product-img"
                    />
                  </a> */}
                </div>

                <span className="onsale">Sale</span>
                <div className="product-hover-overlay">
                  <a href="#">
                    <i className="tf-ion-android-cart"></i>
                  </a>
                </div>

                <div className="product-info">
                  <h2 className="product-title h5 mb-0">
                    <a href="#">Yellow Parrot</a>
                  </h2>
                  <span className="price">0.000075 Eth</span>
                  <span className="converted-price">{"  "}(₹10)</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
              <div className="product">
                <div className="product-wrap">
                  <a href="/single-product">
                    <img
                      className="img-fluid w-100 mb-3 img-first"
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="product-img"
                    />
                  </a>
                  {/* <a href="/single-product">
                    <img
                      className="img-fluid w-100 mb-3 img-second"
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="product-img"
                    />
                  </a> */}
                </div>

                <span className="onsale">Sale</span>
                <div className="product-hover-overlay">
                  <a href="#">
                    <i className="tf-ion-android-cart"></i>
                  </a>
                </div>

                <div className="product-info">
                  <h2 className="product-title h5 mb-0">
                    <a href="#">Yellow Parrot</a>
                  </h2>
                  <span className="price">0.000075 Eth</span>
                  <span className="converted-price">{"  "}(₹10)</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
              <div className="product">
                <div className="product-wrap">
                  <a href="/single-product">
                    <img
                      className="img-fluid w-100 mb-3 img-first"
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="product-img"
                    />
                  </a>
                  {/* <a href="/single-product">
                    <img
                      className="img-fluid w-100 mb-3 img-second"
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="product-img"
                    />
                  </a> */}
                </div>

                <span className="onsale">Sale</span>
                <div className="product-hover-overlay">
                  <a href="#">
                    <i className="tf-ion-android-cart"></i>
                  </a>
                </div>

                <div className="product-info">
                  <h2 className="product-title h5 mb-0">
                    <a href="#">Yellow Parrot</a>
                  </h2>
                  <span className="price">0.000075 Eth</span>
                  <span className="converted-price">{"  "}(₹10)</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
              <div className="product">
                <div className="product-wrap">
                  <a href="/single-product">
                    <img
                      className="img-fluid w-100 mb-3 img-first"
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="product-img"
                    />
                  </a>
                  {/* <a href="/single-product">
                    <img
                      className="img-fluid w-100 mb-3 img-second"
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="product-img"
                    />
                  </a> */}
                </div>

                <span className="onsale">Sale</span>
                <div className="product-hover-overlay">
                  <a href="#">
                    <i className="tf-ion-android-cart"></i>
                  </a>
                </div>

                <div className="product-info">
                  <h2 className="product-title h5 mb-0">
                    <a href="#">Yellow Parrot</a>
                  </h2>
                  <span className="price">0.000075 Eth</span>
                  <span className="converted-price">{"  "}(₹10)</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
              <div className="product">
                <div className="product-wrap">
                  <a href="/single-product">
                    <img
                      className="img-fluid w-100 mb-3 img-first"
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="product-img"
                    />
                  </a>
                  {/* <a href="/single-product">
                    <img
                      className="img-fluid w-100 mb-3 img-second"
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="product-img"
                    />
                  </a> */}
                </div>

                <span className="onsale">Sale</span>
                <div className="product-hover-overlay">
                  <a href="#">
                    <i className="tf-ion-android-cart"></i>
                  </a>
                </div>

                <div className="product-info">
                  <h2 className="product-title h5 mb-0">
                    <a href="#">Yellow Parrot</a>
                  </h2>
                  <span className="price">0.000075 Eth</span>
                  <span className="converted-price">{"  "}(₹10)</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
              <div className="product">
                <div className="product-wrap">
                  <a href="/single-product">
                    <img
                      className="img-fluid w-100 mb-3 img-first"
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="product-img"
                    />
                  </a>
                  {/* <a href="/single-product">
                    <img
                      className="img-fluid w-100 mb-3 img-second"
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="product-img"
                    />
                  </a> */}
                </div>

                <span className="onsale">Sale</span>
                <div className="product-hover-overlay">
                  <a href="#">
                    <i className="tf-ion-android-cart"></i>
                  </a>
                </div>

                <div className="product-info">
                  <h2 className="product-title h5 mb-0">
                    <a href="#">Yellow Parrot</a>
                  </h2>
                  <span className="price">0.000075 Eth</span>
                  <span className="converted-price">{"  "}(₹10)</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
              <div className="product">
                <div className="product-wrap">
                  <a href="/single-product">
                    <img
                      className="img-fluid w-100 mb-3 img-first"
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="product-img"
                    />
                  </a>
                  {/* <a href="/single-product">
                    <img
                      className="img-fluid w-100 mb-3 img-second"
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="product-img"
                    />
                  </a> */}
                </div>

                <span className="onsale">Sale</span>
                <div className="product-hover-overlay">
                  <a href="#">
                    <i className="tf-ion-android-cart"></i>
                  </a>
                </div>

                <div className="product-info">
                  <h2 className="product-title h5 mb-0">
                    <a href="#">Yellow Parrot</a>
                  </h2>
                  <span className="price">0.000075 Eth</span>
                  <span className="converted-price">{"  "}(₹10)</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-5">
              <div className="product">
                <div className="product-wrap">
                  <a href="/single-product">
                    <img
                      className="img-fluid w-100 mb-3 img-first"
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="product-img"
                    />
                  </a>
                  {/* <a href="/single-product">
                    <img
                      className="img-fluid w-100 mb-3 img-second"
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="product-img"
                    />
                  </a> */}
                </div>

                <span className="onsale">Sale</span>
                <div className="product-hover-overlay">
                  <a href="#">
                    <i className="tf-ion-android-cart"></i>
                  </a>
                </div>

                <div className="product-info">
                  <h2 className="product-title h5 mb-0">
                    <a href="#">Yellow Parrot</a>
                  </h2>
                  <span className="price">0.000075 Eth</span>
                  <span className="converted-price">{"  "}(₹10)</span>
                </div>
              </div>
            </div>
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

                <div className="media mb-3">
                  <a className="featured-entry-thumb" href="/single-product">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Yellow Parrot</a>
                    </h6>
                    <span className="price">0.000075 Eth</span>
                    <span className="converted-price">{"  "}(₹10)</span>
                  </div>
                </div>

                <div className="media mb-3">
                  <a className="featured-entry-thumb" href="#">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Yellow Parrot</a>
                    </h6>
                    <span className="price">0.000075 Eth</span>
                    <span className="converted-price">{"  "}(₹10)</span>
                  </div>
                </div>

                <div className="media mb-3">
                  <a className="featured-entry-thumb" href="#">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Yellow Parrot</a>
                    </h6>
                    <span className="price">0.000075 Eth</span>
                    <span className="converted-price">{"  "}(₹10)</span>
                  </div>
                </div>

                <div className="media mb-3">
                  <a className="featured-entry-thumb" href="#">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Yellow Parrot</a>
                    </h6>
                    <span className="price">0.000075 Eth</span>
                    <span className="converted-price">{"  "}(₹10)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="widget-featured-entries mt-5 mt-lg-0">
                <h4 className="mb-4 pb-3">New Arrivals</h4>

                <div className="media mb-3">
                  <a className="featured-entry-thumb" href="/single-product">
                    <img
                      src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Sunset</a>
                    </h6>
                    <span className="price">0.00016 Eth</span>
                    <span className="converted-price">{"  "}(₹20)</span>
                  </div>
                </div>

                <div className="media mb-3">
                  <a className="featured-entry-thumb" href="#">
                    <img
                      src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Sunset</a>
                    </h6>
                    <span className="price">0.00016 Eth</span>
                    <span className="converted-price">{"  "}(₹20)</span>
                  </div>
                </div>

                <div className="media mb-3">
                  <a className="featured-entry-thumb" href="#">
                    <img
                      src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Sunset</a>
                    </h6>
                    <span className="price">0.00016 Eth</span>
                    <span className="converted-price">{"  "}(₹20)</span>
                  </div>
                </div>

                <div className="media mb-3">
                  <a className="featured-entry-thumb" href="#">
                    <img
                      src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                      alt="Product thumb"
                      width="64"
                      className="img-fluid mr-3"
                    />
                  </a>
                  <div className="media-body">
                    <h6 className="featured-entry-title mb-0">
                      <a href="#">Sunset</a>
                    </h6>
                    <span className="price">0.00016 Eth</span>
                    <span className="converted-price">{"  "}(₹20)</span>
                  </div>
                </div>
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
