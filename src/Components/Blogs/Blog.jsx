import React from 'react'
import Header from '../Header/Header'
import './blog.css'
import Footer from '../Footer/Footer'

const Blog = () => {
    let blog_category = [
        { id: 1, blogImg: '/blog_one.jpg' },
        { id: 2, blogImg: '/blogtwo.jpg' },
        { id: 3, blogImg: '/blogthree.jpg' },
        { id: 4, blogImg: '/blogfour.jpg' },
        { id: 5, blogImg: '/blogfive.jpg' },
        { id: 6, blogImg: '/blogsix.jpg' }
    ]
    return (
        <>
            <Header />
            <section id="blog">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-capitalize text-center">
                            <h1>blogs</h1>
                            <p>
                                Lorem ipsum Lorem ipsum dolor sit amet. dolor sit amet consectetur adipisicing elit. Quis cum, dolor provident ducimus temporibus obcaecati eligendi tenetur quo quasi velit.
                            </p>
                            <button type='button' className="btn btn-outline-info">explore</button>
                        </div>
                    </div>
                </div>
            </section>
            <section id="blog_category">
                <div className="container">
                    <div className="row">
                        {
                            blog_category.map((data) => {
                                return (
                                    <div className="col-4 mb-3" key={data.id}>
                                        <div className="card">
                                            <img src={data.blogImg} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <span>april 07, 2020 admin <span className="icon mx-2"><i class="fa-solid fa-comment"></i> 3</span></span>
                                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Blog