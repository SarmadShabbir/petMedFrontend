import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import './doctorboard.css';
import { Link, useNavigate } from 'react-router-dom';
import NotFound from '../ErrorPage/404error';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Doctordashboard = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState('null');
  const [disabled, setdisabled] = useState(true);
  const [reRender, setReRender] = useState(false);
  const [passwordData, setPasswordData] = useState({
    prevPassword: '',
    currentPassword: '',
    email: '',
  });

  // handleChange
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUpdatedData((values) => ({ ...values, [name]: value }));
  };
  const handlePasswordChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPasswordData((values) => ({ ...values, [name]: value }));
  };

  // on component render getting doctor data
  useEffect(() => {
    const doctorData = localStorage.getItem('doctor');
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
      setReRender(false);
    }
  }, [reRender]);

  // handle logout
  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate('/Doctorlogin');
    }, 1000);
  };

  // updated Data State
  const [updatedData, setUpdatedData] = useState({
    title: '',
    name: '',
    phoneNumber: '',
    updatedEmail: '',
    email: '',
  });

  // updating contact information

  const handleUpdate = async (e) => {
    e.preventDefault();

    axios
      .put('http://localhost:8000/api/doctor/updateDoctor', updatedData)
      .then((response) => {
        if (response.data.status === 'SUCCESS') {
          toast.success(response.data.message_en, {
            position: toast.POSITION.TOP_RIGHT,
          });
          localStorage.clear;
          localStorage.setItem('doctor', JSON.stringify(response.data.data));
          setReRender(true);
          navigate('/doctor-dashboard');
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
      .put('http://localhost:8000/api/doctor/updatePassword', passwordData)
      .then((response) => {
        if (response.data.status === 'SUCCESS') {
          toast.success(response.data.message_en, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            localStorage.clear;
            navigate('/Doctorlogin');
          }, 2000);
        } else {
          toast.error(response.data.message_en, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };
  return (
    <>
      {doctor != 'null' ? (
        <>
          <section className='login_header'>
            <div className='container'>
              <div className='row'>
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
                          <li className='nav-item text-uppercase d-flex align-items-center'>
                            for doctors
                          </li>
                          <li>
                            <span
                              type='button'
                              className=' mt-2 position-relative'
                            >
                              <i class='fa-regular fa-bell'></i>
                              <span className='position-absolute ms-2 top-0 start-100 translate-middle badge rounded-pill bg-secondary'>
                                0
                                <span className='visually-hidden'>
                                  unread messages
                                </span>
                              </span>
                            </span>
                          </li>
                          <li className='nav-item dropdown'>
                            <a
                              className='nav-link dropdown-toggle'
                              href='#'
                              role='button'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'
                            >
                              {doctor.title + doctor.name}
                            </a>
                            <ul className='dropdown-menu'>
                              <li>
                                <a
                                  className='dropdown-item'
                                  href='#'
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
          <section id='doctor_dashboard'>
            <div className='container'>
              <div className='row'>
                <div className='col-3 p-0'>
                  <aside>
                    <ul className='nav nav-pills flex-column' id='myTab'>
                      <li className='nav-item'>
                        <a
                          href='#home'
                          data-bs-toggle='pill'
                          className='nav-link active'
                        >
                          <i class='fa-solid fa-house me-2'></i>Home
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a
                          href='#appointment'
                          data-bs-toggle='pill'
                          className='nav-link'
                        >
                          <i class='fa-solid fa-clock me-2'></i>appointment
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a
                          href='#manage'
                          data-bs-toggle='pill'
                          className='nav-link'
                        >
                          <i class='fa-solid fa-list-check me-2'></i>manage
                          slots
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a
                          href='#contact'
                          data-bs-toggle='pill'
                          className='nav-link'
                        >
                          <i class='fa-solid fa-phone me-2'></i>contact
                          information
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a
                          href='#password'
                          data-bs-toggle='pill'
                          className='nav-link'
                        >
                          <i class='fa-solid fa-key me-2'></i>change password
                        </a>
                      </li>
                    </ul>
                  </aside>
                </div>
                <div className='col-9 dashboard_content'>
                  <div className='tab-content'>
                    <div className='tab-pane fade show active' id='home'>
                      <div className='sub_heading text-capitalize'>
                        <h4> {doctor.title + doctor.name}</h4>
                      </div>
                      <div className='progress_work'>
                        <div className='row'>
                          <div className='col-4 text-capitalize d-flex align-items-center'>
                            <span className='me-2'>0</span>
                            <p>profile views</p>
                          </div>
                          <div className='col-4 text-capitalize d-flex align-items-center'>
                            <span className='me-2'>0</span>{' '}
                            <p>future appoitments</p>
                          </div>
                          <div className='col-4 text-capitalize d-flex align-items-center'>
                            <span className='me-2'>0</span>{' '}
                            <p>patient appointments</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='tab-pane fade' id='appointment'>
                      <div className='sub_heading text-capitalize'>
                        <h4>appointments</h4>
                      </div>
                      <div className='progress_work'>
                        <div className='row'>
                          <div className='col-6 text-capitalize d-flex align-items-center'>
                            <span className='me-2'>0</span>{' '}
                            <p>future appoitments</p>
                          </div>
                          <div className='col-6 text-capitalize d-flex align-items-center'>
                            <span className='me-2'>0</span>{' '}
                            <p>patient booked appointments</p>
                          </div>
                          <div className='col-12 mt-3 text-center text-capitalize'>
                            <span id='nothing'>no appointments found</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='tab-pane fade' id='manage'>
                      <div className='sub_heading text-capitalize'>
                        <h4>new appointments</h4>
                      </div>
                      <div className='slots_work'>
                        <div className='row'>
                          <div className='col-3 text-capitalize'>
                            <input
                              type='search'
                              placeholder='search by patient name'
                              className='form-control'
                            />
                          </div>
                          <div className='col-3 text-capitalize '>
                            <select name='' className='form-select'>
                              <option value=''>lahore</option>
                              <option value=''>islamabad</option>
                              <option value=''>karachi</option>
                              <option value=''>township</option>
                              <option value=''>rawalpindi</option>
                              <option value=''>ksure</option>
                            </select>
                          </div>
                          <div className='col-3 text-capitalize'>
                            <input type='date' className='form-control' />
                          </div>
                          <div className='col-3 text-capitalize'>
                            <button
                              className='btn btn-secondary'
                              data-bs-toggle='modal'
                              data-bs-target='#exampleModal'
                            >
                              new appointment
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='display_appointments mt-5'>
                        <div className='row'>
                          <div className='col-12'>
                            <table className='table'>
                              <thead>
                                <tr>
                                  <th scope='col'>time</th>
                                  <th scope='col'>date</th>
                                  <th scope='col'>patient</th>
                                  <th scope='col'>phone</th>
                                  <th scope='col'>status</th>
                                  <th scope='col'>action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope='row'>07:00</th>
                                  <td>26 june 2023</td>
                                  <td>asghar ali</td>
                                  <td>+92 304958686</td>
                                  <td>
                                    <span class='badge bg-primary text-capitalize'>
                                      start oppt
                                    </span>
                                  </td>
                                  <td>
                                    <i
                                      data-bs-toggle='modal'
                                      data-bs-target='#modal2'
                                      class='fa-solid fa-pen-to-square'
                                    ></i>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope='row'>07:30</th>
                                  <td>26 june 2023</td>
                                  <td>tayyad</td>
                                  <td>+92 304958686</td>
                                  <td>
                                    <span class='badge bg-danger text-capitalize'>
                                      cancelled
                                    </span>
                                  </td>
                                  <td>
                                    <i
                                      data-bs-toggle='modal'
                                      data-bs-target='#modal2'
                                      class='fa-solid fa-pen-to-square'
                                    ></i>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope='row'>08:20</th>
                                  <td>26 june 2023</td>
                                  <td>mahnoor</td>
                                  <td>+92 304958686</td>
                                  <td>
                                    <span class='badge bg-primary text-capitalize'>
                                      start oppt
                                    </span>
                                  </td>
                                  <td>
                                    <i
                                      data-bs-toggle='modal'
                                      data-bs-target='#modal2'
                                      class='fa-solid fa-pen-to-square'
                                    ></i>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='tab-pane fade' id='contact'>
                      <div className='sub_heading text-capitalize'>
                        <h4>contact information</h4>
                      </div>
                      <div className='contact_info'>
                        <form onSubmit={handleUpdate} method='post'>
                          <div className='row'>
                            <div className='col-6 text-capitalize mb-3'>
                              <label htmlFor=''>title</label>
                              <input
                                type='text'
                                placeholder='Mr./Ms.'
                                value={
                                  disabled ? doctor.title : updatedData.title
                                }
                                name='title'
                                onChange={handleChange}
                                className='form-control'
                                required
                                disabled={disabled}
                              />
                            </div>
                            <div className='col-6 text-capitalize mb-3'>
                              <label htmlFor=''>name</label>
                              <input
                                type='text'
                                name='name'
                                onChange={handleChange}
                                placeholder='Enter Name'
                                className='form-control'
                                value={
                                  disabled ? doctor.name : updatedData.name
                                }
                                required
                                disabled={disabled}
                              />
                            </div>
                            <div className='col-6 text-capitalize mb-3'>
                              <label htmlFor=''>phone</label>
                              <input
                                type='tel'
                                name='phoneNumber'
                                onChange={handleChange}
                                placeholder='Enter Phone Number'
                                value={
                                  disabled
                                    ? doctor.phoneNumber
                                    : updatedData.phoneNumber
                                }
                                className='form-control'
                                required
                                disabled={disabled}
                              />
                            </div>
                            <div className='col-6 text-capitalize mb-3'>
                              <label htmlFor=''>email</label>
                              <input
                                type='email'
                                placeholder='Enter Email'
                                name='updatedEmail'
                                onChange={handleChange}
                                value={
                                  disabled
                                    ? doctor.email
                                    : updatedData.updatedEmail
                                }
                                className='form-control'
                                required
                                disabled={disabled}
                              />
                            </div>
                            <div className='col-12 text-end'>
                              {disabled === true ? (
                                <button
                                  type='button'
                                  className='btn btn-secondary text-capitalize '
                                  onClick={() => setdisabled(false)}
                                >
                                  edit
                                </button>
                              ) : (
                                <div>
                                  <button
                                    type='button'
                                    className='btn btn-light text-capitalize cancel-btn'
                                    onClick={() => setdisabled(true)}
                                  >
                                    cancel
                                  </button>
                                  <button
                                    type='submit'
                                    className='btn btn-success text-capitalize '
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
                    <div className='tab-pane fade' id='password'>
                      <div className='sub_heading text-capitalize'>
                        <h4>change password</h4>
                      </div>
                      <div className='contact_info'>
                        <form method='post' onSubmit={handlePasswordUpdate}>
                          <div className='row'>
                            <div className='col-6 text-capitalize mb-3'>
                              <label htmlFor=''>current password</label>
                              <input
                                type='password'
                                name='prevPassword'
                                onChange={handlePasswordChange}
                                value={passwordData.prevPassword}
                                placeholder='Current Password'
                                className='form-control'
                                required
                              />
                            </div>
                            <div className='col-6 text-capitalize mb-3'>
                              <label htmlFor=''>new password</label>
                              <input
                                type='password'
                                name='currentPassword'
                                onChange={handlePasswordChange}
                                value={passwordData.currentPassword}
                                placeholder='New Password'
                                className='form-control'
                                required
                              />
                            </div>
                            <div className='col-6 text-capitalize mb-3'>
                              <label htmlFor=''>confirm password</label>
                              <input
                                type='password'
                                name=''
                                placeholder='confirm password'
                                className='form-control'
                                required
                              />
                            </div>
                            <div className='col-12 '>
                              <button
                                type='submit'
                                className='btn btn-secondary text-capitalize'
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
          <section>
            {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button> */}

            <div
              className='modal fade'
              id='exampleModal'
              tabindex='-1'
              aria-labelledby='exampleModalLabel'
              aria-hidden='true'
            >
              <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h1
                      className='modal-title fs-5 text-capitalize fw-semibold'
                      id='exampleModalLabel'
                    >
                      new appointment
                    </h1>
                    <button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    ></button>
                  </div>
                  <form action='' method='post'>
                    <div className='modal-body'>
                      <div className='container'>
                        <div className='row'>
                          <div className='col-6 mb-3'>
                            <input
                              type='text'
                              value='26/06/2023'
                              name=''
                              className='form-control'
                            />
                          </div>
                          <div className='col-6 mb-3'>
                            <select name='' className='form-select'>
                              <option value='' selected>
                                07:00 - 07:30
                              </option>
                              <option value=''>07:30 - 08:00</option>
                              <option value=''>08:00 - 09:00</option>
                              <option value=''>09:00 - 10:00</option>
                            </select>
                          </div>
                          <div className='col-6 mb-3'>
                            <select name='' className='form-select'>
                              <option value='' selected>
                                asghar ali
                              </option>
                              <option value='' selected>
                                talha
                              </option>
                              <option value='' selected>
                                tayyab ali
                              </option>
                              <option value=''>naeem</option>
                            </select>
                          </div>
                          <div className='col-12'>
                            <label className='mb-2'>motif patient</label>
                            <textarea
                              name=''
                              className='form-control'
                              cols='30'
                              rows='4'
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                      >
                        Close
                      </button>
                      <button type='submit' className='btn btn-primary'>
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              className='modal fade'
              id='modal2'
              tabindex='-1'
              aria-labelledby='exampleModalLabel'
              aria-hidden='true'
            >
              <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h1
                      className='modal-title fs-5 text-capitalize fw-semibold'
                      id='exampleModalLabel'
                    >
                      abdullah
                    </h1>
                    <button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    ></button>
                  </div>
                  <form action='' method='post'>
                    <div className='modal-body'>
                      <div className='container'>
                        <div className='row'>
                          <div className='col-6 mb-3'>
                            <input
                              type='text'
                              value='26/06/2023'
                              name=''
                              className='form-control'
                            />
                          </div>
                          <div className='col-6 mb-3'>
                            <select name='' className='form-select'>
                              <option value='' selected>
                                07:00 - 07:30
                              </option>
                              <option value=''>07:30 - 08:00</option>
                              <option value=''>08:00 - 09:00</option>
                              <option value=''>09:00 - 10:00</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                      >
                        Close
                      </button>
                      <button type='submit' className='btn btn-primary'>
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <ToastContainer />
        </>
      ) : (
        <div>
          <NotFound />
        </div>
      )}
    </>
  );
};

export default Doctordashboard;
