import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import "./form.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Loader";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://petmedbackend.onrender.com/api/admin/authenticateAdmin", formData)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          toast.success(response.data.message_en, {
            position: toast.POSITION.TOP_RIGHT,
          });
          localStorage.setItem("adminEmail", response.data.adminEmail);
          setTimeout(() => {
            navigate("/Admin");
          }, 1000);
        } else {
          toast.error(response.data.message_en, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="login_header">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                      <div className="logo_img">
                        <a className="navbar-brand" href="#">
                          <img
                            className="w-100"
                            src={logo}
                            alt=""
                            onClick={() => navigate("/")}
                          />
                        </a>
                      </div>
                      <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        <span className="navbar-toggler-icon"></span>
                      </button>
                      <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                      ></div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </section>
          <section id="user_login">
            <div className="container mt-4">
              <div className="row">
                <div className="col-6">
                  <div className="login_img">
                    <img src="/login_image.jpg" className="w-100" alt="" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="login_form text-capitalize">
                    <h4>welcome back!</h4>
                    <p>login to continue</p>
                    <form className="mt-4" onSubmit={handleSubmit}>
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="enter email"
                          required
                        />
                        <label for="floatingInput">Email address</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="enter Password"
                          required
                        />
                        <label for="floatingPassword">Password</label>
                      </div>
                      <div className="form_btn d-flex align-items-center">
                        <button type="submit" className="btn btn-secondary">
                          login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default AdminLogin;
