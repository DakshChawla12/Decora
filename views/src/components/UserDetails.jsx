// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import axios from "axios";
// import { showErrorToast, showSuccessToast } from "../utils/toatsUtils";

// const UserDetails = () => {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [showOldPassword, setShowOldPassword] = useState(false);
//     const [showNewPassword, setShowNewPassword] = useState(false);
//     const [showRepeatPassword, setShowRepeatPassword] = useState(false);
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         oldPassword: "",
//         newPassword: "",
//         repeatPassword: "",
//     });

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     const toggleOldPasswordVisibility = () => {
//         setShowOldPassword(!showOldPassword);
//     };

//     const toggleNewPasswordVisibility = () => {
//         setShowNewPassword(!showNewPassword);
//     };

//     const toggleRepeatPasswordVisibility = () => {
//         setShowRepeatPassword(!showRepeatPassword);
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const updateUserDetails = async (data) => {
//         try {
//             const response = await axios.patch(
//                 "http://localhost:5001/api/user/update", // Adjusted to match router
//                 data,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 }
//             );
//             return response.data;
//         } catch (error) {
//             throw new Error(error.response?.data?.message || "Failed to update details");
//         }
//     };

//     const updatePassword = async (data) => {
//         try {
//             const response = await axios.patch(
//                 "http://localhost:5001/api/user/update-password", // Adjusted to match router
//                 data,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 }
//             );
//             return response.data;
//         } catch (error) {
//             throw new Error(error.response?.data?.message || "Failed to update password");
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Prepare data for user details update (only send non-empty fields)
//         const userDetails = {};
//         if (formData.name) userDetails.name = formData.name;
//         if (formData.email) userDetails.email = formData.email;

//         // Prepare data for password update
//         const passwordData = {};
//         if (formData.oldPassword) passwordData.oldPassword = formData.oldPassword;
//         if (formData.newPassword) passwordData.newPassword = formData.newPassword;
//         if (formData.repeatPassword) passwordData.repeatPassword = formData.repeatPassword;

//         try {
//             // Update user details if any fields are provided
//             if (Object.keys(userDetails).length > 0) {
//                 const userResponse = await updateUserDetails(userDetails);
//                 if (userResponse.success) {
//                     showSuccessToast("User details updated successfully!");
//                 }
//             }

//             // Update password if all password fields are provided
//             if (
//                 passwordData.oldPassword &&
//                 passwordData.newPassword &&
//                 passwordData.repeatPassword
//             ) {
//                 if (passwordData.newPassword !== passwordData.repeatPassword) {
//                     showErrorToast("New password and repeat password do not match.");
//                     return;
//                 }
//                 const passwordResponse = await updatePassword(passwordData);
//                 if (passwordResponse.success) {
//                     const successMessage =
//                         Object.keys(userDetails).length > 0
//                             ? "User details and password updated successfully!"
//                             : "Password updated successfully!";
//                     showSuccessToast(successMessage);
//                 }
//             } else if (Object.keys(passwordData).length > 0) {
//                 showErrorToast("Please fill all password fields to update password.");
//                 return;
//             }

//             // Clear form after successful update
//             setFormData({
//                 name: "",
//                 email: "",
//                 oldPassword: "",
//                 newPassword: "",
//                 repeatPassword: "",
//             });
//         } catch (error) {
//             showErrorToast(error.message);
//         }
//     };

//     return (
//         <div className="flex flex-col lg:flex-row mx-auto w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] gap-4">
//             {/* Form section */}
//             <div className="h-auto lg:h-[38rem] w-full lg:w-[75%] flex flex-col items-start overflow-y-auto">
//                 <div className="w-full lg:w-[95%] h-full flex flex-col gap-5">
//                     <div className="font-semibold text-l">Account Details</div>
//                     <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
//                         <div className="flex flex-col gap-2 w-full">
//                             <p className="text-gray-500 font-bold text-[0.6rem]">FULL NAME*</p>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleInputChange}
//                                 placeholder="John Doe"
//                                 className="border ml-0.5 border-gray-300 rounded-[5px] focus:outline-none focus:ring-1 px-3 py-0.5 focus:ring-black w-[100%]"
//                             />
//                             <p className="text-gray-500 italic text-[0.6rem]">
//                                 This will be how your name will be displayed in the account section
//                                 and in reviews
//                             </p>
//                         </div>

//                         <div className="flex flex-col gap-2 w-full">
//                             <p className="text-gray-500 font-bold text-[0.6rem]">E-MAIL *</p>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                                 placeholder="E-mail"
//                                 className="border ml-0.5 border-gray-300 rounded-[5px] focus:outline-none focus:ring-1 px-3 py-0.5 focus:ring-black w-[100%]"
//                             />
//                         </div>

//                         <div className="font-semibold text-l">Password</div>

//                         <div className="flex flex-col gap-2 w-full">
//                             <p className="text-gray-500 font-bold text-[0.6rem]">OLD PASSWORD</p>
//                             <div className="relative w-full">
//                                 <input
//                                     type={showOldPassword ? "text" : "password"}
//                                     name="oldPassword"
//                                     value={formData.oldPassword}
//                                     onChange={handleInputChange}
//                                     placeholder="Old Password"
//                                     className="border ml-0.5 border-gray-300 rounded-[5px] focus:outline-none focus:ring-1 px-3 py-0.5 focus:ring-black w-[100%]"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={toggleOldPasswordVisibility}
//                                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
//                                 >
//                                     {showOldPassword ? (
//                                         <FaEyeSlash size={16} />
//                                     ) : (
//                                         <FaEye size={16} />
//                                     )}
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="flex flex-col gap-2 w-full">
//                             <p className="text-gray-500 font-bold text-[0.6rem]">NEW PASSWORD</p>
//                             <div className="relative w-full">
//                                 <input
//                                     type={showNewPassword ? "text" : "password"}
//                                     name="newPassword"
//                                     value={formData.newPassword}
//                                     onChange={handleInputChange}
//                                     placeholder="New Password"
//                                     className="border ml-0.5 border-gray-300 rounded-[5px] focus:outline-none focus:ring-1 px-3 py-0.5 focus:ring-black w-[100%]"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={toggleNewPasswordVisibility}
//                                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
//                                 >
//                                     {showNewPassword ? (
//                                         <FaEyeSlash size={16} />
//                                     ) : (
//                                         <FaEye size={16} />
//                                     )}
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="flex flex-col gap-2 w-full">
//                             <p className="text-gray-500 font-bold text-[0.6rem]">
//                                 REPEAT NEW PASSWORD
//                             </p>
//                             <div className="relative w-full">
//                                 <input
//                                     type={showRepeatPassword ? "text" : "password"}
//                                     name="repeatPassword"
//                                     value={formData.repeatPassword}
//                                     onChange={handleInputChange}
//                                     placeholder="Repeat New Password"
//                                     className="border ml-0.5 border-gray-300 rounded-[5px] focus:outline-none focus:ring-1 px-3 py-0.5 focus:ring-black w-[100%]"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={toggleRepeatPasswordVisibility}
//                                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
//                                 >
//                                     {showRepeatPassword ? (
//                                         <FaEyeSlash size={16} />
//                                     ) : (
//                                         <FaEye size={16} />
//                                     )}
//                                 </button>
//                             </div>
//                         </div>

//                         <button
//                             type="submit"
//                             className="bg-zinc-900 text-white w-full sm:w-1/2 md:w-1/3 lg:w-[18%] text-[0.8rem] px-4 py-1 rounded-[8px] cursor-pointer mb-6"
//                         >
//                             Save changes
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserDetails;



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

    const updateUserDetails = async (data) => {
        try {
            const response = await axios.patch("http://localhost:5001/api/user/update", data, {
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
                "http://localhost:5001/api/user/update-password",
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
