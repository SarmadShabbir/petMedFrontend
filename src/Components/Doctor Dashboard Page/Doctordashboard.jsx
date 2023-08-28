import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import "./doctorboard.css";
import { Link, useNavigate } from "react-router-dom";
import NotFound from "../ErrorPage/404error";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Loader";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import UpdateAppointMent from "./UpdateAppointMent";

const Doctordashboard = () => {
  const [doctorAvailableSlots, setDoctorAvailableSlots] = useState([]);
  const [appointmentCount, setAppointmentCount] = useState({
    todayAppointments: 0,
    futureAppointments: 0,
  });
  const [slotsInfo, setSlotsInfo] = useState({
    to: "",
    from: "",
    slotDate: "",
    doctorId: "",
  });
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState("null");
  const [disabled, setdisabled] = useState(true);
  const [reRender, setReRender] = useState(false);
  const [loading, setloading] = useState(true);
  const [style, setStyle] = useState(false);
  const [appointments, setAppointments] = useState(null);
  const [searchDate, setSearchDate] = useState();
  const [appointmentsRendering, setAppointmentsRendering] =
    useState("View All");
  const [appointmentLoading, setappointmentLoading] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    trigger,
    formState: { errors, isValid, isDirty },
  } = useForm();
  const [passwordData, setPasswordData] = useState({
    prevPassword: "",
    currentPassword: "",
    email: "",
  });
  const [currentCustomer, setCurrentCustomer] = useState({
    appointmentDate: null,
    customerName: null,
    customerId: null,
    appointmentStatus: null,
    appointmentId: null,
    doctorImage: null,
    doctorName: null,
  });
  function getMinDate() {
    const today = new Date();
    const todayDate = formatDate(today);
    return todayDate;
  }

  function getMaxDate() {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    return formatDate(maxDate);
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // handleSlotsChange

  const handleSlotsChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSlotsInfo((values) => ({ ...values, [name]: value }));
  };

  // handleChange
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUpdatedData((values) => ({ ...values, [name]: value }));
  };

  // handle password Change
  const handlePasswordChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPasswordData((values) => ({ ...values, [name]: value }));
  };

  // handle slot delete
  const slotDelete = async (_id) => {
    try {
      const requestData = { _id: _id };
      const response = await axios.delete(
        "http://localhost:8000/api/doctor/deleteSlot",
        { data: requestData }
      );

      if (response.data.status === "SUCCESS") {
        toast.success(response.data.message_en, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(response.data.message_en, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
      toast.error("An error occurred while deleting the slot.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // fetch slots
  const fetchDoctorSlots = async () => {
    try {
      const doctorData = localStorage.getItem("doctor");
      const parsedDoctorData = JSON.parse(doctorData);
      const doctorId = parsedDoctorData._id;
      axios
        .get(
          `http://localhost:8000/api/doctor/fetch/getDoctorSlots/${doctorId}`
        )
        .then((response) => {
          setDoctorAvailableSlots(response.data.slots);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDoctorSlots();
    const timer = setTimeout(() => {
      setloading(false);
      setappointmentLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // on component render getting doctor data
  useEffect(() => {
    const doctorData = localStorage.getItem("doctor");
    const parsedDoctorData = JSON.parse(doctorData);
    if (parsedDoctorData) {
      setDoctor(parsedDoctorData);
      setUpdatedData((values) => ({
        ...values,
        email: parsedDoctorData.email,
      }));
      setPasswordData((values) => ({
        ...values,
        email: parsedDoctorData.email,
      }));
      setSlotsInfo((values) => ({
        ...values,
        doctorId: parsedDoctorData._id,
      }));
      setCurrentCustomer((values) => ({
        ...values,
        doctorImage: parsedDoctorData.profilePhoto,
        doctorName: parsedDoctorData.name,
      }));
      setReRender(false);
      fetchAppointmentSlots();
      console.log(parsedDoctorData);
    }
  }, [reRender]);

  // handle logout
  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/Doctorlogin");
    }, 1000);
  };

  // updated Data State
  const [updatedData, setUpdatedData] = useState({
    title: "",
    name: "",
    phoneNumber: "",
    updatedEmail: "",
    email: "",
  });

  // updating contact information

  const handleUpdate = async (e) => {
    e.preventDefault();

    axios
      .patch("http://localhost:8000/api/doctor/updateDoctor", updatedData)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          toast.success(response.data.message_en, {
            position: toast.POSITION.TOP_RIGHT,
          });
          localStorage.clear;
          localStorage.setItem("doctor", JSON.stringify(response.data.data));
          setReRender(true);
          navigate("/doctor-dashboard");
          setdisabled(true);
        } else {
          toast.error(response.data.message_en, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };

  // handle Password Update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    axios
      .patch("http://localhost:8000/api/doctor/updatePassword", passwordData)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          toast.success(response.data.message_en, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            localStorage.clear;
            navigate("/Doctorlogin");
          }, 2000);
        } else {
          toast.error(response.data.message_en, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };

  // handle slot submit
  const handleSlotsSubmit = () => {
    axios
      .post("http://localhost:8000/api/doctor/addSlot", slotsInfo)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          if (response.data.status === "SUCCESS") {
            toast.success(response.data.message_en, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.error(response.data.message_en, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };

  // appointment count
  const findAppointmentCount = (convertedAppointments) => {
    const currentDate = new Date();

    let todayCount = 0;
    let futureCount = 0;

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    convertedAppointments.forEach((appointment) => {
      const appointmentDate = new Date(appointment.appointmentDate);
      const appointmentYear = appointmentDate.getFullYear();
      const appointmentMonth = appointmentDate.getMonth();
      const appointmentDay = appointmentDate.getDate();

      if (
        appointmentYear === currentYear &&
        appointmentMonth === currentMonth &&
        appointmentDay === currentDay
      ) {
        todayCount++;
      } else if (appointmentDate > currentDate) {
        futureCount++;
      }
    });

    setAppointmentCount((prevData) => ({
      ...prevData,
      todayAppointments: todayCount,
      futureAppointments: futureCount,
    }));
  };

  // fetch appointment slots
  const fetchAppointmentSlots = async () => {
    try {
      const doctorData = localStorage.getItem("doctor");
      const parsedDoctorData = JSON.parse(doctorData);
      if (parsedDoctorData) {
        const response = await axios.get(
          `http://localhost:8000/api/doctor/fetch/allAppointments/${parsedDoctorData._id}`
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
        findAppointmentCount(convertedAppointments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // View All Appointments

  const ViewAll = () => {
    return (
      <>
        {appointmentLoading ? (
          <tbody>
            <tr>
              <td style={{ width: "100%" }} colSpan={6}>
                <Loader size={15} spinner={true} containerHeight={"10vh"} />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <th scope="row">{appointment.to}</th>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.customerName}</td>
                <td>{appointment.phoneNo}</td>
                <td>
                  {appointment.appointmentStatus === "In Queue" ? (
                    <span className="badge bg-primary text-capitalize">
                      {appointment.appointmentStatus}
                    </span>
                  ) : appointment.appointmentStatus === "Cancelled" ? (
                    <span className="badge bg-danger text-capitalize">
                      {appointment.appointmentStatus}
                    </span>
                  ) : appointment.appointmentStatus === "Completed" ? (
                    <span className="badge bg-success text-capitalize">
                      Completed
                    </span>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  <i
                    style={{
                      cursor: "pointer",
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#modal2"
                    className="fa-solid fa-pen-to-square"
                    onClick={() => {
                      setCurrentCustomer((prevData) => ({
                        ...prevData,
                        appointmentDate: appointment.appointmentDate,
                        appointmentStatus: appointment.appointmentStatus,
                        customerId: appointment.customerId,
                        customerName: appointment.customerName,
                        appointmentId: appointment._id,
                      }));
                    }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </>
    );
  };

  // find Appointments
  const Find = () => {
    const filteredAppointments = appointments.filter(
      (appointment) => appointment.appointmentDate === searchDate
    );

    return (
      <>
        {appointmentLoading ? (
          <tbody>
            <tr>
              <td style={{ width: "100%" }} colSpan={6}>
                <Loader size={15} spinner={true} containerHeight={"10vh"} />
              </td>
            </tr>
          </tbody>
        ) : filteredAppointments.length > 0 ? (
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <th scope="row">{appointment.to}</th>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.customerName}</td>
                <td>{appointment.phoneNo}</td>
                <td>
                  {appointment.appointmentStatus === "In Queue" ? (
                    <span className="badge bg-primary text-capitalize">
                      {appointment.appointmentStatus}
                    </span>
                  ) : appointment.appointmentStatus === "Cancelled" ? (
                    <span className="badge bg-danger text-capitalize">
                      {appointment.appointmentStatus}
                    </span>
                  ) : appointment.appointmentStatus === "Completed" ? (
                    <span className="badge bg-success text-capitalize">
                      Completed
                    </span>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  <i
                    style={{
                      cursor: "pointer",
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#modal2"
                    className="fa-solid fa-pen-to-square"
                    onClick={() => {
                      setCurrentCustomer((prevData) => ({
                        ...prevData,
                        appointmentDate: appointment.appointmentDate,
                        appointmentStatus: appointment.appointmentStatus,
                        customerId: appointment.customerId,
                        customerName: appointment.customerName,
                        appointmentId: appointment._id,
                      }));
                    }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <div className="row">
            <div className="col-12 mt-3 text-center text-capitalize">
              <span id="nothing">no appointments found</span>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {doctor != "null" ? (
            <>
              <section className="login_header">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                          <div className="logo_img">
                            <Link
                              className="navbar-brand"
                              to={"/doctor-dashboard"}
                            >
                              <img className="w-100" src={logo} alt="" />
                            </Link>
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
                              <li className="nav-item text-uppercase d-flex align-items-center">
                                for doctors
                              </li>
                              <li>
                                <span
                                  type="button"
                                  className=" mt-2 position-relative"
                                >
                                  <i class="fa-regular fa-bell"></i>
                                  <span className="position-absolute ms-2 top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                                    0
                                    <span className="visually-hidden">
                                      unread messages
                                    </span>
                                  </span>
                                </span>
                              </li>
                              <li className="nav-item dropdown">
                                <a
                                  className="nav-link dropdown-toggle"
                                  href="#"
                                  role="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  {doctor.title + " " + doctor.name}
                                </a>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={handleLogout}
                                    >
                                      log out
                                    </a>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </section>
              <section id="doctor_dashboard">
                <div className="container">
                  <div className="row">
                    <div className="col-3 p-0">
                      <aside style={{ height: style && "100%" }}>
                        <ul className="nav nav-pills flex-column" id="myTab">
                          <li className="nav-item">
                            <a
                              href="#home"
                              data-bs-toggle="pill"
                              className="nav-link active"
                              onClick={() => setStyle(false)}
                            >
                              <i class="fa-solid fa-house me-2"></i>Home
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#appointment"
                              data-bs-toggle="pill"
                              className="nav-link"
                              onClick={() => setStyle(true)}
                            >
                              <i class="fa-solid fa-clock me-2"></i>appointment
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#manage"
                              data-bs-toggle="pill"
                              className="nav-link"
                              onClick={() => setStyle(false)}
                            >
                              <i class="fa-solid fa-list-check me-2"></i>manage
                              slots
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#contact"
                              data-bs-toggle="pill"
                              className="nav-link"
                              onClick={() => setStyle(false)}
                            >
                              <i class="fa-solid fa-phone me-2"></i>contact
                              information
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#password"
                              data-bs-toggle="pill"
                              className="nav-link"
                              onClick={() => setStyle(false)}
                            >
                              <i class="fa-solid fa-key me-2"></i>change
                              password
                            </a>
                          </li>
                        </ul>
                      </aside>
                    </div>
                    <div className="col-9 dashboard_content">
                      <div className="tab-content">
                        <div className="tab-pane fade show active" id="home">
                          <div className="sub_heading text-capitalize">
                            <h4> {doctor.title + " " + doctor.name}</h4>
                          </div>
                          <div className="progress_work">
                            <div className="row">
                              <div className="col-4 text-capitalize d-flex align-items-center">
                                <span className="me-2">0</span>
                                <p>profile views</p>
                              </div>
                              <div className="col-4 text-capitalize d-flex align-items-center">
                                <span className="me-2">
                                  {appointmentCount.futureAppointments}
                                </span>
                                <p>future appoitments</p>
                              </div>
                              <div className="col-4 text-capitalize d-flex align-items-center">
                                <span className="me-2">
                                  {appointmentCount.todayAppointments}
                                </span>
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
                                <span className="me-2">
                                  {appointmentCount.futureAppointments}
                                </span>
                                <p>future appoitments</p>
                              </div>
                              <div className="col-6 text-capitalize d-flex align-items-center">
                                <span className="me-2">
                                  {appointmentCount.todayAppointments}
                                </span>
                                <p>Today booked appointments</p>
                              </div>
                            </div>
                          </div>
                          <QueryContainer className="slots_work">
                            <div className="row">
                              <div className="col-3 text-capitalize">
                                <input
                                  type="date"
                                  className="form-control"
                                  value={searchDate}
                                  name="searchDate"
                                  onChange={(e) => {
                                    setSearchDate(e.target.value);
                                  }}
                                  max={getMaxDate()}
                                  min={getMinDate()}
                                />
                              </div>
                              <div
                                className="col-1 text-capitalize"
                                style={{ marginRight: "2%" }}
                              >
                                <button
                                  className="btn btn-dark ml-3"
                                  type="button"
                                  onClick={() => {
                                    setAppointmentsRendering("Find");
                                    setappointmentLoading(true);
                                    setTimeout(() => {
                                      setappointmentLoading(false);
                                    }, 1000);
                                  }}
                                >
                                  Find
                                </button>
                              </div>
                              <div className="col-3 text-capitalize">
                                <button
                                  className="btn btn-secondary ml-3"
                                  type="button"
                                  onClick={() => {
                                    setAppointmentsRendering("View All");
                                    setappointmentLoading(true);
                                    setTimeout(() => {
                                      setappointmentLoading(false);
                                    }, 1000);
                                  }}
                                >
                                  View All
                                </button>
                              </div>
                            </div>
                          </QueryContainer>
                          <AppointmentTable className="display_appointments mt-4">
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
                                      <th scope="col">action</th>
                                    </tr>
                                  </thead>
                                  {appointmentsRendering === "View All" ? (
                                    <ViewAll />
                                  ) : (
                                    <Find />
                                  )}
                                </table>
                              </div>
                            </div>
                          </AppointmentTable>
                        </div>
                        <div className="tab-pane fade" id="manage">
                          <div className="sub_heading text-capitalize">
                            <h4>Manage Slots</h4>
                          </div>
                          <div className="slots_work">
                            <form
                              method="POST"
                              onSubmit={handleSubmit(handleSlotsSubmit)}
                            >
                              <div className="row">
                                <div className="col-3 text-capitalize">
                                  <input
                                    type="text"
                                    id="from"
                                    name="from"
                                    placeholder="From"
                                    {...register("from", {
                                      required: {
                                        value: true,
                                        message: "From is required",
                                      },
                                      pattern: {
                                        value:
                                          /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                                        message: "Invalid Format (e.g., 12:00)",
                                      },
                                      onChange: handleSlotsChange,
                                    })}
                                    className="form-control"
                                    onBlur={() => {
                                      trigger("from");
                                    }}
                                  />
                                  {errors.from && (
                                    <span
                                      style={{
                                        color: "red",
                                        fontSize: "0.8rem",
                                      }}
                                    >
                                      *{errors.from.message}
                                    </span>
                                  )}
                                </div>
                                <div className="col-3 text-capitalize">
                                  <input
                                    type="text"
                                    id="to"
                                    name="to"
                                    placeholder="To"
                                    {...register("to", {
                                      required: {
                                        value: true,
                                        message: "To is required",
                                      },
                                      pattern: {
                                        value:
                                          /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                                        message: "Invalid Format (e.g., 12:00)",
                                      },
                                      onChange: handleSlotsChange,
                                    })}
                                    className="form-control"
                                    onBlur={() => {
                                      trigger("to");
                                    }}
                                  />
                                  {errors.to && (
                                    <span
                                      style={{
                                        color: "red",
                                        fontSize: "0.8rem",
                                      }}
                                    >
                                      *{errors.to.message}
                                    </span>
                                  )}
                                </div>
                                <div className="col-3 text-capitalize">
                                  <input
                                    type="date"
                                    id="slotDate"
                                    name="slotDate"
                                    {...register("slotDate", {
                                      required: {
                                        value: true,
                                        message: "Slot Date is required",
                                      },
                                      onChange: handleSlotsChange,
                                    })}
                                    className="form-control"
                                    placeholder="mm/dd/yy"
                                    min={getMinDate()}
                                    max={getMaxDate()}
                                  />
                                  {errors.slotDate && (
                                    <span
                                      style={{
                                        color: "red",
                                        fontSize: "0.8rem",
                                      }}
                                    >
                                      *{errors.slotDate.message}
                                    </span>
                                  )}
                                </div>
                                <div className="col-3 text-capitalize">
                                  <button className="btn btn-secondary">
                                    Add Slot
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="display_appointments mt-5">
                            <div className="sub_heading text-capitalize">
                              <h4>Current Slots</h4>
                            </div>
                            <div className="category mt-4">
                              <div className="row">
                                <div className="col-12">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">From</th>
                                        <th scope="col">To</th>
                                        <th scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {doctorAvailableSlots.length > 0 ? (
                                        doctorAvailableSlots.map((slot) => {
                                          return (
                                            <tr key={slot._id}>
                                              <td>{slot.slotDate}</td>
                                              <td>{slot.from}</td>
                                              <td>{slot.to}</td>
                                              <td
                                                onClick={() =>
                                                  slotDelete(slot._id)
                                                }
                                              >
                                                <i
                                                  className="fa-solid fa-trash"
                                                  style={{ color: "red" }}
                                                ></i>
                                              </td>
                                            </tr>
                                          );
                                        })
                                      ) : (
                                        <div className="row">
                                          <div className="col-12 mt-3 text-center text-capitalize">
                                            <span id="nothing">
                                              No Slot Found
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="contact">
                          <div className="sub_heading text-capitalize">
                            <h4>contact information</h4>
                          </div>
                          <div className="contact_info">
                            <form onSubmit={handleUpdate} method="post">
                              <div className="row">
                                <div className="col-6 text-capitalize mb-3">
                                  <label htmlFor="">title</label>
                                  <input
                                    type="text"
                                    placeholder="Mr./Ms."
                                    value={
                                      disabled
                                        ? doctor.title
                                        : updatedData.title
                                    }
                                    name="title"
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    disabled={disabled}
                                  />
                                </div>
                                <div className="col-6 text-capitalize mb-3">
                                  <label htmlFor="">name</label>
                                  <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    placeholder="Enter Name"
                                    className="form-control"
                                    value={
                                      disabled ? doctor.name : updatedData.name
                                    }
                                    required
                                    disabled={disabled}
                                  />
                                </div>
                                <div className="col-6 text-capitalize mb-3">
                                  <label htmlFor="">phone</label>
                                  <input
                                    type="tel"
                                    name="phoneNumber"
                                    onChange={handleChange}
                                    placeholder="Enter Phone Number"
                                    value={
                                      disabled
                                        ? doctor.phoneNumber
                                        : updatedData.phoneNumber
                                    }
                                    className="form-control"
                                    required
                                    disabled={disabled}
                                  />
                                </div>
                                <div className="col-6 text-capitalize mb-3">
                                  <label htmlFor="">email</label>
                                  <input
                                    type="email"
                                    placeholder="Enter Email"
                                    name="updatedEmail"
                                    onChange={handleChange}
                                    value={
                                      disabled
                                        ? doctor.email
                                        : updatedData.updatedEmail
                                    }
                                    className="form-control"
                                    required
                                    disabled={disabled}
                                  />
                                </div>
                                <div className="col-12 text-end">
                                  {disabled === true ? (
                                    <button
                                      type="button"
                                      className="btn btn-secondary text-capitalize "
                                      onClick={() => setdisabled(false)}
                                    >
                                      edit
                                    </button>
                                  ) : (
                                    <div>
                                      <button
                                        type="button"
                                        className="btn btn-light text-capitalize cancel-btn"
                                        onClick={() => setdisabled(true)}
                                      >
                                        cancel
                                      </button>
                                      <button
                                        type="submit"
                                        className="btn btn-success text-capitalize "
                                      >
                                        update
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="password">
                          <div className="sub_heading text-capitalize">
                            <h4>change password</h4>
                          </div>
                          <div className="contact_info">
                            <form method="post" onSubmit={handlePasswordUpdate}>
                              <div className="row">
                                <div className="col-6 text-capitalize mb-3">
                                  <label htmlFor="">current password</label>
                                  <input
                                    type="password"
                                    name="prevPassword"
                                    onChange={handlePasswordChange}
                                    value={passwordData.prevPassword}
                                    placeholder="Current Password"
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-6 text-capitalize mb-3">
                                  <label htmlFor="">new password</label>
                                  <input
                                    type="password"
                                    name="currentPassword"
                                    onChange={handlePasswordChange}
                                    value={passwordData.currentPassword}
                                    placeholder="New Password"
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-6 text-capitalize mb-3">
                                  <label htmlFor="">confirm password</label>
                                  <input
                                    type="password"
                                    name=""
                                    placeholder="confirm password"
                                    className="form-control"
                                    required
                                  />
                                </div>
                                <div className="col-12 ">
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
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <UpdateAppointMent
                appointmentDate={currentCustomer.appointmentDate}
                appointmentStatus={currentCustomer.appointmentStatus}
                customerName={currentCustomer.customerName}
                appointmentId={currentCustomer.appointmentId}
                doctorImage={currentCustomer.doctorImage}
                doctorName={currentCustomer.doctorName}
              />
              <ToastContainer />
            </>
          ) : (
            <div>
              <NotFound />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Doctordashboard;

const QueryContainer = styled.div`
  background-color: white;
  padding: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin-top: 20px;
  border-radius: 6px;
`;

const AppointmentTable = styled.div`
  background-color: white;
  padding: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin-top: 20px;
  border-radius: 6px;
`;
