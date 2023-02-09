import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import GoToTop from "../components/GoToTop";
import Product from "../components/Product";

function SingleProduct() {
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [tag, setTags] = useState([]);
  const location = useLocation();
  const { id } = location.state;

  const getProduct = async () => {
    setProduct({});
    const pro = await getDoc(doc(getFirestore(), "products", id));
    setProduct(pro.data());
    setImages(pro.data().preview_image);
    setTags(pro.data().tag);
  };

  const getPopularProducts = async () => {};

  useEffect(() => {
    getProduct();
    getPopularProducts([]);
  }, []);

  return (
    <div className="single-product-container">
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">{product.name}</h1>
                <p>{product.description}</p>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to={{ pathname: "/" }}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {product.name}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="single-product">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="single-product-slider">
                <div
                  className="carousel slide"
                  data-ride="carousel"
                  id="single-product-slider"
                >
                  <div className="carousel-inner">
                    {images.map((item, index) => {
                      return (
                        <div
                          className={`carousel-item ${
                            index === 0 ? "active" : ""
                          }`}
                        >
                          <img src={item} alt="" className="img-fluid" />
                        </div>
                      );
                    })}
                  </div>

                  {images.length > 1 && (
                    <ol className="carousel-indicators">
                      {images.map((item, index) => {
                        return (
                          <li
                            data-target="#single-product-slider"
                            data-slide-to={index}
                            className={`${
                              index === 0 ? "active" : "img-fluid"
                            }`}
                          >
                            <img src={item} alt="" className="img-fluid" />
                          </li>
                        );
                      })}
                    </ol>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <div className="single-product-details mt-5 mt-lg-0">
                <h2>{product.name}</h2>

                <hr />

                <h3 className="product-price">
                  <span className="price">{product.cost} Eth</span>
                </h3>

                <p className="product-description my-4 ">
                  {product.description}
                </p>

                <button
                  type="button"
                  style={{ marginRight: "0.5rem" }}
                  className="cart-btn"
                >
                  -
                </button>
                <button
                  style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}
                  type="button"
                  className="cart-btn"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="cart-btn"
                  style={{ marginLeft: "0.5rem" }}
                >
                  +
                </button>

                <div className="products-meta mt-4">
                  <div className="product-category d-flex align-items-center">
                    <span className="font-weight-bold text-capitalize product-meta-title">
                      Tags :
                    </span>
                    {tag.length > 0
                      ? tag.map((item) => {
                          return <a href="#">{item},</a>;
                        })
                      : "No Tags"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <nav className="product-info-tabs wc-tabs mt-5 mb-5">
                <div
                  className="nav nav-tabs nav-fill"
                  id="nav-tab"
                  role="tablist"
                >
                  {/* <a
                    className="nav-item nav-link active"
                    id="nav-home-tab"
                    data-toggle="tab"
                    href="#nav-home"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Description
                  </a> */}
                  <a
                    className="nav-item nav-link active"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    href="#nav-profile"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    Additional Information
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-contact-tab"
                    data-toggle="tab"
                    href="#nav-contact"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    Reviews(2)
                  </a>
                </div>
              </nav>

              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <ul className="list-unstyled info-desc">
                    <li className="d-flex">
                      <strong>Owner</strong>
                      <span>
                        <Link to={"/"}>{product.owner}</Link>
                      </span>
                    </li>
                    <li className="d-flex">
                      <strong>Dimensions </strong>
                      <span>720 x 576 pixels</span>
                    </li>

                    <li className="d-flex">
                      <strong>Size</strong>
                      <span>1.5 MB</span>
                    </li>
                  </ul>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-contact"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab"
                >
                  <div className="row">
                    <div className="col-lg-7">
                      <div className="media review-block mb-4">
                        <img
                          src="assets/images/avater-1.jpg"
                          alt="reviewimg"
                          className="img-fluid mr-4"
                        />
                        <div className="media-body">
                          <div className="product-review">
                            <span>
                              <i className="tf-ion-android-star"></i>
                            </span>
                            <span>
                              <i className="tf-ion-android-star"></i>
                            </span>
                            <span>
                              <i className="tf-ion-android-star"></i>
                            </span>
                            <span>
                              <i className="tf-ion-android-star"></i>
                            </span>
                            <span>
                              <i className="tf-ion-android-star"></i>
                            </span>
                          </div>
                          <h6>
                            Digimart{" "}
                            <span className="text-sm text-muted font-weight-normal ml-3">
                              -Jan 1, 2023
                            </span>
                          </h6>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Ipsum suscipit consequuntur in, perspiciatis
                            laudantium ipsa fugit. Iure esse saepe error dolore
                            quod.
                          </p>
                        </div>
                      </div>

                      <div className="media review-block">
                        <img
                          src="assets/images/avater-2.jpg"
                          alt="reviewimg"
                          className="img-fluid mr-4"
                        />
                        <div className="media-body">
                          <div className="product-review">
                            <span>
                              <i className="tf-ion-android-star"></i>
                            </span>
                            <span>
                              <i className="tf-ion-android-star"></i>
                            </span>
                            <span>
                              <i className="tf-ion-android-star"></i>
                            </span>
                            <span>
                              <i className="tf-ion-android-star"></i>
                            </span>
                            <span>
                              <i className="tf-ion-android-star-outline"></i>
                            </span>
                          </div>
                          <h6>
                            Digimart{" "}
                            <span className="text-sm text-muted font-weight-normal ml-3">
                              -Jan 1, 2023
                            </span>
                          </h6>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Ipsum suscipit consequuntur in, perspiciatis
                            laudantium ipsa fugit. Iure esse saepe error dolore
                            quod.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-5">
                      <div className="review-comment mt-5 mt-lg-0">
                        <h4 className="mb-3">Add a Review</h4>

                        <form action="#">
                          <div className="starrr"></div>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Your Name"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Your Email"
                            />
                          </div>
                          <div className="form-group">
                            <textarea
                              name="comment"
                              id="comment"
                              className="form-control"
                              cols="30"
                              rows="4"
                              placeholder="Your Review"
                            ></textarea>
                          </div>

                          <a
                            routerLink="/single-product"
                            className="btn btn-main btn-small"
                          >
                            Submit Review
                          </a>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products related-products section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="title text-center">
                <h2>You may like this</h2>
                <p>The best Online sales to shop these weekend</p>
              </div>
            </div>
          </div>
          <div className="row">
            <Product
              description={product.description}
              name={product.name}
              preImg={""}
              id={id}
              price={product.cost}
            />
          </div>
        </div>
      </section>
      <GoToTop />
    </div>
  );
}
export default SingleProduct;
