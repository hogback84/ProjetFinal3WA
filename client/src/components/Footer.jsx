import React from "react";
import "../assets/styles/layouts/_footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <footer className="text-center text-white shadow ">
        <div className="container-fluid pt-2">
          <div className="row footer-area">
            <div className="col-lg-4 col-md-6 col-sm-6 mb-5">
              <h3>About Us</h3>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6 mb-5">
              <h3>Newsletter</h3>
              <p>Stay update with our latest</p>
              <div className="d-inline-flex align-items-center">
                <input
                  className="form-control"
                  name="EMAIL"
                  placeholder="Enter Email "
                  required=""
                  type="email"
                ></input>
                <button
                  className="click-btn btn btn-default bg-warning"
                  aria-label="Subscribe to newsletter"
                >
                  <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mb-5">
              <h3>Follow Me on</h3>
              <a
                className="btn btn-link btn-floating btn-lg text-white"
                href="https://github.com/hogback84/"
                role="button"
                data-mdb-ripple-color="dark"
                aria-label="Visita il mio profilo LinkedIn"
              >
                <i className="fab fa-linkedin" />
                <span className="sr-only">Visita il mio profilo LinkedIn</span>
              </a>
              <a
                className="btn btn-link btn-floating btn-lg text-white "
                href="https://github.com/hogback84"
                role="button"
                data-mdb-ripple-color="dark"
                aria-label="Visita il mio profilo GitHub"
              >
                <i className="fab fa-github" />
                <span className="sr-only">Visita il mio profilo GitHub</span>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-white bg-dark p-4">
          © 2023 Copyright:
          <a className="text-white" href="https://github.com/hogback84">
            Mohamed
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
