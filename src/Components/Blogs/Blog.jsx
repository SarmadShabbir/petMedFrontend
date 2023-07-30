import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './blog.css';
import Footer from '../Footer/Footer';
import axios from 'axios';
import Loader from '../../../Loader';

const Blog = () => {
  const [blog_category, setblog_category] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetching blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await axios.get(
        'http://localhost:8000/api/admin/getAllBlogs'
      );
      try {
        setblog_category(blogs.data.data);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <section id='blog'>
            <div className='container'>
              <div className='row'>
                <div className='col-12 text-capitalize text-center'>
                  <h1>blogs</h1>
                  <p style={{ userSelect: "none"}}>
                    Lorem ipsum Lorem ipsum dolor sit amet. dolor sit amet
                    consectetur adipisicing elit. Quis cum, dolor provident
                    ducimus temporibus obcaecati eligendi tenetur quo quasi
                    velit.
                  </p>
                  <button type='button' className='btn btn-outline-info'>
                    explore
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section id='blog_category'>
            <div className='container'>
              <div className='row'>
                {blog_category.map((data) => {
                  return (
                    <div className='col-4 mb-3' key={data.id}>
                      <div className='card'>
                        <img
                          src={`../../upload/${data.imgUrl}`}
                          className='card-img-top'
                          alt='...'
                          style={{ cursor: "pointer"}}
                        />
                        <div className='card-body'>
                          <span style={{ userSelect: "none"}}>
                            {data.createdAt.split('T')[0]}
                            <span
                              style={{
                                display: 'inlineBlock',
                                marginLeft: '4px',
                                userSelect: "none"
                              }}
                            >
                              {data.postedBy}
                            </span>
                            <span className='icon mx-2' style={{ userSelect: "none"}}>
                              <i class='fa-solid fa-comment'></i> 3
                            </span>
                          </span>
                          <p className='card-text' style={{ userSelect: "none"}}>{data.blogContent}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
};

export default Blog;
