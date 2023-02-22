import { useContext, useState } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import GoToTop from "../components/GoToTop";
import colors from "../colors";

import * as Yup from "yup";
import { password, username } from "../config/validationSchema";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

function Login() {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const validation = Yup.object().shape({
    password: password,
    username: username,
  });
  const onPress = async (values) => {
    const q = query(
      collection(getFirestore(), "users"),
      where("username", "==", values.username)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
      setError("error");
    } else {
      querySnapshot.forEach(async (docs) => {
        await signInWithEmailAndPassword(
          getAuth(),
          docs.data().email,
          values.password
        )
          .then(async (user) => {
            console.log("signin done", user.user.uid);
            setError("success");
            let cartdoc = await getDoc(
              doc(getFirestore(), "cart", values.username)
            );
            console.log(cartdoc.data());
            navigate("/", { replace: true });
          })
          .catch((err) => {
            console.log(err);
            setError("error");
          });
      });
    }
  };
  return (
    <div className="login-container">
      {error === "error" && (
        <div
          className="alert alert-danger alert-dismissible fade show fixed-top"
          role="alert"
          style={{ marginTop: "5rem" }}
        >
          <strong>Error!</strong> Invalid credentials!
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
          <strong>Success! </strong>Login successfull!
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
        initialValues={{ username: "", password: "" }}
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
                      <h2 className="mb-2">Login</h2>
                      <p className="lead">
                        Don’t have an account?{" "}
                        <Link to={{ pathname: "/signup" }}>
                          Create an account
                        </Link>
                      </p>
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
                    <div className="form-group">
                      <label for="#">Enter Password</label>
                      <a className="float-right" href="">
                        Forget password?
                      </a>
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

                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn btn-main mt-3 btn-block"
                    >
                      Login
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
export default Login;
