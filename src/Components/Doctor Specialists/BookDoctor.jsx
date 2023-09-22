import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const BookDoctor = (props) => {
  const today = new Date().toISOString().split("T")[0];
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [bookingInfo, setBookingInfo] = useState({
    customerId: null,
    appointmentDate: "",
    doctorId: null,
    to: null,
    from: null,
    slotId: "",
    customerName: "",
    phoneNo: null,
  });

  const navigate = useNavigate();

  // fetch slots
  const fetchSlots = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/doctor/fetch/getDoctorSlots/${props.doctorId}`
      );
      setDoctorSlots(response.data.slots);
    } catch (error) {
      console.log(error);
    }
  };
  // book vet
  const bookVet = async () => {
    try {
      if (bookingInfo.customerId === null) {
        toast.error("Please Login First", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          navigate("/userlogin");
        }, 3000);
      } else if (bookingInfo.from === null) {
        toast.error("Please Select a slot", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (bookingInfo.appointmentDate === null) {
        toast.error("Please Select Appointment Date", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        const response = await axios.post(
          "http://localhost:8000/api/paitent/bookDoctor",
          bookingInfo
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const paitentData = localStorage.getItem("patient");
    const parsedPaitentData = JSON.parse(paitentData);
    if (parsedPaitentData) {
      setBookingInfo((prevData) => ({
        ...prevData,
        customerId: parsedPaitentData._id,
        customerName:
          parsedPaitentData.firstName + " " + parsedPaitentData.lastName,
        phoneNo: parsedPaitentData.phoneNumber,
      }));
    } else {
      setBookingInfo((prevData) => ({
        ...prevData,
        customerId: null,
      }));
    }
    setBookingInfo((prevData) => ({
      ...prevData,
      doctorId: props.doctorId,
    }));
    fetchSlots();
  }, [props.doctorId]);

  const handleSlotChange = (selectedValue, selectedIndex) => {
    const [to, from] = selectedValue.split(" - ");
    const selectedSlot = doctorSlots.find(
      (slot) => slot.slotDate === bookingInfo.appointmentDate
    );

    if (selectedSlot) {
      setBookingInfo((prevData) => ({
        ...prevData,
        to,
        from,
        slotId: selectedSlot._id,
      }));
    } else {
      console.error("Selected slot not found for the given date.");
    }
  };

  return (
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
              style={{ color: "#00797a" }}
            >
              Book Appointment
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="row">
                <div className="col-12 mb-3 d-flex justify-content-center">
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={props.imgUrl}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 mb-3  d-flex justify-content-center">
                  <h2 className="fs-5 text-capitalize fw-semibold pl-5">
                    {`Dr. ${props.doctor_name}`}
                  </h2>
                </div>
              </div>
              <form method="post">
                <div className="row">
                  <div className="col-6 mb-3">
                    <input
                      type="date"
                      name="appointmentDate"
                      className="form-control"
                      min={today}
                      value={bookingInfo.appointmentDate}
                      onChange={(e) => {
                        setBookingInfo((prevData) => ({
                          ...prevData,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <select
                      name=""
                      className="form-select"
                      onChange={(event) =>
                        handleSlotChange(
                          event.target.value,
                          event.target.selectedIndex
                        )
                      }
                      value={`${bookingInfo.to} - ${bookingInfo.from}`}
                    >
                      <option>-- Please Select A Slot --</option>
                      {doctorSlots.some(
                        (slot) => slot.slotDate === bookingInfo.appointmentDate
                      ) ? (
                        doctorSlots.map((slot) => {
                          if (slot.slotDate === bookingInfo.appointmentDate) {
                            return (
                              <option
                                key={slot.id}
                                value={`${slot.to} - ${slot.from}`}
                              >
                                {slot.from} - {slot.to}
                              </option>
                            );
                          } else {
                            return null; // Skip rendering for other dates
                          }
                        })
                      ) : (
                        <option>Slot is not Available</option>
                      )}
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer d=flex ">
            <button
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: "#00797a" }}
              onClick={bookVet}
            >
              Book Vet
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookDoctor;
