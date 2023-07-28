import React from 'react';
import logo from '../../assets/logo.png';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Navigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [patient, setPaitent] = useState('null');
  const [doctor, setDoctor] = useState('not null');
  useEffect(() => {
    const patientData = localStorage.getItem('patient');
    if (patientData) {
      setPaitent(parsedPatientData);
      const parsedPatientData = JSON.parse(patientData);
    }
    const doctorData = localStorage.getItem('doctor');
    if (doctorData) {
      const parsedDoctorData = JSON.parse(doctorData);
      setDoctor(parsedDoctorData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate('/userlogin');
    }, 1000);
  };
  return (
    <header>
      <div className='container'>
        <div className='row d-flex align-items-center'>
          <div className='col-12'>
            <nav className='navbar navbar-expand-lg'>
              <div className='container-fluid'>
                <div className='logo_img'>
                  <Link className='navbar-brand' to={'/'}>
                    <img className='w-100' src={logo} alt='' />
                  </Link>
                </div>
                <button
                  className='navbar-toggler'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#navbarSupportedContent'
                  aria-controls='navbarSupportedContent'
                  aria-expanded='false'
                  aria-label='Toggle navigation'
                >
                  <span className='navbar-toggler-icon'></span>
                </button>
                <div
                  className='collapse navbar-collapse'
                  id='navbarSupportedContent'
                >
                  <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                    <li className='nav-item'>
                      <Link className='nav-link' aria-current='page' to={'/'}>
                        Home
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link className='nav-link' to={'/labs'}>
                        laboratory
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link className='nav-link' to={'/blog'}>
                        Blogs
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link className='nav-link' to={'/complain-form  '}>
                        complaint
                      </Link>
                    </li>
                    {patient === 'null' && doctor === 'not null' ? (
                      <li class='nav-item dropdown' id='login_link'>
                        <a
                          class='nav-link dropdown-toggle'
                          href='#'
                          role='button'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                        >
                          login
                        </a>
                        <ul class='dropdown-menu'>
                          <li>
                            <Link class='dropdown-item' to={'/userlogin'}>
                              as patient
                            </Link>
                          </li>
                          <li>
                            <Link class='dropdown-item' to={'/Doctorlogin'}>
                              as doctor
                            </Link>
                          </li>
                        </ul>
                      </li>
                    ) : (
                      <li class='nav-item dropdown' id='login_link'>
                        <a
                          class='nav-link dropdown-toggle'
                          href='#'
                          role='button'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                        >
                          <AccountCircleIcon
                            className='paitent__icon'
                            fontSize='medium'
                          />
                        </a>
                        <ul class='dropdown-menu'>
                          {doctor === 'not null' ? (
                            <li>
                              <Link class='dropdown-item' to={'/userdashboard'}>
                                Dashboard
                              </Link>
                            </li>
                          ) : (
                            <li>
                              <Link
                                class='dropdown-item'
                                to={'/doctor-dashboard'}
                              >
                                Dashboard
                              </Link>
                            </li>
                          )}
                          <li>
                            <div class='dropdown-item' onClick={handleLogout}>
                              Logout
                            </div>
                          </li>
                        </ul>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          {/* <div className="col-3">
                        <div className="login_box">
                            
                            <div className="dropdown">
                                <span className=" dropdown-toggle text-capitalize" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    login
                                </span>
                                <box-icon type='solid' name='user'  id="box_icon"></box-icon>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">as patient</a></li>
                                    <li><a className="dropdown-item" href="#">as doctor</a></li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
