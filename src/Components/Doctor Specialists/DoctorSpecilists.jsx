import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './specialists.css';
import BookDoctor from './BookDoctor';

const DoctorSpecilists = () => {
  const [currentDoc, setCurrentDoctor] = useState({
    imgUrl: '',
    doctor_name: '',
    special: '',
    experience: '',
  });

  let doctors_category = [
    {
      id: 1,
      imgUrl: 'aliza.jpg',
      doctor_name: 'aliza',
      special: 'birds specialist',
      experience: '3 years of experience',
    },
    {
      id: 2,
      imgUrl: 'boyone.jpg',
      doctor_name: 'abdullah',
      special: 'dogs specialist',
      experience: '4 years of experience',
    },
    {
      id: 3,
      imgUrl: 'boytwo.jpg',
      doctor_name: 'muzamil',
      special: 'reptile specialist',
      experience: '3 years of experience',
    },
    {
      id: 4,
      imgUrl: 'boyfour.jpg',
      doctor_name: 'hannan',
      special: 'fishs specialist',
      experience: '3 years of experience',
    },
    {
      id: 5,
      imgUrl: 'femaletwo.jpg',
      doctor_name: 'tokyo',
      special: 'nuerology specialist',
      experience: '3 years of experience',
    },
    {
      id: 6,
      imgUrl: 'femalethree.jpg',
      doctor_name: 'carla',
      special: 'nutrition specialist',
      experience: '3 years of experience',
    },
  ];
  return (
    <>
      <Header />
      <section id='doctorbanner'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 text-center text-capitalize'>
              <h1>doctors specialists</h1>
            </div>
          </div>
        </div>
      </section>
      <section id='doctos_category'>
        <div className='container py-5'>
          <div className='row'>
            {doctors_category.map((data) => {
              return (
                <div className='col-4 mb-3' key={data.id}>
                  <div class='card'>
                    <img
                      src={data.imgUrl}
                      class='card-img-top'
                      alt='...'
                      width='414px'
                      height='276px'
                      style={{ objectFit: 'contain', cursor: 'pointer' }}
                      data-bs-toggle='modal'
                      data-bs-target='#modal2'
                      onClick={() => {
                        setCurrentDoctor({
                          imgUrl: data.imgUrl,
                          doctor_name: data.doctor_name,
                          special: data.special,
                          experience: data.experience,
                        });
                      }}
                    />
                    <div class='card-body'>
                      <h5 class='card-title'>
                        <span>name: </span>
                        {data.doctor_name}
                      </h5>
                      <p class='card-text mb-2'>
                        <span>specialist: </span>
                        {data.special}
                      </p>
                      <p class='card-text'>
                        <span>experience: </span>
                        {data.experience}
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
        />
      </section>
      <Footer />
    </>
  );
};

export default DoctorSpecilists;
