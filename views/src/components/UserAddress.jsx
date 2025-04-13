import React, { useState } from "react";

const Address = () => {
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    });

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        console.log("Address submitted:", address);
    };

    return (
        <div className="w-full lg:w-[75%] flex flex-col gap-6">
            <h2 className="text-lg font-semibold">Address Information</h2>
            <form onSubmit={handleAddressSubmit} className="flex flex-col gap-4">
                {/* Street */}
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-500 font-bold text-xs">STREET ADDRESS</label>
                    <input
                        type="text"
                        name="street"
                        value={address.street}
                        onChange={handleChange}
                        placeholder="123 Main Street"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-500 font-bold text-xs">CITY</label>
                    <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-gray-500 font-bold text-xs">STATE</label>
                        <input
                            type="text"
                            name="state"
                            value={address.state}
                            onChange={handleChange}
                            placeholder="State"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-gray-500 font-bold text-xs">ZIP CODE</label>
                        <input
                            type="text"
                            name="zip"
                            value={address.zip}
                            onChange={handleChange}
                            placeholder="123456"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-500 font-bold text-xs">COUNTRY</label>
                    <input
                        type="text"
                        name="country"
                        value={address.country}
                        onChange={handleChange}
                        placeholder="Country"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-zinc-900 text-white text-sm px-4 py-2 rounded-md w-full sm:w-[60%] md:w-[40%] lg:w-[30%] mt-2"
                >
                    Save Address
                </button>
            </form>
        </div>
    );
};

export default Address;