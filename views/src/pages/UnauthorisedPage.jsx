import React from 'react';
import Unauthorized from '../components/Unauthorized';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const UnauthorisedPage = () => {
    return (
        <div className='w-[100%] h-[100%]'>
            <NavBar />
            <Unauthorized />
            <Footer />
        </div>
    )
}

export default UnauthorisedPage
