import React from 'react';
import productImage from '../assets/productImages/product1.png';
import heart from '../assets/iconImages/heart.svg';
import addReview from '../assets/iconImages/addReview.svg';
import Review from './Review';
import reviewsData from '../sample_data/reviews';

const SingleProduct = () => {
    return (
        <>
            {/* Main Product Container */}
            <div className='w-[80%] h-auto mx-auto flex flex-col gap-y-6 md:gap-y-0 md:flex-row md:justify-evenly mt-[2rem] mb-[1.8rem]'>

                {/* Left Side - Images */}
                <div className='flex flex-col md:h-[28rem] lg:w-[40%] lg:h-[52rem]'>
                    <img
                        src={productImage}
                        alt="Main Product"
                        className=''
                    />
                    {/* Image Gallery */}
                    <div className='mt-6 hidden md:block'>
                        <h2 className='text-xl font-semibold mb-2'>More Images</h2>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                            <img src={productImage} alt="Thumb 1" className='h-24 w-full object-cover rounded-md border' />
                            <img src={productImage} alt="Thumb 2" className='h-24 w-full object-cover rounded-md border' />
                            <img src={productImage} alt="Thumb 3" className='h-24 w-full object-cover rounded-md border' />
                            <img src={productImage} alt="Thumb 4" className='h-24 w-full object-cover rounded-md border' />
                        </div>
                    </div>
                </div>

                {/* Right Side - Product Details */}
                <div className='w-full flex flex-col gap-y-3 lg:w-[45%]'>

                    <h1 className='font-bold text-4xl'>Tray Table</h1>

                    <p className='text-[#6C7275]'>
                        Buy one or buy a few and make every space where you sit more convenient.
                        Light and easy to move around with removable tray top, handy for serving snacks.
                    </p>

                    <div className='w-full flex gap-x-4 items-center'>
                        <span className='font-bold text-3xl'>199$</span>
                        <span className='font-bold text-2xl text-[#6C7275] line-through'>299$</span>
                    </div>

                    {/* Quantity & Wishlist Section */}
                    <div className='w-full h-[8rem] mt-4 flex flex-col gap-y-4'>
                        <div className='w-full h-[40%] flex gap-x-2'>
                            <div className='w-[35%] h-full flex justify-center items-center'>
                                <button className='w-[33%] h-full bg-[#F5F5F5]'>-</button>
                                <button className='w-[33%] h-full bg-[#F5F5F5]'>1</button>
                                <button className='w-[33%] h-full bg-[#F5F5F5]'>+</button>
                            </div>
                            <button className='w-[65%] h-full rounded-sm flex items-center justify-center gap-x-2 text-sm'>
                                <img src={heart} alt="Heart" />
                                Add to wishlist
                            </button>
                        </div>

                        <button className='w-full h-[30%] bg-black text-white rounded-md'>Add to cart</button>
                    </div>

                    {/* Customer Reviews */}
                    <div className='flex flex-col h-[29rem] w-full mx-auto pt-4'>

                        {/* Review Header & Input */}
                        <div className='flex flex-col gap-y-3 w-full'>
                            <span className='text-[#23262F] text-[1.2rem] font-medium'>
                                Customer Reviews
                            </span>

                            <div className="relative w-full h-[2.5rem]">
                                <input
                                    type="text"
                                    className="w-full h-full rounded-md pl-2 pr-8 placeholder:text-[0.7rem] placeholder:text-[#6C7275] border border-gray-300 leading-[2.5rem]"
                                    placeholder="Share your thoughts"
                                />
                                <img
                                    src={addReview}
                                    alt="Add Review"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-[1.2rem] w-[1.2rem] cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Review List */}
                        <div className='w-full flex-1 mt-4 overflow-y-auto flex flex-col gap-y-4 border border-gray-200 rounded-md pt-3 pl-3'>
                            {reviewsData.map((review) => {
                                return <Review key={review.id} name={review.name} review={review.review} />
                            })}
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};

export default SingleProduct;
