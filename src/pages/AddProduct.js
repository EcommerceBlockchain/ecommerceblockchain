import React, { useState } from "react";
import GoToTop from "../components/GoToTop";
import { Link } from "react-router-dom";

function AddProduct() {
  const [image, setimage] = useState("");
  return (
    <div className="checkout-container">
      <section className="page-header">
        <div className="content text-center">
          <h1 className="mb-3">Add Product</h1>
        </div>
      </section>
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="row align-items-center">
                <div className="col-lg-12 mb-4 mb-lg-0">
                  <div className="section-title">
                    <h2 className="d-block text-left-sm">Description</h2>

                    <div
                      className="heading justify-content-between mb-5"
                      style={{
                        border: "1px solid lightgrey",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <div className="product-info-own">
                        <h5 className="result-count mb-0">Product Name</h5>
                        <div className="form-group">
                          <input
                            className="form-control mt-2"
                            type="text"
                            placeholder="Give a nice title"
                            style={{ backgroundColor: "white" }}
                          />
                        </div>
                      </div>
                      <div className="product-info-own">
                        <h5 className="result-count mb-0">
                          Product Description
                        </h5>
                        <div className="form-group">
                          <textarea
                            className="form-control mt-2"
                            type="text"
                            placeholder="Give a description"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="section-title">
                    <h2 className="d-block text-left-sm">Category</h2>

                    <div
                      className="heading justify-content-between mb-5"
                      style={{
                        border: "1px solid lightgrey",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <div className="product-info-own">
                        <h5 className="result-count mb-0">Select Category</h5>
                      </div>
                      <select
                        name="orderby"
                        className="orderby form-control mt-2"
                        aria-label="Shop order"
                      >
                        <option value="select Category" selected="selected">
                          select category
                        </option>
                        <option value="Image">Image</option>
                        <option value="Video">Video</option>
                        <option value="Audio">Audio</option>
                        <option value="GIF">GIF</option>
                        <option value="Documents">
                          Documents (.pdf, .xlxs, .pptx, etc. )
                        </option>
                      </select>
                      <input
                        type="file"
                        multiple
                        accept=".jpeg,.png,.jpg,.webp"
                        onInput={(e) => {
                          console.log(e.target.value);
                          console.log(typeof e.target.value);
                          setimage(e.target.value);
                        }}
                      />
                      <img src={image} />
                    </div>
                  </div>
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
      </div>
      <GoToTop />
    </div>
  );
}

export default AddProduct;
