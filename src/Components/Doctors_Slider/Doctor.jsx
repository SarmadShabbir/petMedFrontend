import React from 'react'
import './doctor.css'

const Doctor = () => {
    // let doctor_slider = [
    //     { id: 1, doctorImg: '/banner_doctor.png', name: 'sunny' },
    //     { id: 2, doctorImg: '/banner_doctor.png', name: 'testing' },
    // ]
    return (
        <>
            <section id="doctor_slider">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center text-capitalize">
                            <h2>featured vets</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="owl-carousel owl-theme" id='owl_two'>
                                <div className="item">
                                    <div className="review-content">
                                        <div className="user-info">
                                            <img src="/doctor_one.png" alt="" />
                                            <h3>abdullah</h3>

                                            <span className='text-uppercase d-block text-center mt-2 fw-semibold'>bvm & ar</span>
                                            <p className='text-capitalize'>
                                                <span className="fw-semibold">specialist: </span>
                                                dog specialist
                                            </p>
                                            
                                            <p className='text-capitalize'>
                                                <span className="fw-semibold">experience: </span>
                                                4 years of experience
                                            </p>
                                            <p className='text-capitalize'>
                                                <span className="fw-semibold">total patients: </span>
                                                500 total patients
                                            </p>
                                            <div className="star-box">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                            </div>
                                            {/* <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sapiente sit consectetur nihil atque corrupti et quos dolores mollitia cupiditate.
                                                Dicta sapiente sit consectetur nihil atque corrupti et quos dolores mollitia cupiditate.
                                            </p> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="review-content">
                                        <div className="user-info">
                                            <img src="/femaledoctor.png" alt="" />
                                            <h3>amna doctor</h3>
                                            <span className='text-uppercase d-block text-center mt-2 fw-semibold'>bvm & ar</span>
                                            <p className='text-capitalize'>
                                                <span className="fw-semibold">specialist: </span>
                                                birds specialist
                                            </p>
                                            
                                            <p className='text-capitalize'>
                                                <span className="fw-semibold">experience: </span>
                                                5 years of experience
                                            </p>
                                            <p className='text-capitalize'>
                                                <span className="fw-semibold">total patients: </span>
                                                590 total patients
                                            </p>
                                            <div className="star-box">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                            </div>
                                            {/* <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sapiente sit consectetur nihil atque corrupti et quos dolores mollitia cupiditate.
                                                Dicta sapiente sit consectetur nihil atque corrupti et quos dolores mollitia cupiditate.
                                            </p> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="review-content">
                                        <div className="user-info">
                                            <img src="/doctor_one.png" alt="" />
                                            <h3>muzamil doctor</h3>
                                            <span className='text-uppercase d-block text-center mt-2 fw-semibold'>bvm & ar</span>
                                            <p className='text-capitalize'>
                                                <span className="fw-semibold">specialist: </span>
                                                fish specialist
                                            </p>
                                            
                                            <p className='text-capitalize'>
                                                <span className="fw-semibold">experience: </span>
                                                8 years of experience
                                            </p>
                                            <p className='text-capitalize'>
                                                <span className="fw-semibold">total patients: </span>
                                                700 total patients
                                            </p>
                                            <div className="star-box">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                            </div>
                                            {/* <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sapiente sit consectetur nihil atque corrupti et quos dolores mollitia cupiditate.
                                                Dicta sapiente sit consectetur nihil atque corrupti et quos dolores mollitia cupiditate.
                                            </p> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="review-content">
                                        <div className="user-info">
                                            <img src="/femaledoctor.png" alt="" />
                                            <h3>fatima tahir</h3>
                                            <span className='text-uppercase d-block text-center mt-2 fw-semibold'>bvm & ar</span>
                                            <p className='text-capitalize'>
                                                <span className="fw-semibold">specialist: </span>
                                                cat specialist
                                            </p>
                                            
                                            <p>
                                                <span className="fw-semibold">experience: </span>
                                                3 years of experience
                                            </p>
                                            <p>
                                                <span className="fw-semibold">total patients: </span>
                                                400 total patients
                                            </p>
                                            <div className="star-box">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                            </div>
                                            {/* <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sapiente sit consectetur nihil atque corrupti et quos dolores mollitia cupiditate.
                                                Dicta sapiente sit consectetur nihil atque corrupti et quos dolores mollitia cupiditate.
                                            </p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Doctor