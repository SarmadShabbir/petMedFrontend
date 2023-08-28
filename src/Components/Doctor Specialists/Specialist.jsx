import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './specialists.css';
import BookDoctor from './BookDoctor';
import { useParams } from 'react-router-dom';
import Loader from '../../../Loader';
import axios from 'axios';

const Specialist = () => {
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { specialization } = useParams();

  // converting parameter
  function convertToNormalCase(camelOrPascalCase) {
    return camelOrPascalCase
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before each uppercase letter
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Add space between consecutive uppercase letters followed by lowercase letters
      .split(/\s+/) // Split the string by spaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word and convert the rest to lowercase
      .join(' '); // Join the words with spaces
  }
  const parsedData = convertToNormalCase(specialization);
  // fetching specialization based
  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const fetched = await axios.get(
          `https://petmedbackend.onrender.com/api/doctor/fetchAllDoctorsBySpecialization/${specialization}`
        );
        setSpecialists(fetched.data.doctor);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSpecialists();
  }, []);

  const [currentDoc, setCurrentDoctor] = useState({
    imgUrl: "",
    doctor_name: "",
    special: "",
    experience: "",
    doctorId: ''
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <section id='doctorbanner'>
            <div className='container'>
              <div className='row'>
                <div className='col-12 text-center text-capitalize'>
                  <h1>{parsedData + ' ' + 'Vets'}</h1>
                </div>
              </div>
            </div>
          </section>
          <section id='doctos_category'>
            <div className='container py-5'>
              <div className='row'>
                {specialists.map((data) => {
                  return (
                    <div className='col-4 mb-3' key={data.id}>
                      <div class='card'>
                        <img
                          src={`../../upload/${data.profilePhoto}`}
                          class='card-img-top'
                          alt='...'
                          width='414px'
                          height='276px'
                          style={{ objectFit: 'contain', cursor: 'pointer' }}
                          data-bs-toggle='modal'
                          data-bs-target='#modal2'
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
                        <div class='card-body'>
                          <h5 class='card-title'>
                            <span>name: </span>
                            {data.name}
                          </h5>
                          <p class='card-text mb-2'>
                            <span>specialist: </span>
                            {data.specialization}
                          </p>
                          <p class='card-text'>
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

export default Specialist;
