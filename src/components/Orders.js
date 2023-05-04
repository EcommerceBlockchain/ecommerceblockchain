import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import colors from "../colors";
import { ethers } from "ethers";
import smartContracts from "../blockchain/smartContracts";
import addproductabi from "../blockchain/abis/addProduct.json";
import GetFileByPath from "../service/GetFileByPath";
import activity from "../images/activity.gif";

function Orders({ userProfileData }) {
  const [products, setProducts] = useState([]);
  const [downloadurls, setDownloadurls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(-1);

  const getdata = () => {
    setLoading(true);
    setProducts([]);
    setDownloadurls([]);
    userProfileData?.bought?.forEach(async (element, index) => {
      getDoc(doc(getFirestore(), "products", element)).then((res) => {
        setProducts((prev) => [...prev, { ...res.data(), id: element }]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const smcon = new ethers.Contract(
          smartContracts.addProduct,
          addproductabi,
          provider
        );

        smcon.getPath(element).then((res) => {
          console.log("res", res);
          setDownloadurls((prev) => [...prev, GetFileByPath(res)]);
        });
      });
    });
    setLoading(false);
  };

  function downloadFile(file, name, extension, index) {
    setLoader(index);
    console.log(file, name);

    fetch(file)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = name + "." + extension;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .then(() => {
        setLoader(-1);
      });
  }

  useEffect(() => {
    setProducts([]);
    getdata();
  }, []);

  return (
    <div>
      <p>Orders</p>
      {loading && <img width={30} src={activity} alt="activity" />}
      {products.length === 0 && !loading ? (
        <p>No Orders to display</p>
      ) : (
        <div>
          <table class="user-table align-items-center table table-hover">
            <thead>
              <tr>
                <th class="border-bottom">Thumbnail</th>
                <th class="border-bottom">Name</th>
                <th class="border-bottom">Price</th>
                <th class="border-bottom">Download</th>
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
                      <button
                        class="btn"
                        onClick={() =>
                          downloadFile(
                            downloadurls[index],
                            item.name,
                            item.extension,
                            index
                          )
                        }
                      >
                        {loader === index ? (
                          <div>
                            <img width={20} src={activity} alt="activity" />
                          </div>
                        ) : (
                          <FaDownload color={colors.primaryBlue} size={15} />
                        )}
                      </button>
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

export default Orders;
