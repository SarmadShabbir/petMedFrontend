import React from 'react';
import './banner.css';
import { Link } from 'react-router-dom';
import cat from '../../assets/cat.png';
import dog from '../../assets/dog.png';
import bird from '../../assets/bird.png';
import fish from '../../assets/fish.png';
import reptile from '../../assets/reptile.png';

const Banner = () => {
  return (
    <>
      <section id='banner'>
        <div className='banner_img'>
          <img src='banner_doctor.png' className='w-100' alt='' />
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-8'>
              {/* <div className="banner_img">
                            <img src="banner_doctor.png" className='w-100' alt="" />
                        </div> */}
              <div className='banner_info text-uppercase'>
                <h1>find the best vet near you</h1>
              </div>
            </div>
            <div className='col-4 text-end'>
              <button
                className='btn btn-primary'
                data-bs-toggle='modal'
                data-bs-target='#exampleModa3'
              >
                book appointment
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id='banner_slider'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 text-center text-capitalize'>
              <h1>find vets accordingly</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 mt-4'>
              <div className='owl-carousel owl-theme' id='first_owl'>
                <div className='item'>
                  <div className='pet_box'>
                    <div className='pet_img'>
                      <img src={cat} className='w-100' alt='' />
                    </div>
                    <div className='pet_heading'>
                      <h4>cat</h4>
                    </div>
                  </div>
                </div>
                <div className='item'>
                  <div className='pet_box'>
                    <div className='pet_img'>
                      <img src={dog} className='w-100' alt='' />
                    </div>
                    <div className='pet_heading'>
                      <h4>dog</h4>
                    </div>
                  </div>
                </div>
                <div className='item'>
                  <div className='pet_box'>
                    <div className='pet_img'>
                      <img src={bird} className='w-100' alt='' />
                    </div>
                    <div className='pet_heading'>
                      <h4>bird</h4>
                    </div>
                  </div>
                </div>
                <div className='item'>
                  <div className='pet_box'>
                    <div className='pet_img'>
                      <img src={fish} className='w-100' alt='' />
                    </div>
                    <div className='pet_heading'>
                      <h4>fish</h4>
                    </div>
                  </div>
                </div>
                <div className='item'>
                  <div className='pet_box'>
                    <div className='pet_img'>
                      <img src={reptile} className='w-100' alt='' />
                    </div>
                    <div className='pet_heading'>
                      <h4>reptile</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModa3">
                    Launch demo modal
                </button> */}

        <div
          className='modal fade'
          id='exampleModa3'
          tabindex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1
                  className='modal-title fs-3 text-capitalize fw-bold'
                  id='exampleModalLabel'
                >
                  appointment
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div class='modal-body'>
                <div className='container'>
                  <div className='row'>
                    <div className='col-6'>
                      <div className='mapouter'>
                        <div className='gmap_canvas'>
                          <iframe
                            class='gmap_iframe'
                            height='100px'
                            width='100%'
                            frameborder='0'
                            scrolling='no'
                            marginheight='0'
                            marginwidth='0'
                            src='https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=lahore university of education&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
                          ></iframe>
                          <a href='https://mcpepro.com/'>Minecraft Download</a>
                        </div>
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='modal_heading text-capitalize'>
                        <h3 className='fs-4 fw-bold'>
                          doctor specialists category
                        </h3>
                      </div>
                      <div className='category mt-4'>
                        <Link to={'/doctor-specialists'}>
                          <span className='badge text-bg-warning'>
                            Food animal
                          </span>
                        </Link>
                        <Link to={'/doctor-specialists'}>
                          <span className='badge text-bg-info'>
                            Beef cattle
                          </span>
                        </Link>
                        <Link to={'/doctor-specialists'}>
                          <span className='badge text-bg-info'>Nutrition</span>
                        </Link>
                        <Link to={'/doctor-specialists'}>
                          <span className='badge text-bg-primary'>
                            shelter medicine
                          </span>
                        </Link>
                        <Link to={'/doctor-specialists'}>
                          <span className='badge text-bg-secondary'>
                            Reptile and amphibian
                          </span>
                        </Link>
                        <Link to={'/doctor-specialists'}>
                          <span className='badge text-bg-light'>
                            Bacteriology
                          </span>
                        </Link>
                        <Link to={'/doctor-specialists'}>
                          <span className='badge text-bg-dark'>
                            Parasitology
                          </span>
                        </Link>
                        <Link to={'/doctor-specialists'}>
                          <span className='badge text-bg-dark'>
                            Clinical pathology
                          </span>
                        </Link>
                        <Link to={'/doctor-specialists'}>
                          <span className='badge text-bg-dark'>
                            Small animal surgery
                          </span>
                        </Link>
                        <Link to={'/doctor-specialists'}>
                          <span className='badge text-bg-dark'>
                            large animal surgery
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
                <button type='button' className='btn btn-primary'>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
