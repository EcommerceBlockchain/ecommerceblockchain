import { Link } from "react-router-dom";
import GoToTop from "../components/GoToTop";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import * as LottiePlayer from "@lottiefiles/lottie-player";

import {
  Timestamp,
  addDoc,
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
import { getAuth } from "firebase/auth";
import { ethers } from "ethers";
import smartContracts from "../blockchain/smartContracts";
import ethtransferabi from "../blockchain/abis/ethTransfer.json";

function Cart() {
  const navigate = useNavigate();
  const { userdata } = useContext(UserContext);
  const [subTotal, setSubTotal] = useState(0);
  const [loader, setLoader] = useState(-1);
  const [products, setProducts] = useState([]);
  const [productOwners, setProductsOwners] = useState([]);
  const [OwnersWithPrice, setOwnersWithPrice] = useState({});
  const [loading, setLoading] = useState(false);
  const [productIds, setProductIds] = useState([]);

  const uid = getAuth().currentUser.uid;

  const getCart = async () => {
    setProductIds([]);
    let pro = {};
    let sum = 0;
    setProductsOwners([]);
    let cart = [];

    getDocs(query(collection(getFirestore(), "users", uid, "cart")))
      .then((res) => {
        res.docs.forEach((item) => {
          setProductIds((prev) => [...prev, item.id]);
          console.log(item.data());
          cart.push(item.data());
          sum += item.data().cost;

          getDoc(doc(getFirestore(), "users", item.data().owner)).then(
            (res) => {
              pro[res.data().walletAddress] =
                item.data().cost + (pro[res.data().walletAddress] || 0);
            }
          );
        });
      })
      .then(() => {
        setSubTotal(sum);
        setOwnersWithPrice(pro);
      });
    setProducts(cart);
  };

  const checkout = async () => {
    let price = [];
    let fromAdd = "";
    let isTransactionSuccessfull = false;
    setLoading(true);
    Object.values(OwnersWithPrice).forEach((item) => {
      price.push(ethers.utils.parseEther(item.toFixed(10).toString()));
    });

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(userdata.activeAddress);
      const smcon = new ethers.Contract(
        smartContracts.ethTransfer,
        ethtransferabi,
        provider
      );
      const signContact = smcon.connect(signer);

      const transaction = await signContact.sendAmountsToAddresses(
        [...price, ethers.utils.parseEther((subTotal * 0.05).toFixed(10))],
        [
          ...Object.keys(OwnersWithPrice),
          "0xdCe3c8aa5364B0C161b607beE16BB765cF4A7597",
        ],
        {
          value: ethers.utils.parseEther(
            (subTotal + parseFloat((subTotal * 0.05).toFixed(10))).toString()
          ),
        }
      );
      transaction
        .wait()
        .then((res) => {
          console.log(res);
          isTransactionSuccessfull = true;
          productIds.forEach((item) => {
            getDoc(doc(getFirestore(), "products", item))
              .then((docs) => {
                setDoc(
                  doc(getFirestore(), "products", item),
                  {
                    quantity_sold: docs.data().quantity_sold + 1,
                  },
                  { merge: true }
                );
              })
              .then("quantity modified");
          });
        })
        .catch((err) => {
          console.log("errrr", err);
          isTransactionSuccessfull = false;
        })
        .finally(() => {
          addDoc(collection(getFirestore(), "transactions"), {
            products: productIds,
            status: isTransactionSuccessfull ? "Success" : "Failed",
            amount: subTotal + parseFloat((subTotal * 0.05).toFixed(10)),
            timestamp: Timestamp.fromDate(new Date()),
            from: userdata.activeAddress,
            to: [
              ...Object.keys(OwnersWithPrice),
              "0xdCe3c8aa5364B0C161b607beE16BB765cF4A7597",
            ],
            tokenUsed: 0,
          }).then((response) => {
            getDoc(
              doc(getFirestore(), "users", getAuth().currentUser.uid)
            ).then((res) => {
              setDoc(
                doc(getFirestore(), "users", getAuth().currentUser.uid),
                {
                  transaction: [...res.data().transaction, response.id],
                  bought: [...res.data().bought, ...productIds],
                },
                { merge: true }
              ).then(() => {
                console.log("document id added");
              });
            });

            console.log("done");
            setLoading(false);
          });
        });
    } catch (err) {
      setLoading(false);
      console.log("err", err);
    }
  };

  useEffect(() => {
    setSubTotal(0);
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
          {!products.length ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
                width: "100%",
              }}
            >
              <lottie-player
                autoplay
                loop
                mode="normal"
                src="https://assets1.lottiefiles.com/packages/lf20_9nP76E1BYh.json"
              ></lottie-player>
              <h2>Start Shopping to Fill Your Cart</h2>
            </div>
          ) : (
            <>
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="product-list">
                    <table
                      className="table shop_table shop_table_responsive cart"
                      cellspacing="0"
                    >
                      <thead>
                        <tr>
                          <th className="product-thumbnail"> </th>
                          <th className="product-name">Product</th>
                          <th className="product-price">Price</th>
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
                                  {item.name}
                                </Link>
                              </td>

                              <td
                                className="product-subtotal"
                                data-title="Total"
                              >
                                {item.cost} Eth
                              </td>
                              <td
                                style={{
                                  cursor: "pointer",
                                  fontSize: "1.5rem",
                                }}
                                onClick={() => {
                                  setLoader(index);
                                  deleteDoc(
                                    doc(
                                      getFirestore(),
                                      "users",
                                      uid,
                                      "cart",
                                      item.id
                                    )
                                  ).then(() => {
                                    console.log("delete done");
                                    setLoader(-1);
                                    getCart();
                                  });
                                }}
                              >
                                {loader === products.indexOf(item) ? (
                                  <img
                                    width={15}
                                    src={activity}
                                    alt="activity"
                                  />
                                ) : (
                                  "×"
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
                        <span>{subTotal} Eth</span>
                      </li>
                      <li className="d-flex justify-content-between pb-2 mb-3">
                        <h5>Token Used</h5>
                        <span>0</span>
                      </li>
                      <li className="d-flex justify-content-between pb-2 mb-3">
                        <h5>Fees (5%)</h5>
                        <span>
                          {parseFloat((subTotal * 0.05).toFixed(10))} Eth
                        </span>
                      </li>
                      <li className="d-flex justify-content-between pb-2">
                        <h5>Total</h5>
                        <span>
                          {subTotal + parseFloat((subTotal * 0.05).toFixed(10))}{" "}
                          Eth
                        </span>
                      </li>
                    </ul>
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
                            checkout();
                          }}
                          className="btn btn-main btn-small"
                          disabled={subTotal === 0}
                          style={{
                            cursor: subTotal === 0 ? "not-allowed" : "pointer",
                          }}
                        >
                          Proceed to checkout
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <GoToTop />
    </div>
  );
}
export default Cart;
