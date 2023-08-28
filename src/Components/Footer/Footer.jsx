import React from "react";
import "./footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <section id="footer_widget">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <h3>our pages</h3>
              <ul className="list-unstyled">
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/labs")}
                >
                  labs
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/blog")}
                >
                  blogs
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/doctor-dashboard")}
                >
                  doctor dashboard
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/userdashboard")}
                >
                  patiend dashboard
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/complain-form")}
                >
                  complaint
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/AdminLogin")}
                >
                  Admin Login
                </li>
              </ul>
            </div>
            <div className="col-3">
              <h3>our support</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="">pet grooming</a>
                </li>
                <li>
                  <a href="">dental care</a>
                </li>
                <li>
                  <a href="">care for puppy</a>
                </li>
                <li>
                  <a href="">service at a resort</a>
                </li>
                <li>
                  <a href="">veterinary services</a>
                </li>
              </ul>
            </div>
            <div className="col-3">
              <h3>working hours</h3>
              <ul>
                <li>monday to friday</li>
                <li>open form 9am - 6pm</li>
                <li>holidays/weekends closed</li>
              </ul>
            </div>
            <div className="col-3">
              <h3>newsletter</h3>
              <form action="" method="post">
                <div className="mb-4">
                  <input
                    type="text"
                    required
                    placeholder="Enter Full Name"
                    id=""
                    className="form-control"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    required
                    placeholder="Enter Email"
                    id=""
                    className="form-control"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary text-capitalize"
                >
                  subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <nav>
                <a href="">privacy & policy</a>
                <a href="">Terms & conditions</a>
              </nav>
            </div>
            <div className="col-6">
              <ul>
                <li>
                  <a href="">amazone</a>
                </li>
                <li>
                  <a href="">visa</a>
                </li>
                <li>
                  <a href="">paypal</a>
                </li>
                <li>
                  <a href="">payoneer</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
