import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SingleProduct from '../components/SingleProduct';

const SingleProductPage = () => {
    const { id } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(
                    `${BACKEND_URL}/api/product/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                setProduct(res.data.product); // Adjust based on API structure
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch product details.');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, BACKEND_URL]);

    return (
        <div className='h-full w-full'>
            <Navbar />

            {loading ? (
                <div className="w-full h-[70vh] flex justify-center items-center text-xl font-semibold">
                    Loading product...
                </div>
            ) : error ? (
                <div className="w-full h-[70vh] flex justify-center items-center text-red-600 font-semibold">
                    {error}
                </div>
            ) : (
                <SingleProduct product={product} />
            )}

            <Footer />
        </div>
    );
};

export default SingleProductPage;