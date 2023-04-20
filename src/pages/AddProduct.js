import React, { useContext, useEffect, useState } from "react";
import GoToTop from "../components/GoToTop";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  getFirestore,
  collection,
  Timestamp,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { TagsInput } from "react-tag-input-component";
import { description, name, price } from "../config/validationSchema";
import * as Yup from "yup";
import { Formik } from "formik";
import colors from "../colors";
import UserContext from "../context/UserContext";
import UploadFile from "../service/UploadFile";
import { ethers } from "ethers";
import smartConracts from "../blockchain/smartContracts";
import addproductabi from "../blockchain/abis/addProduct.json";
import { getAuth } from "firebase/auth";
import activity from "../images/activity.gif";

function AddProduct() {
  const location = useLocation();
  console.log("addproduct", location.state);
  const { userdata } = useContext(UserContext);
  const [images, setimages] = useState(
    location.state ? location.state.preview_image : []
  );
  const [tags, setTags] = useState(location.state ? location.state.tag : []);
  const [originalProductFileName, setOriginalProductFileName] = useState(
    location.state ? location.state.name : ""
  );
  const [file, setFile] = useState(null);
  const [fileSize, setFileSize] = useState(0);
  const [extension, setExtension] = useState("");
  const [category, setCategory] = useState(
    location.state ? location.state.category : "Select Category"
  );
  const [formSub, setFormSub] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ogfile, setogfile] = useState(location.state ? true : false);
  const navigate = useNavigate();
  const validation = Yup.object().shape({
    productName: name,
    productDescription: description,
    price: price,
  });

  const uid = getAuth().currentUser.uid;

  const editproduct = async (values) => {
    setFormSub(true);
    if (images.length !== 0) {
      setLoading(true);
      console.log("heelo in edit");

      let preImgArr = [];
      const storage = getStorage();

      let counter = 0;

      const storeimage = (counter, preImages) => {
        console.log(
          values.price,
          values.productDescription,
          values.productName,
          preImages,
          tags
        );
        if (counter == images.length) {
          console.log(preImages);
          setDoc(
            doc(getFirestore(), "products", location.state.id),
            {
              cost: parseFloat(values.price),
              description: values.productDescription,
              name: values.productName,
              preview_image: preImages,
              tag: tags,
              timestamp: Timestamp.fromDate(new Date()),
            },
            { merge: true }
          ).then(() => {
            console.log("edit succesful");
            navigate("/profile", { state: 2 });
          });
        } else {
          const storageRef = ref(
            storage,
            `preview_images/${images[counter].name}`
          );
          if (images[counter]?.url) {
            fetch(images[counter].url)
              .then((res) => {
                return res.blob();
              })
              .then((blob) => {
                uploadBytes(storageRef, blob).then((snapshot) => {
                  console.log(
                    "Uploaded a blob or file!",
                    snapshot.ref.fullPath
                  );
                  const pathReference = ref(storage, snapshot.ref.fullPath);
                  getDownloadURL(pathReference)
                    .then((url) => {
                      console.log(url);
                      preImages.push(url);
                      console.log("images array", preImages);
                    })
                    .then(() => {
                      counter += 1;
                      storeimage(counter, preImages);
                    });
                });
              })
              .catch((error) => {
                setLoading(false);
                console.error(error);
              });
          } else {
            preImages.push(images[counter]);
            counter += 1;
            storeimage(counter, preImages);
          }
        }
      };

      storeimage(counter, preImgArr);
    }
  };

  const addproduct = async (values) => {
    setFormSub(true);
    if (
      originalProductFileName &&
      category !== "Select Category" &&
      images.length !== 0
    ) {
      setLoading(true);
      console.log("heelo in onpress");
      UploadFile(file)
        .then((path) => {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner(userdata.activeAddress);
          const smcon = new ethers.Contract(
            smartConracts.addProduct,
            addproductabi,
            provider
          );
          const signContact = smcon.connect(signer);

          addDoc(collection(getFirestore(), "products"), {}).then(
            (response) => {
              signContact
                .setPath(response.id, path)
                .then(async (res) => {
                  console.log("addproduct res", await res.wait());
                  let preImgArr = [];
                  const storage = getStorage();

                  let counter = 0;

                  const storeimage = (counter, preImages) => {
                    if (counter == images.length) {
                      console.log(preImages);
                      setDoc(
                        doc(getFirestore(), "products", response.id),
                        {
                          category: category,
                          cost: parseFloat(values.price),
                          description: values.productDescription,
                          is_active: true,
                          name: values.productName,
                          preview_image: preImages,
                          reviews: {},
                          tag: tags,
                          timestamp: Timestamp.fromDate(new Date()),
                          owner: uid,
                          rating: 0,
                          quantity_sold: 0,
                          fileSize: fileSize,
                          extension: extension,
                        },
                        { merge: true }
                      ).then((document) => {
                        getDoc(doc(getFirestore(), "users", uid)).then(
                          (userdoc) => {
                            setDoc(
                              doc(getFirestore(), "users", uid),
                              {
                                ...userdoc.data(),
                                products: [
                                  ...userdoc.data().products,
                                  response.id,
                                ],
                              },
                              { merge: true }
                            ).then(() => {
                              console.log("done updation");
                            });
                          }
                        );

                        navigate("/profile", { state: 2 });
                      });
                    } else {
                      const storageRef = ref(
                        storage,
                        `preview_images/${images[counter].name}`
                      );
                      fetch(images[counter].url)
                        .then((res) => {
                          return res.blob();
                        })
                        .then((blob) => {
                          uploadBytes(storageRef, blob).then((snapshot) => {
                            console.log(
                              "Uploaded a blob or file!",
                              snapshot.ref.fullPath
                            );
                            const pathReference = ref(
                              storage,
                              snapshot.ref.fullPath
                            );
                            getDownloadURL(pathReference)
                              .then((url) => {
                                console.log(url);
                                preImages.push(url);
                                console.log("images array", preImages);
                              })
                              .then(() => {
                                counter += 1;
                                storeimage(counter, preImages);
                              });
                          });
                        })
                        .catch((error) => {
                          setLoading(false);
                          console.error(error);
                        });
                    }
                  };

                  storeimage(counter, preImgArr);
                })
                .catch(() => {
                  setLoading(false);
                  deleteDoc(doc(getFirestore(), "products", response.id));
                });
            }
          );
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <div className="checkout-container">
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">
                  {location.state ? "Edit Product" : "Add Product"}
                </h1>
                <p>
                  Adding a new product to our ecommerce website powered by
                  blockchain technology is a breeze. Simply log in to your
                  account, enter the product details and images, set the price
                  and category, and you're all set. Our platform ensures that
                  all transactions are secure and transparent, giving you and
                  your customers peace of mind while shopping with us.
                </p>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to={{ pathname: "/" }}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Add Product
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="section">
        <Formik
          initialValues={{
            productName: location.state ? location.state.name : "",
            productDescription: location.state
              ? location.state.description
              : "",
            price: location.state ? location.state.cost : 0,
          }}
          validationSchema={validation}
          onSubmit={(values) => {
            location.state ? editproduct(values) : addproduct(values);
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
                      {!location.state && (
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
                              defaultValue={category}
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
                      )}
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
                            accept=".jpeg,.png,.jpg,.webp,.gif"
                            onChange={(e) => {
                              console.log(e.target.files);
                              Array.from(e.target.files).forEach((item) => {
                                console.log("type", item.type);
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
                                    src={item?.url ? item.url : item}
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
                  {!location.state && (
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
                            disabled={originalProductFileName ? true : false}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              setogfile(true);
                              setFile(e.target.files[0]);
                              console.log(e.target.files);
                              setOriginalProductFileName(
                                e.target.files[0].name
                              );
                              setFileSize(e.target.files[0].size);
                              setExtension(
                                e.target.files[0].type.split("/")[1]
                              );
                            }}
                            name="uploadfile"
                            id="img-2"
                            style={{ display: "none" }}
                          />
                        )}
                        {category === "Video" && (
                          <input
                            disabled={originalProductFileName ? true : false}
                            type="file"
                            accept="video/*"
                            onChange={(e) => {
                              setogfile(true);
                              setFile(e.target.files[0]);

                              console.log(e.target.files);
                              setOriginalProductFileName(
                                e.target.files[0].name
                              );
                              setFileSize(e.target.files[0].size);
                              setExtension(
                                e.target.files[0].type.split("/")[1]
                              );
                            }}
                            name="uploadfile"
                            id="img-2"
                            style={{ display: "none" }}
                          />
                        )}
                        {category === "Audio" && (
                          <input
                            disabled={originalProductFileName ? true : false}
                            type="file"
                            accept=".MPEG,.MP3,.FLAC,.WAV,.WMA,.AAC"
                            onChange={(e) => {
                              setogfile(true);
                              setFile(e.target.files[0]);

                              console.log(e.target.files);
                              setOriginalProductFileName(
                                e.target.files[0].name
                              );
                              setFileSize(e.target.files[0].size);
                              setExtension(
                                e.target.files[0].type.split("/")[1]
                              );
                            }}
                            name="uploadfile"
                            id="img-2"
                            style={{ display: "none" }}
                          />
                        )}
                        {category === "GIF" && (
                          <input
                            disabled={originalProductFileName ? true : false}
                            type="file"
                            accept=".gif"
                            onChange={(e) => {
                              setogfile(true);
                              setFile(e.target.files[0]);

                              console.log(e.target.files);
                              setOriginalProductFileName(
                                e.target.files[0].name
                              );
                              setFileSize(e.target.files[0].size);
                              setExtension(
                                e.target.files[0].type.split("/")[1]
                              );
                            }}
                            name="uploadfile"
                            id="img-2"
                            style={{ display: "none" }}
                          />
                        )}
                        {category === "Documents" && (
                          <input
                            disabled={originalProductFileName ? true : false}
                            type="file"
                            accept=".doc,.docm,.docx,.dot,.dotm,.dotx,.htm,.html,.mht,.mhtml,.odt,.pdf,.rtf,.txt,.wps,.xml,.xps,.xlsx,.csv,.xls,.pptx,.ppt"
                            onChange={(e) => {
                              setogfile(true);
                              setFile(e.target.files[0]);

                              console.log(e.target.files);
                              setOriginalProductFileName(
                                e.target.files[0].name
                              );
                              setFileSize(e.target.files[0].size);
                              setExtension(
                                e.target.files[0].type.split("/")[1]
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
                                  !originalProductFileName
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

                              {!originalProductFileName && <p>Add File</p>}
                            </div>
                          </label>
                          {!originalProductFileName && formSub && (
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
                          {originalProductFileName && (
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
                                setOriginalProductFileName("");
                                setFileSize(0);
                                setExtension("");
                              }}
                            >
                              <i className="tf-ion-close"></i>
                            </div>
                          )}
                        </div>
                        <p>{originalProductFileName}</p>
                      </div>
                    </section>
                  )}
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
                        maxLength={11}
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {loading ? (
                      <img width={30} src={activity} alt="activity" />
                    ) : (
                      <button
                        onClick={() => {
                          <GoToTop />;
                          handleSubmit();
                        }}
                        className="btn btn-main btn-small mt-3"
                      >
                        {location.state ? "Update" : "Add Product"}
                      </button>
                    )}
                  </div>
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
