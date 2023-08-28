import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
// import './form.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../Loader';

const Doctorlogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  let handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://petmedbackend.onrender.com/api/doctor/authenticateDoctor', formData)
      .then((response) => {
        if (response.data.status === 'SUCCESS') {
          toast.success(response.data.message_en, {
            position: toast.POSITION.TOP_RIGHT,
          });
          localStorage.setItem('doctor', JSON.stringify(response.data.data));
          setTimeout(() => {
            navigate('/doctor-dashboard');
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
                        <span
                          className='navbar-brand'
                          style={{ cursor: 'pointer' }}
                          onClick={() => navigate('/')}
                        >
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
                          <li className='nav-item text-capitalize d-flex align-items-center'>
                            new doctor?{' '}
                            <Link
                              className='nav-link active'
                              aria-current='page'
                              to={'/DoctorSignUp'}
                            >
                              sign up
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </section>
          <section id='user_login'>
            <div className='container mt-4'>
              <div className='row'>
                <div className='col-6'>
                  <div className='login_img mt-5'>
                    <img src='/doctorform.jpg' className='w-100' alt='' />
                  </div>
                </div>
                <div className='col-6'>
                  <div className='login_form text-capitalize'>
                    <h4>welcome back!</h4>
                    <p>login to continue</p>
                    <form
                      action=''
                      method='post'
                      className='mt-4'
                      onSubmit={handleSubmit}
                    >
                      <div className='form-floating mb-3'>
                        <input
                          type='email'
                          className='form-control'
                          id='floatingInput'
                          placeholder='enter email'
                          name='email'
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <label for='floatingInput'>Email address</label>
                      </div>
                      <div className='form-floating'>
                        <input
                          type='password'
                          className='form-control'
                          id='floatingPassword'
                          name='password'
                          value={formData.password}
                          onChange={handleChange}
                          placeholder='enter Password'
                          required
                        />
                        <label for='floatingPassword'>Password</label>
                      </div>
                      <div className='form_btn d-flex align-items-center'>
                        <button type='submit' className='btn btn-secondary'>
                          login
                        </button>
                        <p style={{ marginTop: 40 + 'px' }}>forget password?</p>
                      </div>
                    </form>
                  </div>
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

export default Doctorlogin;
