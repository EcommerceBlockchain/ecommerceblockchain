import React, { useContext, useEffect, useState } from "react";
import GoToTop from "../components/GoToTop";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  getFirestore,
  collection,
  Timestamp,
} from "firebase/firestore";
import { TagsInput } from "react-tag-input-component";
import { description, name, price } from "../config/validationSchema";
import * as Yup from "yup";
import { Formik } from "formik";
import colors from "../colors";
import getUsernameByEmail from "../service/getUsernameByEmail";
import UserContext from "../context/UserContext";

function AddProduct() {
  const { user } = useContext(UserContext);
  const [images, setimages] = useState([]);
  const [tags, setTags] = useState([]);
  const [originalProductUrl, setOriginalProductUrl] = useState("");
  const [originalProductFileName, setOriginalProductFileName] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [formSub, setFormSub] = useState(false);
  const [ogfile, setogfile] = useState(false);
  const navigate = useNavigate();
  const validation = Yup.object().shape({
    productName: name,
    productDescription: description,
    price: price,
  });

  const onPress = async (values) => {
    setFormSub(true);
    if (
      originalProductUrl &&
      originalProductFileName &&
      category !== "Select Category" &&
      images.length
    ) {
      let preImgArr = [];
      const storage = getStorage();
      images.forEach((item) => {
        const storageRef = ref(storage, `preview_images/${item.name}`);
        fetch(item.url)
          .then((res) => {
            return res.blob();
          })
          .then((blob) => {
            uploadBytes(storageRef, blob).then((snapshot) => {
              console.log("Uploaded a blob or file!", snapshot.ref.fullPath);
              const pathReference = ref(storage, snapshot.ref.fullPath);
              getDownloadURL(pathReference).then((url) => {
                console.log(url);
                preImgArr.push(url);
              });
            });
          })
          .catch((error) => {
            console.error(error);
          });
      });
      await fetch(originalProductUrl)
        .then((res) => {
          return res.blob();
        })
        .then((blob) => {
          const storageRef = ref(
            storage,
            `original_files/${originalProductFileName}`
          );
          uploadBytes(storageRef, blob).then((snapshot) => {
            console.log("Uploaded a blob or file!", snapshot.ref.fullPath);
            const pathReference = ref(storage, snapshot.ref.fullPath);
            getDownloadURL(pathReference).then(async (url) => {
              await addDoc(collection(getFirestore(), "products"), {
                category: category,
                cost: parseFloat(values.price),
                description: values.productDescription,
                file: url,
                is_active: true,
                name: values.productName,
                preview_image: preImgArr,
                reviews: [],
                tag: tags,
                timestamp: Timestamp.fromDate(new Date()),
                owner: await getUsernameByEmail(user.email),
              }).then(() => {
                console.log("done");
                navigate("/", { replace: true });
              });
            });
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="checkout-container">
      <section className="page-header">
        <div className="content text-center">
          <h1 className="mb-3">Add Product</h1>
        </div>
      </section>
      <div className="section">
        <Formik
          initialValues={{
            productName: "",
            productDescription: "",
            price: 0,
          }}
          validationSchema={validation}
          onSubmit={(values) => {
            onPress(values);
          }}
        >
          {({ errors, touched, handleChange, handleSubmit, values }) => (
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
                                placeholder="Give a nice name"
                                style={{
                                  backgroundColor: "white",
                                  borderColor:
                                    errors.productName && touched.productName
                                      ? colors.red
                                      : colors.primaryBlue,
                                }}
                                value={values.productName}
                                onChange={handleChange("productName")}
                              />
                              {errors.productName && touched.productName && (
                                <p
                                  style={{
                                    fontSize: 14,
                                    marginBottom: "10px",
                                    color: colors.red,
                                  }}
                                >
                                  {errors.productName}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="product-info-own">
                            <h5 className="result-count mb-0">
                              Product Description
                            </h5>
                            <div className="form-group">
                              <textarea
                                style={{
                                  borderColor:
                                    errors.productDescription &&
                                    touched.productDescription
                                      ? colors.red
                                      : colors.primaryBlue,
                                }}
                                className="form-control mt-2"
                                type="text"
                                placeholder="Give a description"
                                value={values.productDescription}
                                onChange={handleChange("productDescription")}
                              />
                              {errors.productDescription &&
                                touched.productDescription && (
                                  <p
                                    style={{
                                      fontSize: 14,
                                      marginBottom: "10px",
                                      color: colors.red,
                                    }}
                                  >
                                    {errors.productDescription}
                                  </p>
                                )}
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
                            <h5 className="result-count mb-0">
                              Select Category
                            </h5>
                          </div>
                          <select
                            style={{ borderColor: colors.primaryBlue }}
                            name="orderby"
                            className="orderby form-control mt-2"
                            aria-label="Shop order"
                            defaultValue={"Select Category"}
                            onChange={(e) => {
                              setCategory(e.target.value);
                            }}
                          >
                            <option value="Select Category">
                              Select Category
                            </option>
                            <option value="Image">Image</option>
                            <option value="Video">Video</option>
                            <option value="Audio">Audio</option>
                            <option value="GIF">GIF</option>
                            <option value="Documents">
                              Documents (.pdf, .xlxs, .pptx, etc. )
                            </option>
                          </select>
                          {formSub && category === "Select Category" && (
                            <p
                              style={{
                                fontSize: 14,
                                marginBottom: "10px",
                                color: colors.red,
                              }}
                            >
                              Please select category
                            </p>
                          )}
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
                                  {
                                    name: item.name,
                                    url: URL.createObjectURL(item),
                                  },
                                ]);
                              });
                            }}
                            name="uploadfile"
                            id="img"
                            style={{ display: "none" }}
                          />

                          <div className="row">
                            {images.map((item, index) => {
                              return (
                                <div
                                  className="col-lg-3 col-12 col-md-6 col-sm-6 mb-2"
                                  style={{ position: "relative" }}
                                >
                                  <img
                                    src={item.url}
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
                              {formSub && images.length === 0 && (
                                <p
                                  style={{
                                    fontSize: 14,
                                    marginBottom: "10px",
                                    color: colors.red,
                                  }}
                                >
                                  Please add atleast one image
                                </p>
                              )}
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
                        <h5 className="result-count mb-2">
                          Tags you have added
                        </h5>
                      </div>
                      {tags.length === 0 ? (
                        <p>No tag found.</p>
                      ) : (
                        <pre>{JSON.stringify(tags)}</pre>
                      )}
                      <TagsInput
                        classNames={{
                          input: "form-control-tag",
                          tag: "form-tag",
                        }}
                        value={tags}
                        onChange={setTags}
                        name="fruits"
                        placeHolder="Enter tag here"
                      />
                      <em>Press enter to add new tag</em>
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
                      {category === "Image" && (
                        <input
                          disabled={originalProductUrl ? true : false}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            setogfile(true);
                            console.log(e.target.files);
                            setOriginalProductFileName(e.target.files[0].name);
                            setOriginalProductUrl(
                              URL.createObjectURL(e.target.files[0])
                            );
                          }}
                          name="uploadfile"
                          id="img-2"
                          style={{ display: "none" }}
                        />
                      )}
                      {category === "Video" && (
                        <input
                          disabled={originalProductUrl ? true : false}
                          type="file"
                          accept="video/*"
                          onChange={(e) => {
                            setogfile(true);
                            console.log(e.target.files);
                            setOriginalProductFileName(e.target.files[0].name);
                            setOriginalProductUrl(
                              URL.createObjectURL(e.target.files[0])
                            );
                          }}
                          name="uploadfile"
                          id="img-2"
                          style={{ display: "none" }}
                        />
                      )}
                      {category === "Audio" && (
                        <input
                          disabled={originalProductUrl ? true : false}
                          type="file"
                          accept=".MPEG,.MP3,.FLAC,.WAV,.WMA,.AAC"
                          onChange={(e) => {
                            setogfile(true);
                            console.log(e.target.files);
                            setOriginalProductFileName(e.target.files[0].name);
                            setOriginalProductUrl(
                              URL.createObjectURL(e.target.files[0])
                            );
                          }}
                          name="uploadfile"
                          id="img-2"
                          style={{ display: "none" }}
                        />
                      )}
                      {category === "GIF" && (
                        <input
                          disabled={originalProductUrl ? true : false}
                          type="file"
                          accept=".gif"
                          onChange={(e) => {
                            setogfile(true);
                            console.log(e.target.files);
                            setOriginalProductFileName(e.target.files[0].name);
                            setOriginalProductUrl(
                              URL.createObjectURL(e.target.files[0])
                            );
                          }}
                          name="uploadfile"
                          id="img-2"
                          style={{ display: "none" }}
                        />
                      )}
                      {category === "Documents" && (
                        <input
                          disabled={originalProductUrl ? true : false}
                          type="file"
                          accept=".doc,.docm,.docx,.dot,.dotm,.dotx,.htm,.html,.mht,.mhtml,.odt,.pdf,.rtf,.txt,.wps,.xml,.xps,.xlsx,.csv,.xls,.pptx,.ppt"
                          onChange={(e) => {
                            setogfile(true);
                            console.log(e.target.files);
                            setOriginalProductFileName(e.target.files[0].name);
                            setOriginalProductUrl(
                              URL.createObjectURL(e.target.files[0])
                            );
                          }}
                          name="uploadfile"
                          id="img-2"
                          style={{ display: "none" }}
                        />
                      )}
                      <div style={{ position: "relative" }}>
                        <label for="img-2">
                          <div
                            onClick={() => {
                              setogfile(true);
                            }}
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
                                !originalProductUrl
                                  ? "https://cdn-icons-png.flaticon.com/512/1091/1091916.png"
                                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png"
                              }
                              style={{
                                objectFit: "contain",
                                width: "30px",
                                height: "30px",
                                marginTop: "20px",
                              }}
                              alt="plus"
                            />

                            {!originalProductUrl && <p>Add File</p>}
                          </div>
                        </label>
                        {!originalProductUrl && formSub && (
                          <p
                            style={{
                              fontSize: 14,
                              marginBottom: "10px",
                              color: colors.red,
                            }}
                          >
                            Please add product
                          </p>
                        )}
                        {category === "Select Category" && ogfile && (
                          <p
                            style={{
                              fontSize: 14,
                              marginBottom: "10px",
                              color: colors.red,
                            }}
                          >
                            Please select category
                          </p>
                        )}
                        {originalProductUrl && (
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
                              setOriginalProductUrl("");
                              setOriginalProductFileName("");
                            }}
                          >
                            <i className="tf-ion-close"></i>
                          </div>
                        )}
                      </div>
                      <p>{originalProductFileName}</p>
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
                        <p>
                          We will charge 20% percent from your selling price.
                        </p>
                      </div>
                      <input
                        placeholder="Enter price here"
                        type="text"
                        className="form-control"
                        style={{
                          backgroundColor: "white",
                          border:
                            errors.price && touched.price
                              ? `1px solid ${colors.red}`
                              : `1px solid ${colors.primaryBlue}`,
                        }}
                        value={values.price}
                        onChange={handleChange("price")}
                      />
                      {errors.price && touched.price && (
                        <p
                          style={{
                            fontSize: 14,
                            marginBottom: "10px",
                            color: colors.red,
                          }}
                        >
                          {errors.price}
                        </p>
                      )}
                    </div>
                  </section>
                  <button
                    onClick={() => {
                      <GoToTop />;
                      handleSubmit();
                    }}
                    className="btn btn-main btn-small mt-3"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          )}
        </Formik>
      </div>
      <GoToTop />
    </div>
  );
}

export default AddProduct;
