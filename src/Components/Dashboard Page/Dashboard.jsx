import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import './dashboard.css';
import NotFound from '../ErrorPage/404error';
import Loader from '../../../Loader';

const Dashboard = () => {
  const [patient, setPaitent] = useState('null');
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const patientData = localStorage.getItem('patient');
    const parsedPatientData = JSON.parse(patientData);
    if (parsedPatientData) {
      setPaitent(parsedPatientData);
    }
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {patient != 'null' ? (
            <>
              <Header />
              <section id='patient_dashboard'>
                <div className='container-fluid'>
                  <div className='row'>
                    <div className='col-6 left_patient_info'>
                      <div className='pet_img text-center'>
                        <img
                          src={`../../../upload/${patient.profilePhoto}`}
                          className='w-100'
                          style={{objectFit: 'inherit'}}
                          alt=''
                        />
                        <span className='text-capitalize d-block  text-white fw-semibold fs-5'>
                          leos
                        </span>
                        <span className='text-capitalize text-white'>
                          {patient.firstName + "'s"} pet
                        </span>
                      </div>
                      <div className='pet_quality'>
                        <table className='table unbordered'>
                          <thead>
                            <tr>
                              <th scope='col'>type</th>
                              <th scope='col'>age</th>
                              <th scope='col'>Breed</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{patient.type}</td>
                              <td>{patient.petAge}</td>
                              <td>{patient.petBreed}</td>
                            </tr>
                            <tr>
                              <th>weight</th>
                              <th>color</th>
                            </tr>
                            <tr>
                              <td>{patient.weight}</td>
                              <td>{patient.color}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className='description mt-5 text-white'>
                        <h4 className='text-capitalize'>about</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Commodi vel neque inventore iste modi iure,
                          atque quae non necessitatibus. Modi culpa saepe earum
                          obcaecati cum repellat. Laudantium maiores temporibus
                          maxime obcaecati cupiditate sed impedit tenetur! Vel,
                          cupiditate. Sunt, et voluptas?
                        </p>
                      </div>
                    </div>
                    <div className='col-6 history'>
                      <h2 className='text-capitalize text-center'>history</h2>
                      <div className='history_box mt-5'>
                        <div className='card mb-3'>
                          <div className='row g-0'>
                            <div className='col-md-4 d-flex align-items-center'>
                              <img
                                src='/doctor_history.jpg'
                                className='img-fluid rounded ms-1'
                                alt='...'
                              />
                            </div>
                            <div className='col-md-8'>
                              <div className='card-body ms-2 text-white text-capitalize'>
                                <h5 className='card-title'>doctor sami</h5>
                                <p className='card-text'>modal town</p>
                                <span>23 june 2023</span>
                                <table className='table'>
                                  <tbody>
                                    <tr>
                                      <td>basic groaming</td>
                                      <td>de-warming</td>
                                    </tr>
                                    <tr>
                                      <td>medicne</td>
                                      <td>drip, injection</td>
                                    </tr>
                                    <tr>
                                      <td>charges</td>
                                      <td>4000Rs.</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
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

export default Dashboard;
