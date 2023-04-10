import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import colors from "../colors";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";

function Account({ userData }) {
  // const [yourname, setYourName] = useState(userData.name ? userData.name : "");

  // function validateData(){
  //   console.log("validating data")
  //   console.log(user)
  //   console.log(userData)
  //   if(!userData){
  //     userData = user;
  //   }
  // }

  // useEffect(() => {
  //   validateData()
  // },[])

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

      <div className="card-body">
        <h5 className="mb-4">General information</h5>
        <div className="row">
          <div className="mb-3 col-md-6">
            <div id="firstName"><label className="form-label">User Name</label><input required=""
              placeholder="Enter your user name" type="text" className="form-control" value={userData.name} /></div>
          </div>
          <div className="mb-3 col-md-6">
            <div id="emal"><label className="form-label">Email</label><input required="" placeholder="name@company.com"
              type="email" className="form-control" value={userData.email} /></div>
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-md-6">
            <div id="phone"><label className="form-label">Phone</label><input required="" placeholder="+12-345 678 910"
              type="number" className="form-control" /></div>
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-sm-4">
            <div id="city"><label className="form-label">City</label><input required="" placeholder="City" type="text"
              className="form-control" /></div>
          </div>
          <div className="mb-3 col-sm-4">

          </div>
          <div className="col-sm-4">
            <div id="zip"><label className="form-label">ZIP</label><input required="" placeholder="ZIP" type="tel"
              className="form-control" /></div>
          </div>
        </div>
        <div className="mt-3"><button type="submit" className="btn btn-primary">Save All</button></div>
      </div>
    </div>
  );
}

export default Account;
