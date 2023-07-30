import React from 'react';
import logo from '../../assets/logo.png';
// import './form.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loader from '../../../Loader';

const DoctorSignUp = () => {
  const [doctorData, setDoctorData] = useState({
    title: '',
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    city: '',
    specialization: '',
    gender: '',
    profilePhoto: '',
  });
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [file, setFile] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDoctorData((values) => ({ ...values, [name]: value }));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('http://localhost:8000/api/upload', formData)
      .then((response) => {
        setDoctorData((values) => ({
          ...values,
          profilePhoto: response.data.file,
        }));
        setDisabled(false);
        if (response.data.status === 'FAILURE') {
          toast.error(response.data.message_en, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.success(response.data.message_en, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((response) => {
        toast.error(response.data.message_en, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/doctor/registerDoctor', doctorData)
      .then((response) => {
        {
          response.data.status === 'SUCCESS'
            ? toast.success(response.data.message_en, {
                position: toast.POSITION.TOP_RIGHT,
              })
            : toast.error(response.data.message_en, {
                position: toast.POSITION.TOP_RIGHT,
              });
        }
        setTimeout(() => {
          navigate('/Doctorlogin');
        }, 1000);
      })
      .catch((response) => {
        toast.error(response.data.message_en, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className='login_header'>
            <div className='container'>
              <div className='row'>
                <div className='col-12'>
                  <nav className='navbar navbar-expand-lg'>
                    <div className='container-fluid'>
                      <div className='logo_img'>
                        <span className='navbar-brand' style={{cursor: "pointer"}} onClick={() => navigate('/')}>
                          <img className='w-100' src={logo} alt='' />
                        </span>
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
                          <li className='nav-item text-capitalize fw-bold fs-4 register'>
                            sign up
                          </li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </section>
          <section id='user_signup'>
            <div className='container mt-5'>
              <div className='row'>
                <div className='col-6'>
                  <div className='login_img'>
                    <img src='/doctorform.jpg' className='w-100' alt='' />
                  </div>
                </div>
                <div className='col-6 pb-5'>
                  <form onSubmit={handleSubmit} method='post'>
                    <div className='row'>
                      <div className='col-12'>
                        <div class='form-floating mb-3'>
                          <input
                            type='text'
                            class='form-control'
                            id='mr'
                            name='title'
                            value={doctorData.title}
                            onChange={handleChange}
                            placeholder='enter first name'
                            required
                            autoComplete='on'
                          />
                          <label for='mr'>mr./ms./dr./prof.</label>
                        </div>
                      </div>
                      <div className='col-12'>
                        <div class='form-floating mb-3'>
                          <input
                            type='text'
                            class='form-control'
                            id='name'
                            name='name'
                            value={doctorData.name}
                            onChange={handleChange}
                            placeholder='enter last name'
                            autoComplete='on'
                            required
                          />
                          <label for='name'> name</label>
                        </div>
                      </div>
                      <div className='col-12'>
                        <div class='form-floating mb-3'>
                          <input
                            type='email'
                            class='form-control'
                            id='floatingInput'
                            name='email'
                            value={doctorData.email}
                            onChange={handleChange}
                            placeholder='name@example.com'
                            autoComplete='on'
                            required
                          />
                          <label for='floatingInput'>Email address</label>
                        </div>
                      </div>
                      <div className='col-12'>
                        <div class='form-floating mb-3'>
                          <input
                            type='tel'
                            class='form-control'
                            id='contact'
                            placeholder='name@example.com'
                            name='phoneNumber'
                            value={doctorData.phoneNumber}
                            onChange={handleChange}
                            autoComplete='on'
                            required
                          />
                          <label for='contact'>contact number</label>
                        </div>
                      </div>
                      <div className='col-12'>
                        <div class='form-floating mb-3'>
                          <input
                            type='password'
                            class='form-control'
                            id='floatingPassword'
                            placeholder='Password'
                            name='password'
                            value={doctorData.password}
                            onChange={handleChange}
                            autoComplete='on'
                            required
                          />
                          <label for='floatingPassword'>Password</label>
                        </div>
                      </div>
                      <div className='col-12'>
                        <div class='form-floating mb-3'>
                          <input
                            type='text'
                            class='form-control'
                            id='city'
                            name='city'
                            value={doctorData.city}
                            onChange={handleChange}
                            placeholder='enter city'
                            autoComplete='on'
                            required
                          />
                          <label for='city'>city</label>
                        </div>
                      </div>
                      <div className='col-12'>
                        <div className='mb-3'>
                          <select
                            name='specialization'
                            className='form-select'
                            onChange={(e) =>
                              setDoctorData((values) => ({
                                ...values,
                                specialization: e.target.value,
                              }))
                            }
                          >
                            <option value='' selected>
                              select specialization
                            </option>
                            <option value='Animal welfare'>
                              animal welfare
                            </option>
                            <option value='Behavioral medicine'>
                              Behavioral medicine
                            </option>
                            <option value='Dentistry'>Dentistry</option>
                            <option value='Dermatology'>Dermatology</option>
                            <option value='Laboratory animal medicine'>
                              Laboratory animal medicine
                            </option>
                            <option value='Microbiology'>Microbiology</option>
                            <option value='Nutrition'>Nutrition</option>
                            <option value='Ophthalmology'>Ophthalmology</option>
                          </select>
                        </div>
                      </div>
                      <div className='col-12 mt-2'>
                        <label className='me-4'>gender</label>
                        <div class='form-check form-check-inline'>
                          <input
                            class='form-check-input'
                            type='radio'
                            name='gender'
                            value='male'
                            onChange={handleChange}
                            id='inlineRadio1'
                            required
                          />
                          <label class='form-check-label' for='inlineRadio1'>
                            male
                          </label>
                        </div>
                        <div class='form-check form-check-inline'>
                          <input
                            class='form-check-input'
                            type='radio'
                            name='gender'
                            onChange={handleChange}
                            id='inlineRadio2'
                            value='female'
                            required
                          />
                          <label class='form-check-label' for='inlineRadio2'>
                            female
                          </label>
                        </div>
                      </div>
                      <div className='col-6 mt-4'>
                        <input
                          type='file'
                          name='file'
                          className='form-control'
                          onChange={(event) => setFile(event.target.files[0])}
                        />
                      </div>
                      <div className='col-6 mt-4'>
                        <button
                          type='button'
                          className='btn btn-secondary mt-0'
                          onClick={handleUpload}
                        >
                          Save Image
                        </button>
                      </div>
                      <div className='form_btn d-flex align-items-center'>
                        <button
                          type='submit'
                          className='btn btn-secondary'
                          disabled={disabled}
                        >
                          sign up
                        </button>
                        <p>
                          <Link
                            to={'/Doctorlogin'}
                            className='text-decoration-none back'
                          >
                            already registered?
                          </Link>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default DoctorSignUp;
