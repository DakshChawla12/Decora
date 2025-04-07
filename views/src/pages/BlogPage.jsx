import React from 'react'
import Blog from '../components/Blog'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import NewsLetterHeader from '../components/NewsLetterHeader.jsx'

const BlogPage = () => {
    return (
        <div className='h-[100%] w-[100%]'>
            <Navbar/>
            <Blog />
            <NewsLetterHeader/>
            <Footer/>
        </div>
    )
}

export default BlogPage