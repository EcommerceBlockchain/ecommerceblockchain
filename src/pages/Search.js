import React from "react";
import { Link } from "react-router-dom";

function Search() {
  return (
    <div className="shop-container">
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">Search</h1>
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
                      Search
                    </li>
                  </ol>
                </nav>
                <div className="search"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <h1>search</h1>
        <h1>search</h1>
        <h1>search</h1>
        <h1>search</h1>
        <h1>search</h1>
        <h1>search</h1>
        <h1>search</h1>
        <h1>search</h1>
        <h1>search</h1>
        <h1>search</h1>
        <h1>search</h1>
      </section>
    </div>
  );
}

export default Search;
