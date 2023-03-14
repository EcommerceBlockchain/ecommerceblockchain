import React, { useState } from "react";
import colors from "../colors";

function Account({ userData }) {
  // const [yourname, setYourName] = useState(userData.name ? userData.name : "");
  return (
    <div>
      <div className="row" style={{ marginLeft: "-2rem" }}>
        <div className="col-md-8">
          <div className="col-lg-12 mb-4 mb-lg-0">
            <h2>General Information</h2>

            <div
              className="heading justify-content-between mb-5"
              style={{
                border: "1px solid lightgrey",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="product-info-own">
                    <h5 className="result-count mb-0">Name</h5>
                    <div className="form-group">
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className="product-info-own">
                    <h5 className="result-count mb-0">Email</h5>
                    <div className="form-group">
                      <p>{userData.email}</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="product-info-own">
                    <h5 className="result-count mb-0">Token</h5>
                    <div className="form-group">
                      <p> {userData.reward} Ray</p>
                    </div>
                  </div>
                  <div className="product-info-own">
                    <h5 className="result-count mb-0">Rating</h5>
                    <div className="form-group">
                      <p>{userData.avg_rating}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-md-5">
          <div className="col-lg-12 mb-4 mb-lg-0">
            <h2>Description</h2>

            <div
              className="heading justify-content-between mb-5"
              style={{
                border: "1px solid lightgrey",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div className="product-info-own">
                <h5 className="result-count mb-0">Product Name</h5>
                <div className="form-group">
                  <input
                    className="form-control mt-2"
                    type="text"
                    placeholder="Give a nice name"
                    style={{
                      backgroundColor: "white",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Account;
