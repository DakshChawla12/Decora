import React, { useState, useContext } from 'react';
import leftImg from '../assets/Left.png';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext'; // import context

const Signup = () => {
    const [view, setView] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { signupUser } = useContext(StoreContext); // use context

    const toggleView = () => setView(!view);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signupUser(formData);
    };

    return (
        <div className="flex flex-col sm:flex-row h-screen w-full bg-gray-50">
            {/* Left Image */}
            <div className="h-[50vh] sm:h-full w-full sm:w-[50%]">
                <img src={leftImg} alt="Left" className="w-full h-full object-cover" />
            </div>

            {/* Right Side - Signup Form */}
            <div className="h-[50vh] sm:h-full w-full sm:w-[50%] bg-white flex flex-col justify-center px-6 sm:px-[4rem]">
                <div className="w-full sm:w-[65%] flex flex-col gap-4 sm:gap-[1rem] justify-center">
                    <h1 className="text-[#141718] text-4xl font-semibold">Sign Up</h1>

                    <p className="text-[#6C7275] text-[0.9rem]">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#38CB89] cursor-pointer">Login</Link>
                    </p>

                    <form className="flex flex-col gap-[1.5rem]" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border-b-2 border-b-[#E8ECEF] outline-none text-gray-600 py-2"
                            placeholder="Name"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border-b-2 border-b-[#E8ECEF] outline-none text-gray-600 py-2"
                            placeholder="Email"
                            required
                        />

                        <div className="relative w-full">
                            <input
                                type={view ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border-b-2 border-b-[#E8ECEF] outline-none text-gray-600 py-2 pr-10"
                                placeholder="Password"
                                required
                            />
                            {view ? <FaRegEyeSlash
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                                onClick={toggleView}
                            /> : <IoEyeOutline
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                                onClick={toggleView}
                            />}
                        </div>

                        <div className="flex gap-3 items-center text-sm">
                            <input type="radio" className="h-[1rem] w-[1rem]" required />
                            <p className="text-[#6C7275]">
                                I agree with <span className="text-black">Privacy Policy</span> and{' '}
                                <span className="text-black">Terms of Use</span>
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white text-[0.9rem] py-3 rounded-md hover:bg-gray-800 transition"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
