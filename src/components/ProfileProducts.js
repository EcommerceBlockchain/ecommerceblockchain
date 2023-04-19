import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import React from "react";
import { useEffect, useState } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import colors from "../colors";
import activity from "../images/activity.gif";

function ProfileProducts({ userProfileData, isCurrentUser }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getdata = () => {
    setLoading(true);
    setProducts([]);

    userProfileData?.products?.forEach((element, index) => {
      getDoc(doc(getFirestore(), "products", element)).then((res) => {
        setProducts((prev) => [...prev, { ...res.data(), id: element }]);
      });
    });
    setLoading(false);
  };

  const deleteProduct = (_id, _active) => {
    setDoc(
      doc(getFirestore(), "products", _id),
      {
        is_active: !_active,
      },
      { merge: true }
    ).then(() => {
      getdata();
    });
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <div
        className="mt-3 mb-3"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>Products</p>
        {isCurrentUser && (
          <div>
            <Link to={"/addproduct"} state={null}>
              <button
                className="btn-primary p-2"
                style={{ border: "none", boxShadow: "none", fontSize: "12px" }}
              >
                Add Product
              </button>
            </Link>
          </div>
        )}
      </div>
      {loading && <img width={30} src={activity} alt="activity" />}
      {products.length === 0 && !loading ? (
        <p>No product to display</p>
      ) : (
        <div>
          <table class="user-table align-items-center table table-hover">
            <thead>
              <tr>
                <th class="border-bottom">Thumbnail</th>
                <th class="border-bottom">Name</th>
                <th class="border-bottom">Price</th>
                <th class="border-bottom">Edit</th>
                <th class="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="product-thumbnail" data-title="Thumbnail">
                      <Link to={"/single-product"} state={{ id: item.id }}>
                        <img
                          src={item.preview_image[0]}
                          className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail img-fluid"
                          alt={item.name}
                        />
                      </Link>
                    </td>
                    <td>
                      <Link to={"/single-product"} state={{ id: item.id }}>
                        {item.name}
                      </Link>
                    </td>
                    <td>
                      <span class="fw-normal">{item.cost} Eth</span>
                    </td>

                    <td>
                      <Link class="btn" to={"/addproduct"} state={item}>
                        <FaEdit size={15} color={colors.yellow} />
                      </Link>
                    </td>
                    <td>
                      {item.is_active ? (
                        <button
                          class="btn"
                          onClick={() => deleteProduct(item.id, item.is_active)}
                        >
                          <span class="fw-normal" style={{ color: colors.red }}>
                            Deactivate
                          </span>
                        </button>
                      ) : (
                        <button
                          class="btn"
                          onClick={() => deleteProduct(item.id, item.is_active)}
                        >
                          <span
                            class="fw-normal"
                            style={{ color: colors.green }}
                          >
                            Activate
                          </span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProfileProducts;
