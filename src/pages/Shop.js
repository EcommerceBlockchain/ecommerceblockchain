import { Link, useLocation } from "react-router-dom";
import GoToTop from "../components/GoToTop";
import Product from "../components/Product";
import SmallProduct from "../components/SmallProduct";
import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  getFirestore,
  query,
  orderBy,
  limit,
  getCountFromServer,
  where,
} from "firebase/firestore";
import spinner from "../images/spinner.gif";

import ReactPaginate from "react-paginate";

function Shop() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [sorting, setSorting] = useState("default-sorting");
  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    setProducts([]);
    setTotal(0);
    const coll = collection(getFirestore(), "products");
    const snapshot = await getCountFromServer(coll);
    setTotal(snapshot.data().count);
    setPageCount(Math.ceil(snapshot.data().count / 6));
    let array = [];
    let qu = query(collection(getFirestore(), "products"), limit(50));
    const productsAll = await getDocs(qu);
    productsAll.docs.forEach((product) => {
      array.push({ ...product.data(), id: product.id });
    });
    setProducts(array);
    setCurrentProducts(array.slice(0, 6));
    setLoading(false);
  };

  const getCategoryProducts = async (CategoryList) => {
    if (sorting === "default-sorting") {
      setLoading(true);
      setProducts([]);
      setTotal(0);
      const coll = query(
        collection(getFirestore(), "products"),
        where("category", "in", CategoryList)
      );
      const snapshot = await getCountFromServer(coll);
      setTotal(snapshot.data().count);
      setPageCount(Math.ceil(snapshot.data().count / 6));
      let array = [];
      let qu = query(
        collection(getFirestore(), "products"),
        where("category", "in", CategoryList),
        limit(50)
      );
      const productsAll = await getDocs(qu);
      productsAll.docs.forEach((product) => {
        array.push({ ...product.data(), id: product.id });
      });
      setProducts(array);
      setCurrentProducts(array.slice(0, 6));
      setLoading(false);
    } else if (sorting === "popularity") {
      setLoading(true);
      setProducts([]);
      setTotal(0);
      const coll = query(
        collection(getFirestore(), "products"),
        where("category", "in", CategoryList)
      );
      const snapshot = await getCountFromServer(coll);
      setTotal(snapshot.data().count);
      setPageCount(Math.ceil(snapshot.data().count / 6));
      let array = [];
      let qu = query(
        collection(getFirestore(), "products"),
        where("category", "in", CategoryList),
        orderBy("quantity_sold", "desc"),
        limit(50)
      );
      const productsAll = await getDocs(qu);
      productsAll.docs.forEach((product) => {
        array.push({ ...product.data(), id: product.id });
      });
      setProducts(array);
      setCurrentProducts(array.slice(0, 6));
      setLoading(false);
    } else if (sorting === "rating") {
      setLoading(true);
      setProducts([]);
      setTotal(0);
      const coll = query(
        collection(getFirestore(), "products"),
        where("category", "in", CategoryList)
      );
      const snapshot = await getCountFromServer(coll);
      setTotal(snapshot.data().count);
      setPageCount(Math.ceil(snapshot.data().count / 6));
      let array = [];
      let qu = query(
        collection(getFirestore(), "products"),
        where("category", "in", CategoryList),
        orderBy("rating", "desc"),
        limit(50)
      );
      const productsAll = await getDocs(qu);
      productsAll.docs.forEach((product) => {
        array.push({ ...product.data(), id: product.id });
      });
      setProducts(array);
      setCurrentProducts(array.slice(0, 6));
      setLoading(false);
    } else if (sorting === "latest") {
      setLoading(true);
      setProducts([]);
      setTotal(0);
      const coll = query(
        collection(getFirestore(), "products"),
        where("category", "in", CategoryList)
      );
      const snapshot = await getCountFromServer(coll);
      setTotal(snapshot.data().count);
      setPageCount(Math.ceil(snapshot.data().count / 6));
      let array = [];
      let qu = query(
        collection(getFirestore(), "products"),
        where("category", "in", CategoryList),
        orderBy("timestamp", "desc"),
        limit(50)
      );
      const productsAll = await getDocs(qu);
      productsAll.docs.forEach((product) => {
        array.push({ ...product.data(), id: product.id });
      });
      setProducts(array);
      setCurrentProducts(array.slice(0, 6));
      setLoading(false);
    } else if (sorting === "low-to-high") {
      setLoading(true);
      setProducts([]);
      setTotal(0);
      const coll = query(
        collection(getFirestore(), "products"),
        where("category", "in", CategoryList)
      );
      const snapshot = await getCountFromServer(coll);
      setTotal(snapshot.data().count);
      setPageCount(Math.ceil(snapshot.data().count / 6));
      let array = [];
      let qu = query(
        collection(getFirestore(), "products"),
        where("category", "in", CategoryList),
        orderBy("cost"),
        limit(50)
      );
      const productsAll = await getDocs(qu);
      productsAll.docs.forEach((product) => {
        array.push({ ...product.data(), id: product.id });
      });
      setProducts(array);
      setCurrentProducts(array.slice(0, 6));
      setLoading(false);
    } else if (sorting === "high-to-low") {
      setLoading(true);
      setProducts([]);
      setTotal(0);
      const coll = query(
        collection(getFirestore(), "products"),
        where("category", "in", CategoryList)
      );
      const snapshot = await getCountFromServer(coll);
      setTotal(snapshot.data().count);
      setPageCount(Math.ceil(snapshot.data().count / 6));
      let array = [];
      let qu = query(
        collection(getFirestore(), "products"),
        where("category", "in", CategoryList),
        orderBy("cost", "desc"),
        limit(50)
      );
      const productsAll = await getDocs(qu);
      productsAll.docs.forEach((product) => {
        array.push({ ...product.data(), id: product.id });
      });
      setProducts(array);
      setCurrentProducts(array.slice(0, 6));
      setLoading(false);
    }
  };

  const popularSorting = async () => {
    setLoading(true);
    setItemOffset(0);
    setProducts([]);
    setCurrentProducts([]);
    let popProd = [];
    let qu2 = query(
      collection(getFirestore(), "products"),
      orderBy("quantity_sold", "desc"),
      limit(50)
    );
    const productsAll = await getDocs(qu2);
    productsAll.docs.forEach((product) => {
      popProd.push({ ...product.data(), id: product.id });
    });
    setLoading(false);
    setProducts(popProd);
    setCurrentProducts(popProd.slice(0, 6));
  };
  const ratingSorting = async () => {
    setLoading(true);
    setItemOffset(0);
    setProducts([]);
    setCurrentProducts([]);
    let popProd = [];
    let qu2 = query(
      collection(getFirestore(), "products"),
      orderBy("rating", "desc"),
      limit(50)
    );
    const productsAll = await getDocs(qu2);
    productsAll.docs.forEach((product) => {
      popProd.push({ ...product.data(), id: product.id });
    });
    setLoading(false);
    setProducts(popProd);
    setCurrentProducts(popProd.slice(0, 6));
  };

  const latestSorting = async () => {
    setLoading(true);
    setItemOffset(0);
    setProducts([]);
    setCurrentProducts([]);
    let popProd = [];
    let qu2 = query(
      collection(getFirestore(), "products"),
      orderBy("timestamp", "desc"),
      limit(50)
    );
    const productsAll = await getDocs(qu2);
    productsAll.docs.forEach((product) => {
      popProd.push({ ...product.data(), id: product.id });
    });
    setLoading(false);
    setProducts(popProd);
    setCurrentProducts(popProd.slice(0, 6));
  };
  const highToLowSorting = async () => {
    setLoading(true);
    setItemOffset(0);
    setProducts([]);
    setCurrentProducts([]);
    let popProd = [];
    let qu2 = query(
      collection(getFirestore(), "products"),
      orderBy("cost", "desc"),
      limit(50)
    );
    const productsAll = await getDocs(qu2);
    productsAll.docs.forEach((product) => {
      popProd.push({ ...product.data(), id: product.id });
    });
    setLoading(false);
    setProducts(popProd);
    setCurrentProducts(popProd.slice(0, 6));
  };
  const lowToHighSorting = async () => {
    setLoading(true);
    setItemOffset(0);
    setProducts([]);
    setCurrentProducts([]);
    let popProd = [];
    let qu2 = query(
      collection(getFirestore(), "products"),
      orderBy("cost"),
      limit(50)
    );
    const productsAll = await getDocs(qu2);
    productsAll.docs.forEach((product) => {
      popProd.push({ ...product.data(), id: product.id });
    });
    setLoading(false);
    setProducts(popProd);
    setCurrentProducts(popProd.slice(0, 6));
  };

  const getPopularProducts = async () => {
    setPopularProducts([]);
    let popProd = [];
    let qu2 = query(
      collection(getFirestore(), "products"),
      orderBy("rating", "desc"),
      limit(4)
    );
    const products2 = await getDocs(qu2);
    products2.docs.forEach((product) => {
      popProd.push({ ...product.data(), id: product.id });
    });
    setPopularProducts(popProd);
  };

  const handlePageClick = (event) => {
    setLoading(true);
    const newOffset = (event.selected * 6) % total;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}  ${pageCount}`
    );
    setItemOffset(newOffset);
  };
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + 6;
    setCurrentProducts(products.slice(itemOffset, endOffset));
    setLoading(false);
  }, [itemOffset]);

  useEffect(() => {
    setItemOffset(0);
    if (location.state?.arr) {
      getCategoryProducts(location.state.arr);
    } else {
      getProducts();
    }
    getPopularProducts();
  }, []);
  return (
    <div className="shop-container">
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">Shop</h1>
                <p>
                  Welcome to Digimart! We are excited to offer you a unique and
                  secure shopping experience powered by blockchain technology.
                  At our shop, you can browse through a wide selection of
                  products from various categories, including Images, Videos,
                  Documents, and more. Our inventory is updated regularly to
                  ensure that you always have access to the latest products on
                  the market.
                </p>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to={{ pathname: "/" }}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Shop
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-shop section">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="row align-items-center">
                <div className="col-lg-12 mb-4 mb-lg-0">
                  <div className="section-title">
                    <h2 className="d-block text-left-sm">Shop</h2>

                    <div className="heading d-flex justify-content-between mb-5">
                      <p className="result-count mb-0">
                        {" "}
                        Showing{" "}
                        {currentProducts.length === 0 ? 0 : itemOffset + 1}–
                        {itemOffset + 6 <= total ? itemOffset + 6 : total} of{" "}
                        {total} results{" "}
                      </p>
                      <div className="ordering">
                        <select
                          name="orderby"
                          className="orderby form-control"
                          aria-label="Shop order"
                          onChange={(e) => {
                            let v = e.target.value;
                            setSorting(v);
                            if (v === "default-sorting") {
                              getProducts();
                            } else if (v === "popularity") {
                              popularSorting();
                            } else if (v === "rating") {
                              ratingSorting();
                            } else if (v === "latest") {
                              latestSorting();
                            } else if (v === "low-to-high") {
                              lowToHighSorting();
                            } else if (v === "high-to-low") {
                              highToLowSorting();
                            }
                          }}
                        >
                          <option value="default-sorting">
                            Default sorting
                          </option>
                          <option value="popularity">Sort by popularity</option>
                          <option value="rating">Sort by rating</option>
                          <option value="latest">Sort by latest</option>
                          <option value="low-to-high">
                            Sort by price: low to high
                          </option>
                          <option value="high-to-low">
                            Sort by price: high to low
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="row"
                style={{
                  display: "grid",
                  gap: "1rem",
                  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                }}
              >
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <img width={100} src={spinner} />
                  </div>
                ) : (
                  currentProducts.map((item) => {
                    return (
                      <Product
                        key={item.id}
                        name={item.name}
                        price={item.cost}
                        id={item.id}
                        preImg={item.preview_image[0]}
                      />
                    );
                  })
                )}
              </div>
              <div className="d-flex justify-content-center">
                <ReactPaginate
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageCount={pageCount}
                  previousLabel="<"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-5">
                <section className="widget widget-sizes mb-5">
                  <h3 className="widget-title h4 mb-4">Shop by Category</h3>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="size1"
                      value={"Image"}
                      name="checkboxes"
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
                      name="checkboxes"
                      value={"Video"}
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
                      name="checkboxes"
                      value={"Audio"}
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
                      name="checkboxes"
                      value={"GIF"}
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
                      name="checkboxes"
                      value={"Documents"}
                    />
                    <label className="custom-control-label" for="size5">
                      Documents (.xlsx, .pdf, .docx etc)
                    </label>
                  </div>
                </section>

                <button
                  className="btn btn-main"
                  onClick={() => {
                    let ans = [];
                    let markedCheckbox =
                      document.getElementsByName("checkboxes");
                    for (let checkbox of markedCheckbox) {
                      if (checkbox.checked) ans.push(checkbox.value);
                    }
                    if (!ans.length) {
                      if (sorting === "default-sorting") {
                        getProducts();
                      } else if (sorting === "popularity") {
                        popularSorting();
                      } else if (sorting === "rating") {
                        ratingSorting();
                      } else if (sorting === "latest") {
                        latestSorting();
                      } else if (sorting === "low-to-high") {
                        lowToHighSorting();
                      } else if (sorting === "high-to-low") {
                        highToLowSorting();
                      }
                    } else {
                      getCategoryProducts(ans);
                    }
                  }}
                >
                  Filter
                </button>
              </div>

              <section className="widget widget-popular mb-5">
                <h3 className="widget-title mb-4 h4">Popular Products</h3>
                {popularProducts.map((item) => {
                  return (
                    <SmallProduct
                      key={item.id}
                      name={item.name}
                      price={item.cost}
                      id={item.id}
                      preImg={item.preview_image[0]}
                    />
                  );
                })}
              </section>
            </div>
          </div>
        </div>
      </section>
      <GoToTop />
    </div>
  );
}
export default Shop;
