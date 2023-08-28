import React from "react";
import logo from "../../assets/logo.png";
import "./form.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Loader";

const SignUp = () => {
  const [loading, setLoading] = useState(true);
  const [paitentData, setPaitentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    petName: "",
    petBreed: "",
    petAge: "",
    city: "",
    profilePhoto: "",
    weight: "",
    type: "",
    color: "",
  });
  const [file, setFile] = useState();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPaitentData((values) => ({ ...values, [name]: value }));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("https://petmedbackend.onrender.com/api/upload", formData)
      .then((response) => {
        setPaitentData((values) => ({
          ...values,
          profilePhoto: response.data.file,
        }));
        setDisabled(false);
        if (response.data.status === "FAILURE") {
          toast.error(response.data.message_en, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.success(response.data.message_en, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((response) => {
        toast.error(response.data.message_en, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("https://petmedbackend.onrender.com/api/paitent/registerPaitent", paitentData)
      .then((response) => {
        {
          response.data.status === "SUCCESS"
            ? toast.success(response.data.message_en, {
                position: toast.POSITION.TOP_RIGHT,
              })
            : toast.error(response.data.message_en, {
                position: toast.POSITION.TOP_RIGHT,
              });
        }
        setTimeout(() => {
          navigate("/userlogin");
        }, 1000);
      })
      .catch((response) => {
        toast.error(response.data.message_en, {
          position: toast.POSITION.TOP_RIGHT,
        });
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
                          <img className="w-100" src={logo} alt="" />
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
                      >
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                          <li className="nav-item text-capitalize fw-bold fs-4 register">
                            sign up
                          </li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </section>
          <section id="user_signup">
            <div className="container mt-5">
              <div className="row">
                <div className="col-6">
                  <div className="login_img">
                    <img src="/login_image.jpg" className="w-100" alt="" />
                  </div>
                </div>
                <div className="col-6 pb-5">
                  <form
                    onSubmit={handleSubmit}
                    method="POST"
                    encType="multipart/form-data"
                  >
                    <div className="row">
                      <div className="col-6">
                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control"
                            name="firstName"
                            placeholder="enter first name"
                            onChange={handleChange}
                            value={paitentData.firstName}
                            required
                            autoComplete="on"
                          />
                          <label for="firstName">first name</label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control"
                            name="lastName"
                            placeholder="enter last name"
                            autoComplete="on"
                            value={paitentData.lastName}
                            onChange={handleChange}
                            required
                          />
                          <label for="lastName">last name</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div class="form-floating mb-3">
                          <input
                            type="email"
                            class="form-control"
                            name="email"
                            placeholder="name@example.com"
                            onChange={handleChange}
                            value={paitentData.email}
                            autoComplete="on"
                            required
                          />
                          <label for="email">Email address</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div class="form-floating mb-3">
                          <input
                            type="tel"
                            class="form-control"
                            name="phoneNumber"
                            placeholder="name@example.com"
                            onChange={handleChange}
                            value={paitentData.phoneNumber}
                            autoComplete="on"
                            required
                          />
                          <label for="contact">contact number</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div class="form-floating mb-3">
                          <input
                            type="password"
                            class="form-control"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={paitentData.password}
                            autoComplete="on"
                            required
                          />
                          <label for="floatingPassword">Password</label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control"
                            name="petName"
                            placeholder="enter first name"
                            onChange={handleChange}
                            value={paitentData.petName}
                            autoComplete="on"
                            required
                          />
                          <label for="petname">pet name</label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control"
                            name="petBreed"
                            placeholder="enter pet breed"
                            onChange={handleChange}
                            value={paitentData.petBreed}
                            autoComplete="on"
                            required
                          />
                          <label for="breed">pet breed</label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control"
                            name="petAge"
                            placeholder="enter pet age"
                            onChange={handleChange}
                            value={paitentData.petAge}
                            autoComplete="on"
                            required
                          />
                          <label for="petage">pet age</label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control"
                            name="weight"
                            placeholder="enter pet weight"
                            onChange={handleChange}
                            value={paitentData.weight}
                            autoComplete="on"
                            required
                          />
                          <label for="weight">Weight</label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control"
                            name="type"
                            placeholder="enter pet type"
                            onChange={handleChange}
                            value={paitentData.type}
                            autoComplete="on"
                            required
                          />
                          <label for="type">pet type</label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control"
                            name="color"
                            placeholder="enter color"
                            onChange={handleChange}
                            value={paitentData.color}
                            autoComplete="on"
                            required
                          />
                          <label for="city">enter pet color</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control"
                            name="city"
                            placeholder="enter city"
                            onChange={handleChange}
                            value={paitentData.city}
                            autoComplete="on"
                            required
                          />
                          <label for="city">city</label>
                        </div>
                      </div>
                      <div className="col-6">
                        <input
                          type="file"
                          name="file"
                          className="form-control"
                          onChange={(event) => setFile(event.target.files[0])}
                        />
                      </div>
                      <div className="col-6">
                        <button
                          type="button"
                          className="btn btn-secondary mt-0"
                          onClick={handleUpload}
                        >
                          Save Image
                        </button>
                      </div>
                      <div className="form_btn d-flex align-items-center">
                        <button
                          type="submit"
                          className="btn btn-secondary"
                          disabled={disabled}
                        >
                          sign up
                        </button>
                        <p>
                          <Link
                            to={"/userlogin"}
                            className="text-decoration-none back"
                          >
                            already registered?
                          </Link>
                        </p>
                      </div>
                    </div>
                  </form>
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

export default SignUp;
