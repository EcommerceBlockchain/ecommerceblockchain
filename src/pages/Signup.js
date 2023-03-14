import { useState } from "react";
import { Link } from "react-router-dom";
import GoToTop from "../components/GoToTop";
import { Formik } from "formik";
import * as Yup from "yup";
import { email, name, password, username } from "../config/validationSchema";
import colors from "../colors";

import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const validation = Yup.object().shape({
    name: name,
    password: password,
    passwordcon: password,
    username: username,
    email: email,
  });

  const onPress = async (values) => {
    if (values.password !== values.passwordcon) {
      setError("password");
      return;
    }
    const firestore = getFirestore();
    const auth = getAuth();
    const q1 = query(
      collection(getFirestore(), "users"),
      where("email", "==", values.email)
    );
    const q2 = query(
      collection(getFirestore(), "users"),
      where("username", "==", values.username)
    );
    const querySnapshot1 = await getDocs(q1);
    const querySnapshot2 = await getDocs(q2);
    if (querySnapshot1.size !== 0 || querySnapshot2.size !== 0) {
      if (querySnapshot1.size !== 0 && querySnapshot2.size !== 0) {
        setError("both");
      } else if (querySnapshot1.size !== 0) {
        setError("email");
      } else if (querySnapshot2.size !== 0) {
        setError("username");
      }
      console.log("error happen");
    } else {
      setError("success");
      await createUserWithEmailAndPassword(auth, values.email, values.password);

      await setDoc(doc(collection(firestore, "users"), values.username), {
        username: values.username,
        email: values.email,
        name: values.name,
        avg_rating: 0,
        balance: 0,
        bought: [],
        is_active: true,
        products: [],
        reward: 0,
        transaction: [],
      });
      await setDoc(doc(collection(firestore, "cart"), values.username), {
        products: [],
      });

      navigate("/", { replace: true });
      console.log("success login");
    }
  };

  return (
    <div className="signUp-container">
      {error === "email" && (
        <div
          className="alert alert-danger alert-dismissible fade show fixed-top"
          role="alert"
          style={{ marginTop: "5rem" }}
        >
          <strong>Error!</strong> This email is already taken!
          <button
            type="button"
            className="close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => {
              setError("");
            }}
          >
            &#10060;
          </button>
        </div>
      )}
      {error === "username" && (
        <div
          className="alert alert-danger alert-dismissible fade show fixed-top"
          role="alert"
          style={{ marginTop: "5rem" }}
        >
          <strong>Error!</strong> This username is already taken!
          <button
            type="button"
            className="close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => {
              setError("");
            }}
          >
            {" "}
            &#10060;
          </button>
        </div>
      )}
      {error === "both" && (
        <div
          className="alert alert-danger alert-dismissible fade show fixed-top"
          role="alert"
          style={{ marginTop: "5rem" }}
        >
          <strong>Error!</strong> This email and username are already taken!
          <button
            type="button"
            className="close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => {
              setError("");
            }}
          >
            {" "}
            &#10060;
          </button>
        </div>
      )}
      {error === "password" && (
        <div
          className="alert alert-danger alert-dismissible fade show fixed-top"
          role="alert"
          style={{ marginTop: "5rem" }}
        >
          <strong>Error!</strong> Paasword didn't match!
          <button
            type="button"
            className="close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => {
              setError("");
            }}
          >
            {" "}
            &#10060;
          </button>
        </div>
      )}
      {error === "success" && (
        <div
          className="alert alert-success alert-dismissible fade show fixed-top"
          role="alert"
          style={{ marginTop: "5rem" }}
        >
          <strong>Succeess!</strong> Account created successfully!
          <button
            type="button"
            className="close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => {
              setError("");
            }}
          >
            {" "}
            &#10060;
          </button>
        </div>
      )}
      <Formik
        initialValues={{
          email: "",
          name: "",
          username: "",
          password: "",
          passwordcon: "",
        }}
        validationSchema={validation}
        onSubmit={(values) => {
          onPress(values);
        }}
      >
        {({ errors, touched, handleChange, handleSubmit, values }) => (
          <div className="account section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="login-form border p-5">
                    <div className="text-center heading">
                      <h2 className="mb-2">Sign Up</h2>
                      <p className="lead">
                        Already have an account?{" "}
                        <Link to={{ pathname: "/login" }}> Login now</Link>
                      </p>
                    </div>

                    <div className="form-group mb-4">
                      <label for="#">Enter Your Name</label>
                      <input
                        className="form-control"
                        placeholder="Enter Your Name"
                        style={{
                          border:
                            errors.name && touched.name
                              ? `1px solid ${colors.red}`
                              : `1px solid ${colors.primaryBlue}`,
                        }}
                        type={"text"}
                        value={values.name}
                        onChange={handleChange("name")}
                      />
                      {errors.name && touched.name && (
                        <p
                          style={{
                            fontSize: 14,
                            marginBottom: "10px",
                            color: colors.red,
                          }}
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <label for="#">Enter Email Address</label>
                      <input
                        className="form-control"
                        placeholder="Enter Email Address"
                        style={{
                          border:
                            errors.email && touched.email
                              ? `1px solid ${colors.red}`
                              : `1px solid ${colors.primaryBlue}`,
                        }}
                        type={"email"}
                        value={values.email}
                        onChange={handleChange("email")}
                      />
                      {errors.email && touched.email && (
                        <p
                          style={{
                            fontSize: 14,
                            marginBottom: "10px",
                            color: colors.red,
                          }}
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <label for="#">Enter username</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Username"
                        style={{
                          border:
                            errors.username && touched.username
                              ? `1px solid ${colors.red}`
                              : `1px solid ${colors.primaryBlue}`,
                        }}
                        value={values.username}
                        onChange={handleChange("username")}
                      />
                      {errors.username && touched.username && (
                        <p
                          style={{
                            fontSize: 14,
                            marginBottom: "10px",
                            color: colors.red,
                          }}
                        >
                          {errors.username}
                        </p>
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <label for="#">Enter Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        style={{
                          border:
                            errors.password && touched.password
                              ? `1px solid ${colors.red}`
                              : `1px solid ${colors.primaryBlue}`,
                        }}
                        value={values.password}
                        onChange={handleChange("password")}
                      />
                      {errors.password && touched.password && (
                        <p
                          style={{
                            fontSize: 14,
                            marginBottom: "10px",
                            color: colors.red,
                          }}
                        >
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label for="#">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        style={{
                          border:
                            errors.passwordcon && touched.passwordcon
                              ? `1px solid ${colors.red}`
                              : `1px solid ${colors.primaryBlue}`,
                        }}
                        value={values.passwordcon}
                        onChange={handleChange("passwordcon")}
                      />
                      {errors.passwordcon && touched.passwordcon && (
                        <p
                          style={{
                            fontSize: 14,
                            marginBottom: "10px",
                            color: colors.red,
                          }}
                        >
                          {errors.passwordcon}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn btn-main mt-3 btn-block"
                    >
                      SignUp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>

      <GoToTop />
    </div>
  );
}
export default SignUp;
