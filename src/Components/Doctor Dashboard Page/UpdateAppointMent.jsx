import React, { useEffect } from "react";
import { Avatar } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateAppointMent = ({
  appointmentDate,
  customerName,
  appointmentStatus,
  appointmentId,
  doctorImage,
  doctorName,
}) => {
  const [updateStatusData, setUpdatedStatusData] = useState({
    newStatus: "",
    basicGroming: "",
    medicines: "",
    charges: "",
    appointmentId,
    doctorName,
    doctorImage,
  });
  useEffect(() => {
    setUpdatedStatusData((prevData) => ({
      ...prevData,
      appointmentId: appointmentId,
    }));
  }, [appointmentId]);
  // handle change status
  const handleStatusChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUpdatedStatusData((values) => ({ ...values, [name]: value }));
  };

  // handle update status

  const updateStatus = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/doctor/updateStatus`,
        updateStatusData
      );
      console.log(response);
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
    } catch (err) {
      console.log(err);
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
              Update Appointment
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
                  <div className="col-12 mb-3 d-flex justify-content-center">
                    <Avatar sx={{ width: 100, height: 100 }} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-3  d-flex justify-content-center">
                    <h2 className="fs-5 text-capitalize fw-semibold pl-5">
                      {customerName}
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 mb-3">
                    <input
                      type="text"
                      value={appointmentDate}
                      name=""
                      className="form-control"
                    />
                  </div>
                  <div className="col-6 mb-3">
                    {appointmentStatus === "Completed" ||
                    appointmentStatus === "Cancelled" ? (
                      <select className="form-select" disabled>
                        <option>{appointmentStatus}</option>
                      </select>
                    ) : (
                      <select
                        name="newStatus"
                        className="form-select"
                        onChange={(e) =>
                          setUpdatedStatusData((values) => ({
                            ...values,
                            newStatus: e.target.value,
                          }))
                        }
                      >
                        <option value="" selected>
                          Update Status
                        </option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                      </select>
                    )}
                  </div>
                </div>
                {updateStatusData.newStatus === "Completed" && (
                  <>
                    <div className="row mt-6">
                      <div className="col-6">
                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control"
                            name="basicGroming"
                            placeholder="Basic Groming"
                            required
                            autoComplete="on"
                            onChange={handleStatusChange}
                            value={updateStatusData.basicGroming}
                          />
                          <label
                            for="basicGroming"
                            style={{ fontWeight: "normal" }}
                          >
                            Basic Groming
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control"
                            name="medicines"
                            placeholder="enter Medicines"
                            required
                            autoComplete="on"
                            onChange={handleStatusChange}
                            value={updateStatusData.medicines}
                          />
                          <label
                            for="medicines"
                            style={{ fontWeight: "normal" }}
                          >
                            Medicines
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                      <div className="col-6">
                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control"
                            name="charges"
                            placeholder="enter charges"
                            required
                            autoComplete="on"
                            onChange={handleStatusChange}
                            value={updateStatusData.charges}
                          />
                          <label for="charges" style={{ fontWeight: "normal" }}>
                            Charges
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
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
              {appointmentStatus === "Completed" ||
              appointmentStatus === "Cancelled" ? (
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#00797a" }}
                  disabled
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#00797a" }}
                  onClick={updateStatus}
                >
                  Save changes
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateAppointMent;
