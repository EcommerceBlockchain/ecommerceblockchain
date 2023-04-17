import { doc, getDoc, getFirestore } from "firebase/firestore";
import React from "react";
import { useEffect, useState } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import colors from "../colors";

function ProfileProducts({ userProfileData, isCurrentUser }) {
  const [products, setProducts] = useState([]);

  const getdata = () => {
    setProducts([]);

    if (products.length == userProfileData?.products?.length) return;

    userProfileData?.products?.forEach((element, index) => {
      getDoc(doc(getFirestore(), "products", element)).then((res) => {
        setProducts((prev) => [...prev, { ...res.data(), id: element }]);
      });
    });
  };

  const deleteProduct = () => {};

  useEffect(() => {
    getdata();
  }, [userProfileData]);

  return (
    <div>
      <p>Orders</p>
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
                <tr>
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
                    <button class="btn">
                      <FaEdit size={15} color={colors.yellow} />
                    </button>
                  </td>
                  <td>
                    {item.is_active ? (
                      <button class="btn" onClick={deleteProduct}>
                        <span class="fw-normal" style={{ color: colors.red }}>
                          Deactivate
                        </span>
                      </button>
                    ) : (
                      <button class="btn" onClick={deleteProduct}>
                        <span class="fw-normal" style={{ color: colors.green }}>
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
    </div>
  );
}

export default ProfileProducts;
