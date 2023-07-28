import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './lab.css';
import axios from 'axios';

const Lab = () => {
  const [labs_category, setlabsCategory] = useState([]);

  useEffect(() => {
    const fetchLabs = async () => {
      const labs = await axios.get('http://localhost:8000/api/admin/getLabs');
      try {
        setlabsCategory(labs.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLabs();
  }, []);

  console.log(labs_category)
  return (
    <>
      <Header />
      <section id='lab'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 text-white text-center text-capitalize'>
              <h1>
                medicla diagnostics <br /> laboratory
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section id='lab_category'>
        <div className='container'>
          <div className='row'>
            {labs_category.map((data) => {
              return (
                <div className='col-4 mb-3' key={data.id}>
                  <div className='card'>
                    <img src={data.imgUrl} className='card-img-top' height='233px' width= '414px'/>
                    <div className='card-body'>
                      <h5 className='card-title'>{data.heading}</h5>
                      <p className='card-text'>
                        <i class='fa-solid fa-location-dot me-2'></i>
                        {data.address}
                      </p>
                      <span>
                        <i class='fa-solid fa-phone me-2'></i>
                        {data.phone}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* <div className="col-4">
              <div className="card">
                <img src="blog_one.jpg" className="card-img-top"  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Lab;
