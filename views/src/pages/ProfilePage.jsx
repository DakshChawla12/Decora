import React from 'react';
import Navbar from '../components/Navbar';
import MyAccount from '../components/MyAccount';
import Footer from '../components/Footer';

const ProfilePage = () => {
  return (
   <div className='w-[100%] h-[100%]'>
    <Navbar/>
    <MyAccount/>
    <Footer/>
   </div>
  )
}

export default ProfilePage