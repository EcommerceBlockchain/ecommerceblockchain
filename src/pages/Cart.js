import { Link } from "react-router-dom";
import GoToTop from "../components/GoToTop";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";
import activity from "../images/activity.gif";

function Cart() {
  const navigate = useNavigate();
  // products:[{productid:id,quan:quan,price:price,preimg:preimg,name:name}],
  const { username, user } = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(-1);
  const [products, setProducts] = useState([]);
  const getCart = async () => {
    let cart = [];
    const product = await getDocs(
      query(collection(getFirestore(), "users", username, "cart"))
    );
    product.forEach((item) => {
      cart.push({ ...item.data(), id: item.id });
    });
    console.log(cart);
    setProducts(cart);
  };

  useEffect(() => {
    setProducts([]);
    getCart();
  }, []);

  return (
    <div className="checkout-container">
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">Cart</h1>
                <p>
                  Our shopping cart is powered by blockchain technology,
                  providing you with a secure and transparent shopping
                  experience. This ensures that your cart remains secure and
                  that your items are always available for purchase.
                </p>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to={{ pathname: "/" }}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Cart
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cart shopping page-wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="product-list">
                <form className="cart-form">
                  <table
                    className="table shop_table shop_table_responsive cart"
                    cellspacing="0"
                  >
                    <thead>
                      <tr>
                        <th className="product-thumbnail"> </th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-subtotal">Total</th>
                        <th className="product-remove"> </th>
                      </tr>
                    </thead>

                    <tbody>
                      {products.map((item, index) => {
                        return (
                          <tr className="cart_item">
                            <td
                              className="product-thumbnail"
                              data-title="Thumbnail"
                            >
                              <Link
                                to={"/single-product"}
                                state={{ id: item.id }}
                              >
                                <img
                                  src={item.preImg}
                                  className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail img-fluid"
                                  alt={item.name}
                                />
                              </Link>
                            </td>

                            <td className="product-name" data-title="Product">
                              <Link
                                to={"/single-product"}
                                state={{ id: item.id }}
                              >
                                {item.productName}
                              </Link>
                            </td>

                            <td className="product-price" data-title="Price">
                              {item.price} Eth
                            </td>
                            <td
                              className="product-quantity"
                              data-title="Quantity"
                            >
                              <div className="quantity">{item.quantity}</div>
                            </td>
                            <td className="product-subtotal" data-title="Total">
                              {item.price * item.quantity} Eth
                            </td>
                            <td
                              style={{ cursor: "pointer", fontSize: "1.5rem" }}
                              onClick={() => {
                                setLoader(index);
                                deleteDoc(
                                  doc(
                                    getFirestore(),
                                    "users",
                                    username,
                                    "cart",
                                    item.id
                                  )
                                ).then(() => {
                                  setLoader(-1);
                                  console.log("delete done");
                                  getCart();
                                });
                              }}
                            >
                              {loader === products.indexOf(item) ? (
                                <img width={15} src={activity} alt="activity" />
                              ) : (
                                "×"
                              )}
                            </td>
                          </tr>
                        );
                      })}

                      <tr>
                        <td colspan="6" className="actions">
                          <div className="coupon">
                            <span className="float-right mt-3 mt-lg-0">
                              <button
                                type="button"
                                className="btn btn-dark btn-small"
                                name="update_cart"
                                value="Update cart"
                              >
                                Update cart
                              </button>
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
          <div className="row justify-content-end">
            <div className="col-lg-4">
              <div className="cart-info card p-4 mt-4">
                <h4 className="mb-4">Cart totals</h4>
                <ul className="list-unstyled mb-4">
                  <li className="d-flex justify-content-between pb-2 mb-3">
                    <h5>Subtotal</h5>
                    <span>0.000235 Eth</span>
                  </li>
                  <li className="d-flex justify-content-between pb-2 mb-3">
                    <h5>Token Used</h5>
                    <span>0</span>
                  </li>
                  <li className="d-flex justify-content-between pb-2">
                    <h5>Total</h5>
                    <span>0.000235 Eth</span>
                  </li>
                </ul>
                <a href="#" className="btn btn-main btn-small">
                  Proceed to checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GoToTop />
    </div>
  );
}
export default Cart;
