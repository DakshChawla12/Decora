
import React, { useState, useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../utils/toatsUtils";

const UserDetails = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
    });

    const { user } = useContext(StoreContext)

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const updateUserDetails = async (data) => {
        try {
            const response = await axios.patch(`${BACKEND_URL}/api/user/update`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Failed to update details");
        }
    };

    const updatePassword = async (data) => {
        try {
            const response = await axios.patch(
                `${BACKEND_URL}/api/user/update-password`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Failed to update password");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userDetails = {};
        if (formData.name) userDetails.name = formData.name;
        if (formData.email) userDetails.email = formData.email;

        const passwordData = {};
        if (formData.oldPassword) passwordData.oldPassword = formData.oldPassword;
        if (formData.newPassword) passwordData.newPassword = formData.newPassword;
        if (formData.repeatPassword) passwordData.repeatPassword = formData.repeatPassword;

        try {
            if (Object.keys(userDetails).length > 0) {
                const userResponse = await updateUserDetails(userDetails);
                if (userResponse.success) {
                    showSuccessToast("User details updated successfully!");
                }
            }

            if (
                passwordData.oldPassword &&
                passwordData.newPassword &&
                passwordData.repeatPassword
            ) {
                if (passwordData.newPassword !== passwordData.repeatPassword) {
                    showErrorToast("New password and repeat password do not match.");
                    return;
                }
                const passwordResponse = await updatePassword(passwordData);
                if (passwordResponse.success) {
                    const successMessage =
                        Object.keys(userDetails).length > 0
                            ? "User details and password updated successfully!"
                            : "Password updated successfully!";
                    showSuccessToast(successMessage);
                }
            } else if (Object.keys(passwordData).length > 0) {
                showErrorToast("Please fill all password fields to update password.");
                return;
            }

            setFormData({
                name: "",
                email: "",
                oldPassword: "",
                newPassword: "",
                repeatPassword: "",
            });
        } catch (error) {
            showErrorToast(error.message);
        }
    };

    return (
        <div className="w-full lg:w-[75%] flex flex-col gap-6">
            <h2 className="text-lg font-semibold">Account Details</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                {/* Full Name */}
                <div className="flex flex-col gap-1">
                    <label className="text-gray-500 font-medium text-xs">FULL NAME *</label>
                    <input
                        type="text"
                        name="name"
                        placeholder={localStorage.getItem("name") || "Username"}
                        value={formData.name}
                        onChange={handleChange}
                        className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <p className="text-gray-500 italic text-[0.6rem]">
                        This will be how your name will be displayed in the account section and in
                        reviews
                    </p>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <label className="text-gray-500 font-medium text-xs">EMAIL *</label>
                    <input
                        type="email"
                        name="email"
                        placeholder={localStorage.getItem("email") || "email"}
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </div>

                <div className="font-semibold text-l">Password</div>
                {/* Old Password */}
                <div className="flex flex-col gap-1">
                    <label className="text-gray-500 font-medium text-xs">OLD PASSWORD</label>
                    <div className="relative">
                        <input
                            type={showOldPassword ? "text" : "password"}
                            name="oldPassword"
                            placeholder="Old Password"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                        />
                        <button
                            type="button"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                        >
                            {showOldPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div className="flex flex-col gap-1">
                    <label className="text-gray-500 font-medium text-xs">NEW PASSWORD</label>
                    <div className="relative">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            placeholder="New Password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                        >
                            {showNewPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                        </button>
                    </div>
                </div>

                {/* Repeat Password */}
                <div className="flex flex-col gap-1">
                    <label className="text-gray-500 font-medium text-xs">REPEAT NEW PASSWORD</label>
                    <div className="relative">
                        <input
                            type={showRepeatPassword ? "text" : "password"}
                            name="repeatPassword"
                            placeholder="Repeat New Password"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                            className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                        />
                        <button
                            type="button"
                            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                        >
                            {showRepeatPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-zinc-900 text-white text-sm px-4 py-2 rounded-md w-fit mt-2"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default UserDetails;
