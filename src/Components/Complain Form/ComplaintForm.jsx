import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './complain.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../Loader';

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    dateOfComplaint: '',
    staffName: '',
    problem: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const hanleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setComplaint((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/paitent/submitComplaint', complaint)
      .then((response) => {
        response.data.status === 'SUCCESS'
          ? toast.success(response.data.message_en, {
              position: toast.POSITION.TOP_RIGHT,
            })
          : toast.error(response.data.message_en, {
              position: toast.POSITION.TOP_RIGHT,
            });
        setComplaint((values) => ({
          ...values,
          name: '',
          email: '',
          phoneNumber: '',
          dateOfComplaint: '',
          staffName: '',
          problem: '',
        }));
      })
      .catch((err) => {
        toast.error(err, {
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
          <Header />
          <section id='complain_form'>
            <div className='container mt-4'>
              <div className='row'>
                <div className='col-12'>
                  <h1 className='fs-2 text-capitalize mt-0 fw-bold'>
                    complaint form
                  </h1>
                </div>
              </div>
            </div>
            <div className='container form_box mt-3'>
              <div className='row'>
                <div className='col-12'>
                  <form method='post' onSubmit={handleSubmit}>
                    <div className='row'>
                      <div className='col-6 mb-2'>
                        <label htmlFor=''>name</label>
                        <input
                          type='text'
                          required
                          name='name'
                          onChange={hanleChange}
                          value={complaint.name}
                          placeholder='Enter name'
                          id=''
                          className='form-control'
                        />
                      </div>
                      <div className='col-6 mb-2'>
                        <label htmlFor=''>email</label>
                        <input
                          type='email'
                          name='email'
                          onChange={hanleChange}
                          value={complaint.email}
                          required
                          placeholder='Enter email'
                          id=''
                          className='form-control'
                        />
                      </div>
                      <div className='col-6 mb-2'>
                        <label htmlFor=''>phone</label>
                        <input
                          type='tel'
                          required
                          name='phoneNumber'
                          onChange={hanleChange}
                          value={complaint.phoneNumber}
                          placeholder='Enter phone number'
                          id=''
                          className='form-control'
                        />
                      </div>
                      <div className='col-6 mb-2'>
                        <label htmlFor=''>date of complaint</label>
                        <input
                          type='date'
                          required
                          name='dateOfComplaint'
                          onChange={hanleChange}
                          value={complaint.dateOfComplaint}
                          id=''
                          className='form-control'
                        />
                      </div>
                      <div className='col-6 mb-2'>
                        <label htmlFor=''>
                          staff involved (name / title ){' '}
                        </label>
                        <input
                          type='text'
                          name='staffName'
                          onChange={hanleChange}
                          value={complaint.staffName}
                          placeholder='Enter Staff Name'
                          required
                          id=''
                          className='form-control'
                        />
                      </div>
                      <div className='col-6 mb-2'>
                        <label htmlFor=''>describe problem</label>
                        <textarea
                          className='form-control'
                          name='problem'
                          onChange={hanleChange}
                          value={complaint.problem}
                          id=''
                          cols='10'
                          rows='4'
                        ></textarea>
                      </div>
                      <div className='col-6'>
                        <button type='submit' className='btn btn-secondary'>
                          submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <Footer />
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default ComplaintForm;
