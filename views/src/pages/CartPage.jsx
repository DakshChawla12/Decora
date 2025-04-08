import React, { useEffect, useContext } from 'react'
import NavBar from '../components/Navbar'
import Footer from '../components/Footer'
import NewsLetterHeader from '../components/NewsLetterHeader'
import Cart from '../components/Cart'
import { StoreContext } from '../Context/StoreContext'

const CartPage = () => {

    const { cart, fetchCart } = useContext(StoreContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token != null) {
            fetchCart();
        }
    }, []);
    console.log(cart);

    return (
        <div className='h-[100%] w-[100%]'>
            <NavBar />
            <Cart cartItems={cart || []} />
            <Footer />
        </div>
    )
}

export default CartPage