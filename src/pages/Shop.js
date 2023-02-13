import { Link } from "react-router-dom";
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
} from "firebase/firestore";
import ReactPaginate from "react-paginate";

function Shop() {
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const getProducts = async () => {
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
  }, [itemOffset]);

  useEffect(() => {
    getProducts();
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit sint doloribus obcaecati fuga dolorem quod dolor
                  maxime non, facere nemo consequatur ratione laborum nesciunt,
                  fugiat, possimus adipisci odit neque eos!
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
                        Showing {itemOffset + 1}–
                        {itemOffset + 6 <= total ? itemOffset + 6 : total} of{" "}
                        {total} results{" "}
                      </p>
                      <form className="ordering " method="get">
                        <select
                          name="orderby"
                          className="orderby form-control"
                          aria-label="Shop order"
                        >
                          <option value="" selected="selected">
                            Default sorting
                          </option>
                          <option value="">Sort by popularity</option>
                          <option value="">Sort by average rating</option>
                          <option value="">Sort by latest</option>
                          <option value="">Sort by price: low to high</option>
                          <option value="">Sort by price: high to low</option>
                        </select>
                      </form>
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
                {currentProducts.map((item) => {
                  return (
                    <Product
                      key={item.id}
                      name={item.name}
                      price={item.cost}
                      id={item.id}
                      preImg={item.preview_image[0]}
                    />
                  );
                })}
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
              <form className="mb-5">
                <section className="widget widget-sizes mb-5">
                  <h3 className="widget-title h4 mb-4">Shop by Category</h3>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="size1"
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
                    />
                    <label className="custom-control-label" for="size5">
                      Documents (.xlsx, .pdf, .docx etc)
                    </label>
                  </div>
                </section>

                <button type="button" className="btn btn-black btn-small">
                  Filter
                </button>
              </form>

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
