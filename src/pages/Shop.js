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
} from "firebase/firestore";

function Shop() {
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const getProducts = async () => {
    setProducts([]);
    setPopularProducts([]);
    let array = [];
    let popProd = [];
    let qu = query(collection(getFirestore(), "products"), limit(6));
    const products = await getDocs(qu);
    products.docs.forEach((product) => {
      array.push({ ...product.data(), id: product.id });
    });
    setProducts(array);

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

  useEffect(() => {
    getProducts();
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
                        Showing 1–6 of 17 results
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
                {products.map((item) => {
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
                <div className="d-flex justify-content-center"></div>
                <div className="col-12">
                  <nav aria-label="Page navigation">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
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
