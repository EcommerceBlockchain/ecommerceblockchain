import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  deleteDoc,
  orderBy,
  query,
  setDoc,
  where,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import UserContext from "../context/UserContext";
import userlogo from "../images/user.png";

import GoToTop from "../components/GoToTop";
import activity from "../images/activity.gif";
import { getAuth } from "firebase/auth";
import colors from "../colors";
import { object } from "yup";

function SingleProduct() {
  const userid = getAuth()?.currentUser?.uid;
  const { userdata } = useContext(UserContext);

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [ownerName, setOwnerName] = useState("");
  const [loader, setLoader] = useState(false);
  const [added, setAdded] = useState(false);
  const [timestamp, setTimestamp] = useState([]);
  const [rating, setRating] = useState(0);

  const [tag, setTags] = useState([]);

  const location = useLocation();
  const { id } = location.state;
  const navigate = useNavigate();

  const getProduct = async () => {
    setProduct({});
    console.log(id);
    const pro = await getDoc(doc(getFirestore(), "products", id));

    console.log(pro.data().owner, "yayyaya");
    const getOwner = await getDoc(
      doc(getFirestore(), "users", pro.data().owner)
    );
    setTimestamp(
      new Date(
        pro.data()?.timestamp?.seconds * 1000 +
          pro.data()?.timestamp?.nanoseconds / 1000000
      )
        .toDateString()
        .split(" ")
    );
    console.log(getOwner.data());
    setOwnerName(getOwner.data().username);
    console.log(pro.data());
    setProduct(pro.data());
    setImages(pro.data().preview_image);
    setTags(pro.data().tag);
  };

  const getRelatedProducts = async () => {
    setRelatedProducts([]);
    let relProd = [];
    let qu2 = query(
      collection(getFirestore(), "products"),
      where("is_active", "==", true)
    );
    const productsAll = await getDocs(qu2);
    productsAll.docs.forEach((product) => {
      relProd.push({ ...product.data(), id: product.id });
    });
    setRelatedProducts(relProd);
  };
  const getCart = async () => {
    setAdded(false);
    getDocs(query(collection(getFirestore(), "users", userid, "cart"))).then(
      (res) => {
        for (let index = 0; index < res.docs.length; index++) {
          const element = res.docs[index];
          if (element.data().id === id) {
            setAdded(true);
            break;
          } else {
            setAdded(false);
          }
        }
      }
    );
    setLoader(false);
  };
  const updateCart = (val) => {
    setLoader(true);

    if (val === "add") {
      setDoc(doc(getFirestore(), "users", userid, "cart", id), {
        name: product.name,
        cost: product.cost,
        preImg: product.preview_image[0],
        id: id,
        owner: product.owner,
      }).then(() => {
        console.log("product added");
        getCart();
      });
    } else {
      deleteDoc(doc(getFirestore(), "users", userid, "cart", id)).then(() => {
        console.log("delete done");
        getCart();
      });
    }
  };

  const addReview = () => {
    let comment = document.getElementById("comment");
    getDoc(doc(getFirestore(), "products", id)).then(async (res) => {
      setDoc(
        doc(getFirestore(), "products", id),
        {
          reviews: {
            ...res.data().reviews,
            [getAuth()?.currentUser?.uid]: {
              rating: rating,
              review: comment.value,
              timestamp: Timestamp.fromDate(new Date()),
              name: userdata?.name,
            },
          },
          rating: parseFloat(
            (
              (res.data().rating + rating) /
              (Object.keys(res.data().reviews).length === 0 ? 1 : 2)
            ).toFixed(1)
          ),
        },
        { merge: true }
      );
      setDoc(
        doc(getFirestore(), "users", getAuth()?.currentUser?.uid),
        {
          avg_rating:
            (userdata?.avg_rating +
              (res.data().rating + rating) /
                (Object.keys(res.data().reviews).length === 0 ? 1 : 2)) /
            (userdata?.avg_rating === 0 ? 1 : 2),
        },
        { merge: true }
      );
      comment.value = "";
      setRating(0);
    });
  };

  useEffect(() => {
    setAdded(false);
    getProduct();
    getRelatedProducts();
    getCart();
  }, []);

  if (!product) return <div></div>;

  return (
    <div className="single-product-container">
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">{product.name}</h1>
                <StarRatings
                  numberOfStars={5}
                  starEmptyColor="grey"
                  starHoverColor={colors.darkYellow}
                  starRatedColor={colors.darkYellow}
                  starDimension="30px"
                  starSpacing="5px"
                  rating={product?.rating}
                />
                <p>
                  {product?.description?.length > 150
                    ? product.description.slice(0, 150) + "..."
                    : product.description}
                </p>

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
                    <div className={"carousel-item active"}>
                      <img src={images?.[0]} alt="" className="img-fluid" />
                    </div>
                    {images.map((item, index) => {
                      return (
                        index !== 0 && (
                          <div className={"carousel-item"}>
                            <img src={item} alt="" className="img-fluid" />
                          </div>
                        )
                      );
                    })}
                  </div>

                  {images.length > 1 && (
                    <ol className="carousel-indicators">
                      <li
                        data-target="#single-product-slider"
                        data-slide-to={0}
                      >
                        <img
                          src={images?.[0]}
                          alt=""
                          className="img-fluid active"
                        />
                      </li>
                      {images.map((item, index) => {
                        return (
                          index !== 0 && (
                            <li
                              data-target="#single-product-slider"
                              data-slide-to={index}
                            >
                              <img src={item} alt="" className="img-fluid" />
                            </li>
                          )
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

                {loader ? (
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <img width={40} src={activity} alt="activity" />
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {userdata?.bought?.includes(id) ? (
                      <button
                        style={{
                          marginRight: "0.5rem",
                          marginLeft: "0.5rem",
                          backgroundColor: colors.green,
                          cursor: "not-allowed",
                        }}
                        type="button"
                        className="cart-btn"
                        disabled
                      >
                        Bought
                      </button>
                    ) : !added ? (
                      <button
                        style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}
                        type="button"
                        className="cart-btn"
                        onClick={() => {
                          if (userdata) {
                            updateCart("add");
                          } else {
                            navigate("/login");
                          }
                        }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        style={{
                          marginRight: "0.5rem",
                          marginLeft: "0.5rem",
                          backgroundColor: "crimson",
                        }}
                        type="button"
                        className="cart-btn"
                        onClick={() => {
                          updateCart("remove");
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                )}
                <div className="products-meta mt-4">
                  <div className="product-category d-flex align-items-center">
                    <span className="font-weight-bold text-capitalize">
                      Tags :
                    </span>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "1rem",
                        marginLeft: "1rem",
                      }}
                    >
                      {tag.length > 0
                        ? tag.map((item) => {
                            return (
                              <Link to={"/search"} state={{ tag: item }}>
                                <div
                                  style={{
                                    backgroundColor: "lightgrey",
                                    padding: "0.25rem 0.5rem",
                                    borderRadius: "0.5rem",
                                  }}
                                >
                                  {item}
                                </div>
                              </Link>
                            );
                          })
                        : "No Tags"}
                    </div>
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
                    Reviews(
                    {product?.reviews
                      ? Object.keys(product?.reviews ? product?.reviews : {})
                          .length
                      : 0}
                    )
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
                        <Link
                          to={
                            product?.owner === getAuth()?.currentUser?.uid
                              ? "/profile"
                              : "/userprofile"
                          }
                          state={product.owner}
                        >
                          {ownerName}
                        </Link>
                      </span>
                    </li>
                    <li className="d-flex">
                      <strong>Type</strong>
                      <span>{product?.extension}</span>
                    </li>

                    <li className="d-flex">
                      <strong>Size</strong>
                      <span>
                        {product?.fileSize
                          ? (product?.fileSize / 1024 / 1024).toFixed(2)
                          : ""}{" "}
                        MB
                      </span>
                    </li>
                    <li className="d-flex">
                      <strong>Date</strong>
                      <span>
                        {timestamp[2] + " " + timestamp[1] + " " + timestamp[3]}
                      </span>
                    </li>
                  </ul>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-contact"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab"
                >
                  <div
                    className="row"
                    style={{ justifyContent: "space-between" }}
                  >
                    {Object.keys(product?.reviews ? product?.reviews : {})
                      .length === 0 ? (
                      <p className="col-lg-6" style={{ textAlign: "center" }}>
                        No reviews yet
                      </p>
                    ) : (
                      <div
                        className="col-lg-6"
                        style={{
                          overflowY: "auto",
                          maxHeight: "500px",
                        }}
                      >
                        {Object.keys(product?.reviews).map((item) => {
                          return (
                            <div
                              className="media review-block mb-4 p-3"
                              style={{
                                borderRadius: "1rem",
                                boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
                                border: "1px solid lightgrey",
                              }}
                            >
                              <div className="media-body">
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "2rem",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src={userlogo}
                                    alt="reviewimg"
                                    className="img-fluid"
                                    style={{ width: "60px" }}
                                  />
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      paddingTop: "15px",
                                    }}
                                  >
                                    <h6>{product?.reviews?.[item]?.name}</h6>
                                    <div
                                      className="product-review"
                                      style={{ position: "relative", top: -15 }}
                                    >
                                      <StarRatings
                                        numberOfStars={5}
                                        starEmptyColor="grey"
                                        starHoverColor={colors.darkYellow}
                                        starRatedColor={colors.darkYellow}
                                        starDimension="15px"
                                        starSpacing="1px"
                                        rating={
                                          product?.reviews?.[item]?.rating
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <p style={{ paddingLeft: "92px" }}>
                                    {product?.reviews?.[item]?.review}
                                  </p>
                                  <p
                                    style={{ textAlign: "right" }}
                                    className="text-sm text-muted font-weight-normal ml-3"
                                  >
                                    {new Date(
                                      product?.reviews?.[item]?.timestamp
                                        ?.seconds *
                                        1000 +
                                        product?.reviews?.[item]?.timestamp
                                          ?.nanoseconds /
                                          1000000
                                    ).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {getAuth()?.currentUser?.uid !== product?.owner && (
                      <div className="col-lg-5">
                        <div className="review-comment mt-5 mt-lg-0">
                          <h4 className="mb-3">Add a Review</h4>

                          <div className="starrr"></div>

                          <div className="form-group">
                            <textarea
                              name="comment"
                              id="comment"
                              className="form-control"
                              cols="30"
                              rows="4"
                              placeholder="Your Review"
                            ></textarea>
                            <StarRatings
                              numberOfStars={5}
                              starEmptyColor="grey"
                              starHoverColor={colors.darkYellow}
                              starRatedColor={colors.darkYellow}
                              starDimension="20px"
                              starSpacing="5px"
                              rating={rating}
                              changeRating={setRating}
                            />
                          </div>

                          <a
                            className="btn btn-main btn-small"
                            onClick={addReview}
                          >
                            Submit Review
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
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
export default SingleProduct;
