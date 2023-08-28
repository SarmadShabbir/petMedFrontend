import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./admin.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Loader";
import Error404 from "../ErrorPage/404error";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [labs, setLabs] = useState([]);
  const [file, setFile] = useState();
  const [adminEmail, setAdminEmail] = useState();
  const [labPostingData, setLabPostingData] = useState({
    heading: "",
    phone: "",
    address: "",
    imgUrl: null,
  });
  const [postedBlogData, setPostedBlogData] = useState({
    blogTitle: "",
    blogContent: "",
    postedBy: "",
    imgUrl: null,
  });
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // handle change
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLabPostingData((values) => ({ ...values, [name]: value }));
  };

  // handle blog Content Change
  const handleBlogContentChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPostedBlogData((values) => ({ ...values, [name]: value }));
  };

  // fetch doctors
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/getDoctors"
      );
      setDoctors(response.data.doctors);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch Appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/fetchAllAppointments"
      );
      const convertedAppointments = response.data.appointments.map(
        (appointment) => {
          const timestamp = appointment.appointmentDate;
          const parsedDate = new Date(timestamp);
          const formattedDate = parsedDate.toISOString().split("T")[0];
          return {
            ...appointment,
            appointmentDate: formattedDate,
          };
        }
      );
      setAppointments(convertedAppointments);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch labs
  const fetchLabs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/getLabs"
      );
      setLabs(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // handle lab post
  const handleLabPost = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // First API Call
      const response = await axios.post(
        "http://localhost:8000/api/upload",
        formData
      );

      // update the state
      setLabPostingData((values) => ({
        ...values,
        imgUrl: response.data.file,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect for lab post
  useEffect(() => {
    if (labPostingData.imgUrl !== null) {
      axios
        .post("http://localhost:8000/api/admin/addLab", labPostingData)
        .then((labPostresponse) => {
          if (labPostresponse.data.status === "SUCCESS") {
            toast.success(labPostresponse.data.message_en, {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            toast.error(labPostresponse.data.message_en, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((error) => {
          console.log("An error occurred:", error);
        });
    }
  }, [labPostingData.imgUrl]);

  // handle blog post
  const handleBlogPost = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // First API call: Upload the file
      const response = await axios.post(
        "http://localhost:8000/api/upload",
        formData
      );

      // Update the state with the image URL
      setPostedBlogData((values) => ({
        ...values,
        imgUrl: response.data.file,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect for Blog Post
  useEffect(() => {
    if (postedBlogData.imgUrl !== null) {
      // Second API call: Add the blog post after imgUrl is updated
      axios
        .post("http://localhost:8000/api/admin/addBlog", postedBlogData)
        .then((blogPostData) => {
          if (blogPostData.data.status === "SUCCESS") {
            toast.success(blogPostData.data.message_en, {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            toast.error(blogPostData.data.message_en, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((error) => {
          console.log("An error occurred:", error);
        });
    }
  }, [postedBlogData.imgUrl]);

  // fetch blogs
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/getAllBlogs"
      );
      const convertedBlogsDate = response.data.blogs.map((blog) => {
        const timestamp = blog.createdAt;
        const parsedDate = new Date(timestamp);
        const formattedDate = parsedDate.toISOString().split("T")[0];
        return {
          ...blog,
          createdAt: formattedDate,
        };
      });
      setBlogs(convertedBlogsDate);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect
  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
    fetchLabs();
    fetchBlogs();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    const adminEmail = localStorage.getItem("adminEmail");
    setAdminEmail(adminEmail);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {adminEmail ? (
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
                          >
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                              <li
                                className="nav-item text-capitalize d-flex align-items-center"
                                style={{cursor: 'pointer'}}
                                onClick={() => {
                                  localStorage.clear();
                                  setTimeout(() => {
                                    navigate("/");
                                  }, 1000);
                                }}
                              >
                                Log out
                              </li>
                            </ul>
                          </div>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </section>{" "}
              <section id="admin">
                <div className="container">
                  <div className="row">
                    <div className="col-3 p-0">
                      <aside>
                        <ul className="nav nav-pills flex-column" id="myTab">
                          <li className="nav-item">
                            <a
                              href="#viewvet"
                              data-bs-toggle="pill"
                              className=" nav-link active"
                            >
                              vets
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#manage"
                              data-bs-toggle="pill"
                              className="nav-link"
                            >
                              patients
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#viewlab"
                              data-bs-toggle="pill"
                              className="nav-link"
                            >
                              laboratory
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#contact"
                              data-bs-toggle="pill"
                              className="nav-link"
                            >
                              add laboratory
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#editlab"
                              data-bs-toggle="pill"
                              className="nav-link"
                            >
                              edit laboratory
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#viewBlog"
                              data-bs-toggle="pill"
                              className="nav-link"
                            >
                              blogs
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#password"
                              data-bs-toggle="pill"
                              className="nav-link"
                            >
                              add blogs
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#editblog"
                              data-bs-toggle="pill"
                              className="nav-link"
                            >
                              edit blogs
                            </a>
                          </li>
                        </ul>
                      </aside>
                    </div>
                    <div className="col-9 dashboard_content">
                      <div className="tab-content">
                        <div className="tab-pane fade " id="home">
                          <div className="sub_heading text-capitalize">
                            <h4>hi dr.abdullah</h4>
                          </div>
                          <div className="progress_work">
                            <div className="row">
                              <div className="col-4 text-capitalize d-flex align-items-center">
                                <span className="me-2">0</span>
                                <p>profile views</p>
                              </div>
                              <div className="col-4 text-capitalize d-flex align-items-center">
                                <span className="me-2">0</span>{" "}
                                <p>future appoitments</p>
                              </div>
                              <div className="col-4 text-capitalize d-flex align-items-center">
                                <span className="me-2">0</span>{" "}
                                <p>patient appointments</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="appointment">
                          <div className="sub_heading text-capitalize">
                            <h4>appointments</h4>
                          </div>
                          <div className="progress_work">
                            <div className="row">
                              <div className="col-6 text-capitalize d-flex align-items-center">
                                <span className="me-2">0</span>{" "}
                                <p>future appoitments</p>
                              </div>
                              <div className="col-6 text-capitalize d-flex align-items-center">
                                <span className="me-2">0</span>{" "}
                                <p>patient booked appointments</p>
                              </div>
                              <div className="col-12 mt-3 text-center text-capitalize">
                                <span id="nothing">no appointments found</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="manage">
                          <div className="sub_heading text-capitalize">
                            <h4 className="fw-bold">patients</h4>
                          </div>
                          <div className="display_appointments mt-5">
                            <div className="row">
                              <div className="col-12">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">time</th>
                                      <th scope="col">date</th>
                                      <th scope="col">patient</th>
                                      <th scope="col">phone</th>
                                      <th scope="col">status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {appointments.map((appointment) => (
                                      <tr key={appointment._id}>
                                        <th scope="row">{appointment.to}</th>
                                        <td>{appointment.appointmentDate}</td>
                                        <td>{appointment.customerName}</td>
                                        <td>{appointment.phoneNo}</td>
                                        <td>
                                          {appointment.appointmentStatus ===
                                          "In Queue" ? (
                                            <span className="badge bg-primary text-capitalize">
                                              {appointment.appointmentStatus}
                                            </span>
                                          ) : appointment.appointmentStatus ===
                                            "Cancelled" ? (
                                            <span className="badge bg-danger text-capitalize">
                                              {appointment.appointmentStatus}
                                            </span>
                                          ) : appointment.appointmentStatus ===
                                            "Completed" ? (
                                            <span className="badge bg-success text-capitalize">
                                              Completed
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="contact">
                          <div className="sub_heading text-capitalize">
                            <h4>add laboratory</h4>
                          </div>
                          <div className="contact_info">
                            <form action="" method="post">
                              <div className="row">
                                <div className="col-6 text-capitalize mb-3">
                                  <label htmlFor="">laboratory name</label>
                                  <input
                                    type="text"
                                    name="heading"
                                    value={labPostingData.heading}
                                    onChange={handleChange}
                                    placeholder="laboratory name"
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-6 text-capitalize mb-3">
                                  <label htmlFor="">laboratory Phone no</label>
                                  <input
                                    type="text"
                                    name="phone"
                                    value={labPostingData.phone}
                                    onChange={handleChange}
                                    placeholder="laboratory phone no"
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-6 text-capitalize">
                                  <label htmlFor="">address</label>
                                  <input
                                    type="text"
                                    name="address"
                                    value={labPostingData.address}
                                    onChange={handleChange}
                                    placeholder="lab address"
                                    className="form-control"
                                    id=""
                                  />
                                </div>
                                <div className="col-6 mb-3">
                                  <label htmlFor="">Laboraty Picture</label>
                                  <input
                                    type="file"
                                    name="file"
                                    className="form-control"
                                    onChange={(event) =>
                                      setFile(event.target.files[0])
                                    }
                                    id=""
                                  />
                                </div>
                                <div className="col-12 text-end mt-5">
                                  <button
                                    type="button"
                                    className="btn btn-secondary text-capitalize"
                                    onClick={handleLabPost}
                                  >
                                    save
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="editlab">
                          <div className="sub_heading text-capitalize">
                            <h4>edit laboratory</h4>
                          </div>
                          <div className="contact_info">
                            <form action="" method="post">
                              <div className="row">
                                <div className="col-6 text-capitalize mb-3">
                                  <label htmlFor="">laboratory name</label>
                                  <input
                                    type="text"
                                    name=""
                                    placeholder="laboratory name"
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-6 text-capitalize mb-3">
                                  <label htmlFor="">laboratory email</label>
                                  <input
                                    type="email"
                                    name=""
                                    placeholder="laboratory name"
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-6 text-capitalize mb-3">
                                  <label htmlFor="">laboratory category</label>
                                  <select name="" className="form-select" id="">
                                    <option value="" selected>
                                      labs category
                                    </option>
                                    <option value="">
                                      University Of Diagnostic
                                    </option>
                                    <option value="">
                                      Veterinary Diagnostic
                                    </option>
                                    <option value="">
                                      The Vets Animal lab
                                    </option>
                                    <option value="">
                                      Center For Animal Diagnostic
                                    </option>
                                  </select>
                                </div>
                                <div className="col-6 text-capitalize">
                                  <label htmlFor="">address</label>
                                  <input
                                    type="text"
                                    placeholder="lab address"
                                    className="form-control"
                                    id=""
                                  />
                                </div>
                                <div className="col-12 mb-3">
                                  <textarea
                                    placeholder="write"
                                    className="form-control"
                                    id=""
                                    cols="30"
                                    rows="6"
                                  ></textarea>
                                </div>
                                <div className="col-12 mb-3">
                                  <input
                                    type="file"
                                    className="form-control"
                                    id=""
                                  />
                                </div>
                                <div className="col-12 text-end mt-5">
                                  <button
                                    type="submit"
                                    className="btn btn-secondary text-capitalize"
                                  >
                                    save
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="tab-pane fade show active" id="viewvet">
                          <div className="sub_heading text-capitalize">
                            <h4>vets</h4>
                          </div>
                          <div className="view_blogs mt-4">
                            <div className="row">
                              {doctors.map((data) => {
                                return (
                                  <div className="col-4 mb-3" key={data._id}>
                                    <div class="card">
                                      <img
                                        src={`../../../upload/${data.profilePhoto}`}
                                        class="card-img-top"
                                        alt="..."
                                      />
                                      <div class="card-body">
                                        <h5 class="card-title">
                                          <span>name: </span>
                                          {data.name}
                                        </h5>
                                        <p class="card-text mb-2">
                                          <span>specialist: </span>
                                          {data.specialization}
                                        </p>
                                        <p class="card-text">
                                          <span>city: </span>
                                          {data.city}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="viewlab">
                          <div className="sub_heading text-capitalize">
                            <h4>view laboratory</h4>
                          </div>
                          <div className="view_blogs mt-4">
                            <div className="row">
                              {labs.map((data) => {
                                return (
                                  <div className="col-4 mb-3" key={data.id}>
                                    <div className="card">
                                      <img
                                        src={`../../../upload/${data.imgUrl}`}
                                        className="card-img-top"
                                      />
                                      <div className="card-body">
                                        <h5 className="card-title">
                                          {data.heading}
                                        </h5>
                                        <p className="card-text">
                                          <i class="fa-solid fa-location-dot me-2"></i>
                                          {data.address}
                                        </p>
                                        <span>
                                          <i class="fa-solid fa-phone me-2"></i>
                                          {data.phone}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="viewBlog">
                          <div className="sub_heading text-capitalize">
                            <h4>view blogs</h4>
                          </div>
                          <div className="view_blogs mt-4">
                            <div className="row">
                              {blogs.map((data) => {
                                return (
                                  <div className="col-4 mb-3" key={data.id}>
                                    <div className="card">
                                      <img
                                        src={`../../../upload/${data.imgUrl}`}
                                        className="card-img-top"
                                        alt="..."
                                      />
                                      <div className="card-body">
                                        <span>
                                          {`${data.createdAt}, ${data.postedBy}`}
                                          <span className="icon mx-2">
                                            <i class="fa-solid fa-comment"></i>{" "}
                                            3
                                          </span>
                                        </span>
                                        <p className="card-text">
                                          {data.blogContent}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="password">
                          <div className="sub_heading text-capitalize">
                            <h4>add blogs</h4>
                          </div>
                          <div className="contact_info">
                            <form action="" method="post">
                              <div className="row">
                                <div className="col-6 text-capitalize mb-3">
                                  <label htmlFor="">blog title</label>
                                  <input
                                    type="text"
                                    name="blogTitle"
                                    value={postedBlogData.blogTitle}
                                    onChange={handleBlogContentChange}
                                    placeholder="blog title"
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-6 text-capitalize mb-3">
                                  <label htmlFor="">author name</label>
                                  <input
                                    type="text"
                                    name="postedBy"
                                    value={postedBlogData.postedBy}
                                    onChange={handleBlogContentChange}
                                    placeholder="author name"
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-12 mb-3">
                                  <textarea
                                    className="form-control"
                                    name="blogContent"
                                    value={postedBlogData.blogContent}
                                    onChange={handleBlogContentChange}
                                    cols="30"
                                    rows="6"
                                  ></textarea>
                                </div>
                                <div className="col-12 mb-3">
                                  <input
                                    type="file"
                                    name="file"
                                    className="form-control"
                                    onChange={(event) =>
                                      setFile(event.target.files[0])
                                    }
                                  />
                                </div>
                                <div className="col-12 text-end mt-5">
                                  <button
                                    type="button"
                                    className="btn btn-secondary text-capitalize"
                                    onClick={handleBlogPost}
                                  >
                                    publish blog
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="editblog">
                          <div className="sub_heading text-capitalize">
                            <h4>edit blogs</h4>
                          </div>
                          <div className="contact_info">
                            <form action="" method="post">
                              <div className="row">
                                <div className="col-6 text-capitalize mb-3">
                                  <label htmlFor="">blog title</label>
                                  <input
                                    type="text"
                                    name=""
                                    placeholder="blog title"
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-6 text-capitalize mb-3">
                                  <label htmlFor="">author name</label>
                                  <input
                                    type="text"
                                    name=""
                                    placeholder="author name"
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-6 text-capitalize mb-3">
                                  <label htmlFor="">blog category</label>
                                  <select name="" className="form-select" id="">
                                    <option value="" selected>
                                      blog category
                                    </option>
                                    <option value="">health</option>
                                    <option value="">safety</option>
                                  </select>
                                </div>
                                <div className="col-6 text-capitalize">
                                  <label htmlFor="">tags</label>
                                  <input
                                    type="text"
                                    placeholder="tags"
                                    className="form-control"
                                    id=""
                                  />
                                </div>
                                <div className="col-12 mb-3">
                                  <textarea
                                    className="form-control"
                                    id=""
                                    cols="30"
                                    rows="6"
                                  ></textarea>
                                </div>
                                <div className="col-12 mb-3">
                                  <input
                                    type="file"
                                    className="form-control"
                                    id=""
                                  />
                                </div>
                                <div className="col-12 text-end mt-5">
                                  <button
                                    type="submit"
                                    className="btn btn-secondary text-capitalize"
                                  >
                                    publish blog
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <div
                  className="modal fade"
                  id="modal2"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5 text-capitalize fw-semibold"
                          id="exampleModalLabel"
                        >
                          abdullah
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <form action="" method="post">
                        <div className="modal-body">
                          <div className="container">
                            <div className="row">
                              <div className="col-6 mb-3">
                                <input
                                  type="text"
                                  value="26/06/2023"
                                  name=""
                                  className="form-control"
                                />
                              </div>
                              <div className="col-6 mb-3">
                                <select name="" className="form-select">
                                  <option value="" selected>
                                    07:00 - 07:30
                                  </option>
                                  <option value="">07:30 - 08:00</option>
                                  <option value="">08:00 - 09:00</option>
                                  <option value="">09:00 - 10:00</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Save changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
              <Footer />
              <ToastContainer />
            </>
          ) : (
            <Error404 />
          )}
        </>
      )}
    </>
  );
};

export default Admin;
