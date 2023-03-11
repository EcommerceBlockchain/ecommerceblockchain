import { Link, useLocation } from "react-router-dom";

function Footer() {
  const { pathname } = useLocation();
  if (pathname === "/profile") return null;
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left mr-auto">
              <div className="footer-widget">
                <h4 className="mb-4">Digimart</h4>
                <p className="lead">Blockchain based ecommerce</p>

                <div className="">
                  <p className="mb-0">
                    <strong>Location : </strong>Mumbai ,India
                  </p>
                  <p>
                    <strong>Support Email : </strong>{" "}
                    <a href="mailto:support@digimart.com">
                      support@digimart.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
              <div className="footer-widget">
                <h4 className="mb-4">Category</h4>
                <ul className="pl-0 list-unstyled mb-0">
                  <li>
                    <Link to={"/shop"} state={{ arr: ["Documents"] }}>
                      Documents
                    </Link>
                  </li>
                  <li>
                    <Link to={"/shop"} state={{ arr: ["Image"] }}>
                      Image
                    </Link>
                  </li>
                  <li>
                    <Link to={"/shop"} state={{ arr: ["Video"] }}>
                      Video
                    </Link>
                  </li>
                  <li>
                    <Link to={"/shop"} state={{ arr: ["GIF"] }}>
                      GIF
                    </Link>
                  </li>
                  <li>
                    <Link to={"/shop"} state={{ arr: ["Audio"] }}>
                      Audio
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-lg-2 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left">
              <div className="footer-widget">
                <h4 className="mb-4">Useful Link</h4>
                <ul className="pl-0 list-unstyled mb-0">
                  <li>
                    <Link to={"/aboutus"}>About Us</Link>
                  </li>
                  <li>
                    <Link to={"/shop"}>Our Shop</Link>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="footer-btm py-4 ">
        <div className="container">
          <div className="row ">
            <div className="col-lg-6">
              <p className="copyright mb-0 ">
                © Reserved to Digimart {new Date().getFullYear().toString()}
              </p>
            </div>
            {/* <div className="col-lg-6">
              <ul className="list-inline mb-0 footer-btm-links text-lg-right mt-2 mt-lg-0">
                <li className="list-inline-item">
                  <a href="#">Privacy Policy</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">Terms &amp; Conditions</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">Cookie Policy</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">Terms of Sale</a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
