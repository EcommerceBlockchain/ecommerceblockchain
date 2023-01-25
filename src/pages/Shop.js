import { Link } from "react-router-dom";
import GoToTop from "../components/GoToTop";

function Shop() {
  return (
    <div className="shop-container">
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">Shop</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit sint doloribus obcaecati fuga dolorem quod dolor
                  maxime non, facere nemo consequatur ratione laborum nesciunt,
                  fugiat, possimus adipisci odit neque eos!
                </p>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to={{ pathname: "/" }}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Shop
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-shop section">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="row align-items-center">
                <div className="col-lg-12 mb-4 mb-lg-0">
                  <div className="section-title">
                    <h2 className="d-block text-left-sm">Shop</h2>

                    <div className="heading d-flex justify-content-between mb-5">
                      <p className="result-count mb-0">
                        {" "}
                        Showing 1–6 of 17 results
                      </p>
                      <form className="ordering " method="get">
                        <select
                          name="orderby"
                          className="orderby form-control"
                          aria-label="Shop order"
                        >
                          <option value="" selected="selected">
                            Default sorting
                          </option>
                          <option value="">Sort by popularity</option>
                          <option value="">Sort by average rating</option>
                          <option value="">Sort by latest</option>
                          <option value="">Sort by price: low to high</option>
                          <option value="">Sort by price: high to low</option>
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-4 col-12 col-md-6 col-sm-6 mb-5">
                  <div className="product">
                    <div className="product-wrap">
                      <a href="/single-product">
                        <img
                          className="img-fluid w-100 mb-3 img-first"
                          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
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
                        <a href="#">Sunset</a>
                      </h2>
                      <span className="price">0.00016 Eth</span>
                      <span className="converted-price">{"  "}(₹20)</span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-12 col-md-6 col-sm-6 mb-5">
                  <div className="product">
                    <div className="product-wrap">
                      <a href="/single-product">
                        <img
                          className="img-fluid w-100 mb-3 img-first"
                          src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                          alt="product-img"
                        />
                      </a>
                    </div>

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

                <div className="col-lg-4 col-12 col-md-6 col-sm-6 mb-5">
                  <div className="product">
                    <div className="product-wrap">
                      <a href="/single-product">
                        <img
                          className="img-fluid w-100 mb-3 img-first"
                          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
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
                        <a href="/single-product">Sunset</a>
                      </h2>
                      <span className="price">0.00016 Eth</span>
                      <span className="converted-price">{"  "}(₹20)</span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-12 col-md-6 col-sm-6 mb-5">
                  <div className="product">
                    <div className="product-wrap">
                      <a href="/single-product">
                        <img
                          className="img-fluid w-100 mb-3 img-first"
                          src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                          alt="product-img"
                        />
                      </a>
                    </div>

                    <div className="product-hover-overlay">
                      <a href="#">
                        <i className="tf-ion-android-cart"></i>
                      </a>
                    </div>

                    <div className="product-info">
                      <h2 className="product-title h5 mb-0">
                        <a href="/single-product">Yellow Parrot</a>
                      </h2>
                      <span className="price">0.000075 Eth</span>
                      <span className="converted-price">{"  "}(₹10)</span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-12 col-md-6 col-sm-6 mb-5">
                  <div className="product">
                    <div className="product-wrap">
                      <a href="/single-product">
                        <img
                          className="img-fluid w-100 mb-3 img-first"
                          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                          alt="product-img"
                        />
                      </a>
                    </div>

                    <div className="product-hover-overlay">
                      <a href="#">
                        <i className="tf-ion-android-cart"></i>
                      </a>
                    </div>

                    <div className="product-info">
                      <h2 className="product-title h5 mb-0">
                        <a href="/single-product">Sunset</a>
                      </h2>
                      <span className="price">0.00016 Eth</span>
                      <span className="converted-price">{"  "}(₹20)</span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-12 col-md-6 col-sm-6 mb-5">
                  <div className="product">
                    <div className="product-wrap">
                      <a href="/single-product">
                        <img
                          className="img-fluid w-100 mb-3 img-first"
                          src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                          alt="product-img"
                        />
                      </a>
                    </div>

                    <div className="product-hover-overlay">
                      <a href="#">
                        <i className="tf-ion-android-cart"></i>
                      </a>
                    </div>

                    <div className="product-info">
                      <h2 className="product-title h5 mb-0">
                        <a href="/single-product">Yellow Parrot</a>
                      </h2>
                      <span className="price">0.000075 Eth</span>
                      <span className="converted-price">{"  "}(₹10)</span>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <nav aria-label="Page navigation">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <form className="mb-5">
                <section className="widget widget-sizes mb-5">
                  <h3 className="widget-title h4 mb-4">Shop by Category</h3>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="size1"
                    />
                    <label className="custom-control-label" for="size1">
                      Image
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="size2"
                    />
                    <label className="custom-control-label" for="size2">
                      Video
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="size3"
                    />
                    <label className="custom-control-label" for="size3">
                      Audio
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="size4"
                    />
                    <label className="custom-control-label" for="size4">
                      GIF
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="size5"
                    />
                    <label className="custom-control-label" for="size5">
                      Documents (.xlsx, .pdf, .docx etc)
                    </label>
                  </div>
                </section>

                <button type="button" className="btn btn-black btn-small">
                  Filter
                </button>
              </form>

              <section className="widget widget-popular mb-5">
                <h3 className="widget-title mb-4 h4">Popular Products</h3>
                <a
                  className="popular-products-item media"
                  href="/single-product"
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                    alt=""
                    className="img-fluid mr-4"
                  />
                  <div className="media-body">
                    <h6>Yellow Parrot</h6>
                    <span className="price">0.000075 Eth</span>
                    <span className="converted-price">{"  "}(₹10)</span>
                  </div>
                </a>

                <a
                  className="popular-products-item media"
                  href="/single-product"
                >
                  <img
                    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                    alt=""
                    className="img-fluid mr-4"
                  />
                  <div className="media-body">
                    <h6>Sunset</h6>
                    <span className="price">0.00016 Eth</span>
                    <span className="converted-price">{"  "}(₹20)</span>
                  </div>
                </a>

                <a
                  className="popular-products-item media"
                  href="/single-product"
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/digimart-69f1f.appspot.com/o/preview_images%2Fparrot.jpg?alt=media&token=8af0d227-6ce9-4cb9-9641-ebf9792403da"
                    alt=""
                    className="img-fluid mr-4"
                  />
                  <div className="media-body">
                    <h6>Yellow Parrot</h6>
                    <span className="price">0.000075 Eth</span>
                    <span className="converted-price">{"  "}(₹10)</span>
                  </div>
                </a>
              </section>
            </div>
          </div>
        </div>
      </section>
      <GoToTop />
    </div>
  );
}
export default Shop;
