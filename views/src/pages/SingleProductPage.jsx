import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SingleProduct from '../components/SingleProduct';

const SingleProductPage = () => {
    return (
        <div className='h-[100%] w-[100%]'>
            <Navbar />
            <SingleProduct />
            <Footer />
        </div>
    )
}

export default SingleProductPage
