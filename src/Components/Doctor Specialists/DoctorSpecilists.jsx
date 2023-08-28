import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./specialists.css";
import BookDoctor from "./BookDoctor";
import axios from "axios";
import Loader from "../../../Loader";

const DoctorSpecilists = () => {
  const [doctors, setDoctors] = useState();
  const [currentDoc, setCurrentDoctor] = useState({
    imgUrl: "",
    doctor_name: "",
    special: "",
    experience: "",
    doctorId: ''
  });
  const [loading, setLoading] = useState(true);

  // fetching Doctors
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const fetched = await axios.get(
          "http://localhost:8000/api/doctor/fetchAllDoctors"
        );
        setDoctors(fetched.data.doctors);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDoctor();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <section id="doctorbanner">
            <div className="container">
              <div className="row">
                <div className="col-12 text-center text-capitalize">
                  <h1>doctors specialists</h1>
                </div>
              </div>
            </div>
          </section>
          <section id="doctos_category">
            <div className="container py-5">
              <div className="row">
                {doctors.map((data) => {
                  return (
                    <div className="col-4 mb-3" key={data._id}>
                      <div class="card">
                        <img
                          src={`../../upload/${data.profilePhoto}`}
                          class="card-img-top"
                          alt="..."
                          width="414px"
                          height="276px"
                          style={{ objectFit: "contain", cursor: "pointer" }}
                          data-bs-toggle="modal"
                          data-bs-target="#modal2"
                          onClick={() => {
                            setCurrentDoctor({
                              imgUrl: `../../upload/${data.profilePhoto}`,
                              doctor_name: data.name,
                              special: data.specialization,
                              city: data.city,
                              doctorId: data._id,
                            });
                          }}
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
                            <span>City: </span>
                            {data.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* <div className="col-4">
                            <div class="card">
                                <img src="boyone.jpg" class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title"><span>name: </span>abdullah</h5>
                                    <p class="card-text mb-2"><span>specialist: </span>dog specialist</p>
                                    <p class="card-text"><span>experience: </span>4 years of experience</p>
                                </div>
                            </div>
                        </div> */}
              </div>
            </div>
            <BookDoctor
              imgUrl={currentDoc.imgUrl}
              doctor_name={currentDoc.doctor_name}
              doctorId = {currentDoc.doctorId}
            />
          </section>
          <Footer />
        </>
      )}
    </>
  );
};

export default DoctorSpecilists;
