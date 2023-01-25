import { Link } from "react-router-dom";
import GoToTop from "../components/GoToTop";

function SingleProduct() {
  return (
    <div className="single-product-container">
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">Sunset</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                  repellendus ipsum id minima animi voluptatem officia sed
                  cumque, corporis odit possimus in? Necessitatibus possimus sed
                  magnam modi autem numquam eveniet?
                </p>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to={{ pathname: "/" }}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Sunset
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
                    <div className="carousel-item active">
                      <img
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>

                    <div className="carousel-item ">
                      <img
                        alt=""
                        className="img-fluid"
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                      />
                    </div>
                    <div className="carousel-item ">
                      <img
                        alt=""
                        className="img-fluid"
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                      />
                    </div>
                  </div>

                  <ol className="carousel-indicators">
                    <li
                      data-target="#single-product-slider"
                      data-slide-to="0"
                      className="active"
                    >
                      <img
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </li>
                    <li data-target="#single-product-slider" data-slide-to="1">
                      <img
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </li>
                    <li data-target="#single-product-slider" data-slide-to="2">
                      <img
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <div className="single-product-details mt-5 mt-lg-0">
                <h2>Sunset</h2>

                <hr />

                <h3 className="product-price">
                  <span className="price">0.00016 Eth</span>
                  <span className="converted-price">{"  "}(₹20)</span>
                  {/* <del>0.000</del> */}
                </h3>

                <p className="product-description my-4 ">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Laborum ipsum dicta quod, quia doloremque aut deserunt commodi
                  quis. Totam a consequatur beatae nostrum, earum consequuntur?
                  Eveniet consequatur ipsum dicta recusandae.
                </p>

                <form className="cart" action="#" method="post">
                  <div className="quantity d-flex align-items-center">
                    <input
                      type="number"
                      id="#"
                      className="input-text qty text form-control w-25 mr-3"
                      step="1"
                      min="1"
                      max="9"
                      name="quantity"
                      value="1"
                      title="Qty"
                      size="4"
                    />
                    <a href="#" className="btn btn-main btn-small">
                      Add to cart
                    </a>
                  </div>
                </form>

                <div className="products-meta mt-4">
                  <div className="product-category d-flex align-items-center">
                    <span className="font-weight-bold text-capitalize product-meta-title">
                      Tags :
                    </span>
                    <a href="#">Wallpaper, </a>
                    <a href="#">Sunset, </a>
                    <a href="#">Tree</a>
                  </div>

                  {/* <div className="product-share mt-5">
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="tf-ion-social-facebook"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="tf-ion-social-twitter"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="tf-ion-social-linkedin"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <i className="tf-ion-social-pinterest"></i>
                        </a>
                      </li>
                    </ul>
                  </div> */}
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
                  <a
                    className="nav-item nav-link active"
                    id="nav-home-tab"
                    data-toggle="tab"
                    href="#nav-home"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Description
                  </a>
                  <a
                    className="nav-item nav-link"
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
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatem, in molestiae explicabo odio soluta tempora
                    corrupti voluptates distinctio quis possimus tenetur sit
                    necessitatibus nesciunt quibusdam autem quas reiciendis ut
                    nulla!
                  </p>

                  <h4>Product Features</h4>

                  <ul className="">
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ipsam quis, quos accusamus animi quae ipsum at temporibus.
                      Laborum velit placeat, ea quibusdam ad voluptas molestias
                      dicta accusamus veniam enim aliquam?
                    </li>
                    <li>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Quia dolorum, cupiditate culpa fuga saepe illum rem facere
                      officia deleniti hic laboriosam dolor animi dolores nisi
                      ipsam, veritatis nobis voluptas neque.
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sequi culpa vero, tempora odit vel omnis ducimus ullam.
                      Sunt totam eaque quis ratione nobis dicta velit illo!
                      Incidunt aspernatur accusamus architecto.
                    </li>
                  </ul>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <ul className="list-unstyled info-desc">
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
            <div className="col-lg-3 col-6">
              <div className="product">
                <Link to={{ pathname: "/single-product" }}>
                  <div className="product-wrap">
                    <a routerLink="/single-product">
                      <img
                        className="img-fluid w-100 mb-3 img-first"
                        src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                        alt="product-img"
                      />
                    </a>
                  </div>

                  <span className="onsale">Sale</span>
                  <div className="product-hover-overlay">
                    <a href="#">
                      <i className="tf-ion-android-cart"></i>
                    </a>
                  </div>

                  <div className="product-info">
                    <h2 className="product-title h5 mb-0">
                      <a routerLink="/single-product">Yellow Parrot</a>
                    </h2>
                    <span className="price">0.000075 Eth</span>
                    <span className="converted-price">{"  "}(₹10)</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="product">
                <Link to={{ pathname: "/single-product" }}>
                  <div className="product-wrap">
                    <a routerLink="/single-product">
                      <img
                        className="img-fluid w-100 mb-3 img-first"
                        src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                        alt="product-img"
                      />
                    </a>
                  </div>

                  <span className="onsale">Sale</span>
                  <div className="product-hover-overlay">
                    <a href="#">
                      <i className="tf-ion-android-cart"></i>
                    </a>
                  </div>

                  <div className="product-info">
                    <h2 className="product-title h5 mb-0">
                      <a routerLink="/single-product">Yellow Parrot</a>
                    </h2>
                    <span className="price">0.000075 Eth</span>
                    <span className="converted-price">{"  "}(₹10)</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="product">
                <Link to={{ pathname: "/single-product" }}>
                  <div className="product-wrap">
                    <a routerLink="/single-product">
                      <img
                        className="img-fluid w-100 mb-3 img-first"
                        src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                        alt="product-img"
                      />
                    </a>
                  </div>

                  <span className="onsale">Sale</span>
                  <div className="product-hover-overlay">
                    <a href="#">
                      <i className="tf-ion-android-cart"></i>
                    </a>
                  </div>

                  <div className="product-info">
                    <h2 className="product-title h5 mb-0">
                      <a routerLink="/single-product">Yellow Parrot</a>
                    </h2>
                    <span className="price">0.000075 Eth</span>
                    <span className="converted-price">{"  "}(₹10)</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="product">
                <Link to={{ pathname: "/single-product" }}>
                  <div className="product-wrap">
                    <a routerLink="/single-product">
                      <img
                        className="img-fluid w-100 mb-3 img-first"
                        src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                        alt="product-img"
                      />
                    </a>
                  </div>

                  <span className="onsale">Sale</span>
                  <div className="product-hover-overlay">
                    <a href="#">
                      <i className="tf-ion-android-cart"></i>
                    </a>
                  </div>

                  <div className="product-info">
                    <h2 className="product-title h5 mb-0">
                      <a routerLink="/single-product">Yellow Parrot</a>
                    </h2>
                    <span className="price">0.000075 Eth</span>
                    <span className="converted-price">{"  "}(₹10)</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GoToTop />
    </div>
  );
}
export default SingleProduct;
