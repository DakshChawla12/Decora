import React, { useState } from "react";
import UserSidebar from "./UserSidebar";
import UserDetails from "./UserDetails";
import UserOrders from "./UserOrders";
import UserAddress from "./UserAddress";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const MyAccount = () => {

    const [selectedSection, setSelectedSection] = useState("Details");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();

        navigate("/login");
    };

    const renderSection = () => {
        switch (selectedSection) {
            case "Address":
                return <UserAddress />;
            case "Orders":
                return <UserOrders />;
            case "Logout":
                return handleLogout();
            default:
                return <UserDetails />;
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-center mx-auto gap-7">
            <div className="flex flex-col w-full md:w-[20%] h-[90px] mx-auto items-center justify-center">
                <h1 className="text-3xl">My Account</h1>
            </div>
            <div className="h-[35rem] flex flex-col lg:flex-row mx-auto w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] gap-4">
                <UserSidebar onSelectSection={setSelectedSection} />
                <div className="flex-1">{renderSection()}</div>
            </div>
        </div>
    );
};

export default MyAccount;
