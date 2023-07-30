import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Banner from '../Banner/Banner';
import Doctor from '../Doctors_Slider/Doctor';
import Footer from '../Footer/Footer';
import Loader from '../../../Loader';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Banner />
          <Doctor />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
