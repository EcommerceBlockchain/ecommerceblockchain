import React, { useState } from "react";
import GoToTop from "../components/GoToTop";
import { Link } from "react-router-dom";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { TagsInput } from "react-tag-input-component";

function AddProduct() {
  const [images, setimages] = useState([]);
  const [tags, setTags] = useState([]);
  const [originalProduct, setOriginalProduct] = useState("");
  const [originalProductName, setOriginalProductName] = useState("");
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
                    </div>
                  </div>
                  <div className="section-title">
                    <h2 className="d-block text-left-sm">Preview Images</h2>

                    <div
                      className="heading justify-content-between mb-2"
                      style={{
                        border: "1px solid lightgrey",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <div className="product-info-own">
                        <h5 className="result-count mb-2">Add Images</h5>
                      </div>

                      <input
                        type="file"
                        multiple
                        accept=".jpeg,.png,.jpg,.webp"
                        onChange={(e) => {
                          console.log(e.target.files);
                          Array.from(e.target.files).forEach((item) => {
                            setimages((prev) => [
                              ...prev,
                              URL.createObjectURL(item),
                            ]);
                          });
                        }}
                        name="uploadfile"
                        id="img"
                        style={{ display: "none" }}
                      />

                      <div className="row">
                        {images.map((item, index) => {
                          console.log(item);
                          return (
                            <div
                              className="col-lg-3 col-12 col-md-6 col-sm-6 mb-2"
                              style={{ position: "relative" }}
                            >
                              <img
                                src={item}
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  objectFit: "contain",
                                  padding: "5px",
                                  margin: "5px 0",
                                  border: "1px solid lightgrey",
                                  borderRadius: "10px",
                                }}
                                alt="preview img"
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  top: "-0.5rem",
                                  left: "150px",
                                  backgroundColor: "lightgrey",
                                  height: "30px",
                                  width: "30px",
                                  borderRadius: "50%",
                                  padding: "10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setimages(
                                    images.filter((item, ind) => {
                                      return ind !== index;
                                    })
                                  );
                                }}
                              >
                                <i className="tf-ion-close"></i>
                              </div>
                            </div>
                          );
                        })}
                        <div className="col-lg-3 col-12 col-md-6 col-sm-6 mb-2">
                          <label for="img">
                            <div
                              style={{
                                cursor: "pointer",
                                width: "150px",
                                height: "150px",
                                border: "1px solid lightgrey",
                                borderRadius: "10px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src="https://static.thenounproject.com/png/3752804-200.png"
                                style={{
                                  objectFit: "contain",
                                  width: "30px",
                                  height: "30px",
                                  marginTop: "20px",
                                }}
                                alt="plus-image"
                              />
                              <p>Add Image</p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <section className="widget widget-sizes mb-5">
                <h2 className="d-block text-left-sm">Tags</h2>
                <div
                  className="heading justify-content-between mb-5"
                  style={{
                    border: "1px solid lightgrey",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <div className="product-info-own">
                    <h5 className="result-count mb-2">Tags you have added</h5>
                  </div>
                  {tags.length === 0 ? (
                    <p>No tag found.</p>
                  ) : (
                    <pre>{JSON.stringify(tags)}</pre>
                  )}
                  <TagsInput
                    classNames={{ input: "form-control-tag", tag: "form-tag" }}
                    value={tags}
                    onChange={setTags}
                    name="fruits"
                    placeHolder="Enter tag here"
                  />
                  <em>Press enter add new tag</em>
                </div>
              </section>
              <section className="widget widget-sizes mb-5">
                <h2 className="d-block text-left-sm">Original Product</h2>
                <div
                  className="heading justify-content-between mb-5"
                  style={{
                    border: "1px solid lightgrey",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <div className="product-info-own">
                    <h5 className="result-count mb-2">Add your file</h5>
                  </div>
                  <input
                    disabled={originalProduct ? true : false}
                    type="file"
                    onChange={(e) => {
                      console.log(e.target.files);
                      setOriginalProductName(e.target.files[0].name);
                      setOriginalProduct(
                        URL.createObjectURL(e.target.files[0])
                      );
                    }}
                    name="uploadfile"
                    id="img-2"
                    style={{ display: "none" }}
                  />
                  <div style={{ position: "relative" }}>
                    <label for="img-2">
                      <div
                        style={{
                          cursor: "pointer",
                          width: "150px",
                          height: "150px",
                          border: "1px solid lightgrey",
                          borderRadius: "10px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={
                            !originalProduct
                              ? "https://cdn-icons-png.flaticon.com/512/1091/1091916.png"
                              : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png"
                          }
                          style={{
                            objectFit: "contain",
                            width: "30px",
                            height: "30px",
                            marginTop: "20px",
                          }}
                          alt="plus-image"
                        />

                        {!originalProduct && <p>Add File</p>}
                      </div>
                    </label>
                    {originalProduct && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-15px",
                          left: "135px",
                          backgroundColor: "lightgrey",
                          height: "30px",
                          width: "30px",
                          borderRadius: "50%",
                          padding: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setOriginalProduct("");
                          setOriginalProductName("");
                        }}
                      >
                        <i className="tf-ion-close"></i>
                      </div>
                    )}
                  </div>
                  <p>{originalProductName}</p>
                </div>
              </section>
              <section className="widget widget-sizes mb-5">
                <h2 className="d-block text-left-sm">Price</h2>
                <div
                  className="heading justify-content-between mb-5"
                  style={{
                    border: "1px solid lightgrey",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <div className="product-info-own">
                    <h5 className="result-count mb-2">
                      Product Price (in Eth){" "}
                    </h5>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    style={{ backgroundColor: "white" }}
                  />
                </div>
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
