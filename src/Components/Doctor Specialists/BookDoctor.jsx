import { Avatar } from '@mui/material';

const BookDoctor = (props) => {
  const today = new Date().toISOString().split('T')[0];
  console.log(today);
  return (
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
              style={{ color: '#00797a' }}
            >
              Book Appointment
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <div className='container'>
              <div className='row'>
                <div className='col-12 mb-3 d-flex justify-content-center'>
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={props.imgUrl}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-12 mb-3  d-flex justify-content-center'>
                  <h2 className='fs-5 text-capitalize fw-semibold pl-5'>
                    {`Dr. ${props.doctor_name}`}
                  </h2>
                </div>
              </div>
              <form action='' method='post'>
                <div className='row'>
                  <div className='col-6 mb-3'>
                    <input
                      type='date'
                      name=''
                      className='form-control'
                      min={today}
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
              </form>
            </div>
          </div>
          <div className='modal-footer d=flex '>
            <button
              type='submit'
              className='btn btn-primary'
              style={{ backgroundColor: '#00797a' }}
            >
              Book Vet
            </button>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDoctor;
