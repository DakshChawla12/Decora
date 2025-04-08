import React from 'react'
import NavBar from '../components/Navbar'
import Footer from '../components/Footer'
import NewsLetterHeader from '../components/NewsLetterHeader'
import Cart from '../components/Cart'

const CartPage = () => {
    return (
        <div className='h-[100%] w-[100%]'>
            <NavBar/>
            <Cart/>
            <Footer/>
        </div>
    )
}

export default CartPage